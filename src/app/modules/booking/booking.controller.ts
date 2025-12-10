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

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const guideId = req.user.userId;
  const { status } = req.body;

  const result = await BookingServices.updateBookingStatus(
    bookingId,
    guideId,
    status
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Booking ${status} successfully`,
    data: result,
  });
});
const payForBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const touristId = req.user.userId;

  const result = await BookingServices.payForBooking(bookingId, touristId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Booking Completed successfully`,
    data: result,
  });
});

export const BookingControllers = {
  requestBooking,
  updateBookingStatus,
  payForBooking,
};
