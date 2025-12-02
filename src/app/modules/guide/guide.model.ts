import { Schema, model } from "mongoose";
import { IGuide } from "./guide.interface";

const guideSchema = new Schema<IGuide>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    expertise: {
      type: [String],
      required: true,
      default: [],
    },

    dailyRate: {
      type: Number,
      required: true,
    },

    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedTours: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Guide = model<IGuide>("Guide", guideSchema);
