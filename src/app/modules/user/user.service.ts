import mongoose from "mongoose";
import { ICreateGuidePayload, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Tourist } from "../tourist/tourist.model";
import { Guide } from "../guide/guide.model";
import { USER_ROLES } from "./user.constant";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import stripe from "../../config/stripe";
import { envVars } from "../../config/env";

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

const createConnectedAccount = async (user: JwtPayload) => {
  const guide = await Guide.findOne({ user: user.userId });
  if (!guide) {
    throw new AppError(StatusCodes.NOT_FOUND, "Guide not found");
  }

  // Case 1: Account already connected and ready
  if (guide.stripeAccountId && guide.isStripeAccountReady) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Your Stripe account is already connected and ready to use."
    );
  }

  // Case 2: Account exists but onboarding not complete → create onboarding link
  if (guide.stripeAccountId && !guide.isStripeAccountReady) {
    const accountLink = await stripe.accountLinks.create({
      account: guide.stripeAccountId,
      refresh_url: `${envVars.FRONTEND_URL}/refresh`,
      return_url: `${envVars.FRONTEND_URL}/success`,
      type: "account_onboarding",
    });

    return {
      message: "Complete your Stripe account onboarding.",
      url: accountLink.url,
    };
  }

  // Case 3: No Stripe account yet → create new account
  const account = await stripe.accounts.create({
    type: "express",
  });

  guide.stripeAccountId = account.id;
  guide.isStripeAccountReady = false;
  await guide.save();

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${envVars.FRONTEND_URL}/refresh`,
    return_url: `${envVars.FRONTEND_URL}/success`,
    type: "account_onboarding",
  });

  return {
    message: "New Stripe account created. Complete onboarding.",
    url: accountLink.url,
  };
};
export const UserServices = {
  createTourist,
  createGuide,
  createConnectedAccount,
};
