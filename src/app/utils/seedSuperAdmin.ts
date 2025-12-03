import { envVars } from "../config/env";
import { USER_ROLES } from "../modules/user/user.constant";
import { IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: Partial<IUser> = {
      name: "Super admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: USER_ROLES.SUPER_ADMIN,
      isVerified: true,
    };
    const superAdmin = await User.create(payload);
    console.log("Super admin created successfully! \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
