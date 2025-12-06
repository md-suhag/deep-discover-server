import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ListingServices } from "./listing.service";
import { Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { IListing } from "./listing.interface";

const createListing = catchAsync(async (req: Request, res: Response) => {
  if (!req.files) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Listing Images is required");
  }
  const files = req.files as Express.Multer.File[];
  const imageUrls = files.map((file) => file.path);

  const payload: IListing = {
    ...req.body,
    guide: req.user.userId,
    images: imageUrls,
  };
  const result = await ListingServices.createListing(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Listing created successfully",
    data: result,
  });
});
const updateListing = catchAsync(async (req: Request, res: Response) => {
  let imageUrls: string[] | undefined;

  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];
    imageUrls = files.map((file) => file.path);
  }

  const payload: Partial<IListing> = {
    ...req.body,
  };

  if (imageUrls) {
    payload.images = imageUrls;
  }

  const result = await ListingServices.updateListing(
    req.params.id,
    req.user.userId,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Listing updated successfully",
    data: result,
  });
});

export const ListingControllers = {
  createListing,
  updateListing,
};
