import { z } from "zod";

const createTouristZodSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});
const createGuideZodSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),

  expertise: z.array(z.string()),
  dailyRate: z.number({ message: "Daily rate is required" }),
});

export const UserValidation = {
  createTouristZodSchema,
  createGuideZodSchema,
};
