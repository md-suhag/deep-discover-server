import { z } from "zod";

const createReviewZodSchema = z.object({
  body: z.object({
    booking: z.string().min(1),
    guide: z.string().min(1),
    rating: z.number().min(1).max(5),
    text: z.string().min(1).max(500),
  }),
});
export const ReviewValidation = {
  createReviewZodSchema,
};
