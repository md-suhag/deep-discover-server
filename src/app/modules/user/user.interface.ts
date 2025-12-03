import { Model } from "mongoose";
import { USER_ROLES, USER_STATUS } from "./user.constant";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  bio: string;
  profilePic: string;
  languages: string[];
  status: USER_STATUS;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserModal = {} & Model<IUser>;

export interface ICreateGuidePayload {
  name: string;
  email: string;
  password: string;

  expertise: string[];
  dailyRate: number;
}
