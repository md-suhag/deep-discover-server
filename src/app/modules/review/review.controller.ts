import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const payload = {
    ...req.body,
    tourist: user.userId,
  };
  const result = await ReviewService.createReview(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

const getGuideReviews = catchAsync(async (req: Request, res: Response) => {
  const guideId = req.params.guideId;

  const result = await ReviewService.getReviewsForGuide(guideId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getGuideReviews,
};
