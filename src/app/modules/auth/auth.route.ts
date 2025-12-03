import express from "express";
import { AuthControllers } from "./auth.controlller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthControllers.login
);

export const authRoutes = router;
