import { z } from "zod";

export const bookingRequestZodSchema = z.object({
  listing: z.string().min(1, "Listing ID is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

export const BookingValidation = {
  bookingRequestZodSchema,
};
