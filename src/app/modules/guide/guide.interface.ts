import { Types } from "mongoose";

export interface IGuide {
  user: Types.ObjectId;
  expertise: string[];
  dailyRate: number;
  avgRating: number;
  totalReviews: number;
  completedTours: number;
  stripeAccountId?: string;
  isStripeAccountReady?: boolean;
}
