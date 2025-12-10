import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Listing } from "../listing/listing.model";
import { Booking } from "./booking.model";
import { IRequestBookingPayload } from "./booking.interface";
import { BOOKING_STATUS } from "./booking.constant";
import { envVars } from "../../config/env";
import stripe from "../../config/stripe";
import { Guide } from "../guide/guide.model";

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
const payForBooking = async (bookingId: string, touristId: string) => {
  const booking = await Booking.findById(bookingId);

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

  const guideProfile = await Guide.findOne({ user: booking.guide });

  if (!guideProfile) {
    throw new AppError(StatusCodes.NOT_FOUND, "Guide profile not found");
  }

  if (!guideProfile.stripeAccountId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Guide does not have a connected Stripe account"
    );
  }

  const amount = booking.price * 100; // convert to cents

  const applicationFee =
    (amount * Number(envVars.APPLICATION_FEE_PERCENT || 10)) / 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    transfer_data: {
      destination: guideProfile.stripeAccountId,
    },
    automatic_payment_methods: { enabled: true },
    application_fee_amount: Math.round(applicationFee),
    metadata: {
      bookingId,
      touristId,
      guideId: booking.guide.toString(),
    },
  });

  booking.transactionId = paymentIntent?.id;
  await booking.save();

  return { clientSecret: paymentIntent.client_secret };
};
export const BookingServices = {
  requestBooking,
  updateBookingStatus,
  payForBooking,
};
