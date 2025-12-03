import { Schema, model } from "mongoose";
import { IUser, UserModal } from "./user.interface";
import { USER_ROLES, USER_STATUS } from "./user.constant";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";

const userSchema = new Schema<IUser, UserModal>(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, minLength: 8, select: 0 },

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

userSchema.statics.isExistUserByEmail = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist;
};

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

//check user
userSchema.pre("save", async function (next) {
  //check user
  const isExist = await User.findOne({ email: this.email });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email already exist!");
  }

  //password hash
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }
  next();
});
export const User = model<IUser, UserModal>("User", userSchema);
