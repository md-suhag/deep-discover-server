import { z } from "zod";
import { BOOKING_STATUS } from "./booking.constant";

const bookingRequestZodSchema = z.object({
  listing: z.string().min(1, "Listing ID is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

const updateBookingStatusZodSchema = z.object({
  status: z.enum([BOOKING_STATUS.ACCEPTED, BOOKING_STATUS.REJECTED]),
});
export const BookingValidation = {
  bookingRequestZodSchema,
  updateBookingStatusZodSchema,
};
