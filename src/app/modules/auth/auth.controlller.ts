import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);

  setAuthCookie(res, result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Login successfull",
    data: null,
  });
});

export const AuthControllers = { login };
