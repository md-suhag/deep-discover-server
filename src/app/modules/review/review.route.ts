import express from "express";

import { ReviewValidation } from "./review.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { USER_ROLES } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  checkAuth(USER_ROLES.TOURIST),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);

router.get("/:guideId", ReviewController.getGuideReviews);

export const ReviewRoutes = router;
