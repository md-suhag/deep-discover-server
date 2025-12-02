import { Schema, model } from "mongoose";
import { ITourist } from "./tourist.interface";

const touristSchema = new Schema<ITourist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    preference: {
      type: [String],
      default: [],
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

export const Tourist = model<ITourist>("Tourist", touristSchema);
