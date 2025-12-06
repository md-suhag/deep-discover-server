import express from "express";
import { BookingControllers } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { USER_ROLES } from "../user/user.constant";
import { BookingValidation } from "./booking.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  checkAuth(USER_ROLES.TOURIST),
  validateRequest(BookingValidation.bookingRequestZodSchema),
  BookingControllers.requestBooking
);

router.patch(
  "/:id",
  checkAuth(USER_ROLES.GUIDE),
  validateRequest(BookingValidation.updateBookingStatusZodSchema),
  BookingControllers.updateBookingStatus
);

export const bookingRoutes = router;
