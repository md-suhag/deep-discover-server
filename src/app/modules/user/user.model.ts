import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { USER_ROLES, USER_STATUS } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.TOURIST,
    },

    bio: { type: String, default: "" },

    profilePic: { type: String, default: "" },

    languages: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },

    isVerified: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
