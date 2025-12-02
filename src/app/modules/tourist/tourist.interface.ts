import { Types } from "mongoose";

export interface ITourist {
  user: Types.ObjectId;
  preference: string[];
  completedTours: number;
}
