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
const updateListingZodSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  itinerary: z.array(z.string()).min(1).optional(),
  price: z.number().min(0).optional(),
  duration: z.number().min(1).optional(),
  meetingPoint: z.string().min(1).optional(),
  maxGroupSize: z.number().min(1).optional(),
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  languages: z.array(z.string()).min(1).optional(),
});

export const ListingValidation = {
  createListingZodSchema,
  updateListingZodSchema,
};
