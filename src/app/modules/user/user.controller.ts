import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const createTourist = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createTourist(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Registration successfull",
    data: result,
  });
});
const createGuide = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createGuide(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Registration successfull",
    data: result,
  });
});

const createConnectedAccount = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const accountLink = await UserServices.createConnectedAccount(user);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Connected Account link created",
      data: accountLink,
    });
  }
);
export const UserControllers = {
  createTourist,
  createGuide,
  createConnectedAccount,
};
