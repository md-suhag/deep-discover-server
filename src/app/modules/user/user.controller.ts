import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

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

export const UserControllers = {
  createTourist,
  createGuide,
};
