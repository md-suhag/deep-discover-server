import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Listing } from "../listing/listing.model";
import { Booking } from "./booking.model";
import { IRequestBookingPayload } from "./booking.interface";
import { BOOKING_STATUS } from "./booking.constant";
import { IGuide } from "../guide/guide.interface";
import { envVars } from "../../config/env";
import stripe from "../../config/stripe";

const requestBooking = async (
  touristId: string,
  payload: IRequestBookingPayload
) => {
  const { listing, date, notes } = payload;

  // listing check
  const listingDoc = await Listing.findById(listing);
  if (!listingDoc) {
    throw new AppError(StatusCodes.NOT_FOUND, "Listing not found");
  }

  const booking = await Booking.create({
    guide: listingDoc.guide,
    tourist: touristId,
    listing,
    date: new Date(date),
    price: listingDoc.price,
    notes,
  });

  return booking;
};

const updateBookingStatus = async (
  bookingId: string,
  guideId: string,
  status: BOOKING_STATUS
) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  if (booking.guide.toString() !== guideId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Not authorized to update this booking"
    );
  }

  // Status must be pending to change
  if (booking.status !== BOOKING_STATUS.PENDING) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only pending bookings can be accepted or rejected"
    );
  }

  booking.status = status;
  await booking.save();

  return booking;
};
const completeBooking = async (bookingId: string, touristId: string) => {
  const booking = await Booking.findById(bookingId).populate("guide");

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  if (booking.tourist.toString() !== touristId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You cannot complete this booking"
    );
  }

  if (booking.status !== BOOKING_STATUS.ACCEPTED) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Booking is not accepted yet");
  }

  // Guide must have a connected stripe account id
  const guide = booking.guide as unknown as IGuide;

  if (!guide.stripeAccountId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Guide has no Stripe connected account"
    );
  }

  const amount = booking.price * 100; // convert to cents

  const applicationFee =
    (amount * Number(envVars.APPLICATION_FEE_PERCENT || 10)) / 100;

  // ---------------------------
  // Stripe Destination Charge
  // ---------------------------
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    customer: booking.tourist.toString(),
    transfer_data: {
      destination: guide.stripeAccountId,
    },
    application_fee_amount: Math.round(applicationFee),
  });

  booking.transactionId = paymentIntent?.id;
  await booking.save();

  return booking;
};
export const BookingServices = {
  requestBooking,
  updateBookingStatus,
  completeBooking,
};
