import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { envVars } from "../../config/env";
import { USER_STATUS } from "../user/user.constant";
import { createUserTokens } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";

const login = async (payload: Pick<IUser, "email" | "password">) => {
  const { email, password } = payload;
  const isExistUser = await User.findOne({ email }).select("+password");
  if (!isExistUser) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      envVars.NODE_ENV === "development"
        ? "User doesn't exist!"
        : "Invalid email or password"
    );
  }

  // check if user is deleted
  if (isExistUser.isDeleted) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "It looks like your account has been deleted or deactivated."
    );
  }

  //check user status
  if (isExistUser.status !== USER_STATUS.ACTIVE) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "It looks like your account has been suspended or deactivated."
    );
  }

  //check if user is verified
  //   if (!isExistUser.isVerified) {
  //     throw new AppError(
  //       StatusCodes.BAD_REQUEST,
  //       'Please verify your account, then try to login again'
  //     );
  //   }

  //check match password
  if (!(await User.isMatchPassword(password, isExistUser.password as string))) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      envVars.NODE_ENV === "development"
        ? "Password is incorrect!"
        : "Invalid email or password"
    );
  }

  const tokens = createUserTokens(isExistUser);

  return tokens;
};

export const AuthServices = { login };
