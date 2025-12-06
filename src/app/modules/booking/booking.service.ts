import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Listing } from "../listing/listing.model";
import { Booking } from "./booking.model";
import { IRequestBookingPayload } from "./booking.interface";

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

export const BookingServices = {
  requestBooking,
};
