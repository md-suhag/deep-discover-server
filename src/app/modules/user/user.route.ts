import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/tourist",
  validateRequest(UserValidation.createTouristZodSchema),
  UserControllers.createTourist
);
router.post(
  "/guide",
  validateRequest(UserValidation.createGuideZodSchema),
  UserControllers.createGuide
);

export const userRoutes = router;
