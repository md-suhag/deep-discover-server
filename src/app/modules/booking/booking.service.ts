import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Listing } from "../listing/listing.model";
import { Booking } from "./booking.model";
import { IRequestBookingPayload } from "./booking.interface";
import { BOOKING_STATUS } from "./booking.constant";

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

export const BookingServices = {
  requestBooking,
  updateBookingStatus,
};
