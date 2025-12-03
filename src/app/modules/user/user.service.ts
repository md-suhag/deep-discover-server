import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Tourist } from "../tourist/tourist.model";

const createTourist = async (payload: Partial<IUser>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await User.create([payload], { session });

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

export const UserServices = {
  createTourist,
};
