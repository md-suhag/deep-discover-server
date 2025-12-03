import mongoose from "mongoose";
import { ICreateGuidePayload, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Tourist } from "../tourist/tourist.model";
import { Guide } from "../guide/guide.model";
import { USER_ROLES } from "./user.constant";

const createTourist = async (payload: Partial<IUser>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await User.create(
      [{ role: USER_ROLES.TOURIST, ...payload }],
      { session }
    );

    await Tourist.create([{ user: result[0]._id }], { session });

    await session.commitTransaction();
    session.endSession();

    return null;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const createGuide = async (payload: ICreateGuidePayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await User.create([{ role: USER_ROLES.GUIDE, ...payload }], {
      session,
    });

    await Guide.create(
      [
        {
          user: result[0]._id,
          dailyRate: payload.dailyRate,
          expertise: payload.expertise,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return null;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createTourist,
  createGuide,
};
