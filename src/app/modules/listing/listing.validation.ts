import { z } from "zod";

const createListingZodSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  itinerary: z.array(z.string()).min(1),
  price: z.number().min(0),
  duration: z.number().min(1),
  meetingPoint: z.string().min(1),
  maxGroupSize: z.number().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  category: z.string().min(1),
  languages: z.array(z.string()).min(1),
});

export const ListingValidation = {
  createListingZodSchema,
};
