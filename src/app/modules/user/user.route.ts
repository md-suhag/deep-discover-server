import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { USER_ROLES } from "./user.constant";
import { checkAuth } from "../../middlewares/checkAuth";

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

router.post(
  "/connected-account",
  checkAuth(USER_ROLES.GUIDE),
  UserControllers.createConnectedAccount
);

export const userRoutes = router;
