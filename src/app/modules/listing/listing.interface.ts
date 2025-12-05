import { Types } from "mongoose";
import { LISTING_STATUS } from "./listing.constant";

export interface IListing {
  guide: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  itinerary: string[];
  price: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  images: string[];
  status: LISTING_STATUS;
  city: string;
  country: string;
  category: string;
  languages: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
