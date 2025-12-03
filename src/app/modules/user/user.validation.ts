import { z } from "zod";
import { USER_ROLES } from "../user/user.constant";

export const createTouristZodSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  role: z.enum([USER_ROLES.TOURIST, USER_ROLES.GUIDE]),
});

export const UserValidation = {
  createTouristZodSchema,
};
