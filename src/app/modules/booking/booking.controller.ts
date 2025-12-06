import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { BookingServices } from "./booking.service";

const requestBooking = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await BookingServices.requestBooking(req.user.userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Booking request sent successfully",
    data: result,
  });
});

export const BookingControllers = {
  requestBooking,
};
