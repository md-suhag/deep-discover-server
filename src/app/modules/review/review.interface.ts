import { Types } from "mongoose";

export interface IReview {
  booking: Types.ObjectId;
  tourist: Types.ObjectId;
  guide: Types.ObjectId;
  rating: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}
