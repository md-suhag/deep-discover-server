import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const register = async (payload: Partial<IUser>) => {
  await User.create(payload);
};

export const AuthServices = {
  register,
};
