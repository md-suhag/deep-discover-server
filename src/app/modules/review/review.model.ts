import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    tourist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      trim: true,
      required: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export const Review = model<IReview>("Review", reviewSchema);
