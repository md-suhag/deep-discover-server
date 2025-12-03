import z from "zod";

const loginZodSchema = z.object({
  email: z.email({ message: "Email must be valid" }),
  password: z.string(),
});
export const AuthValidation = { loginZodSchema };
