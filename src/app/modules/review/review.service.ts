import { IReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: IReview) => {
  return await Review.create(payload);
};

const getReviewsForGuide = async (guideId: string) => {
  return await Review.find({ guide: guideId })
    .populate("tourist", "name")
    .sort({ createdAt: -1 });
};

export const ReviewService = {
  createReview,
  getReviewsForGuide,
};
