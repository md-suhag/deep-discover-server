import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IListing } from "./listing.interface";
import { Listing } from "./listing.model";

const createListing = async (payload: Partial<IListing>) => {
  const listing = await Listing.create(payload);
  return listing;
};
const updateListing = async (
  listingId: string,
  guideId: string,
  payload: Partial<IListing>
) => {
  const existing = await Listing.findById(listingId);
  if (!existing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Listing not found");
  }

  // Ensure only the owner guide can update
  if (existing.guide.toString() !== guideId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Unauthorized to update this listing"
    );
  }

  const updated = await Listing.findByIdAndUpdate(
    listingId,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return updated;
};

export const ListingServices = {
  createListing,
  updateListing,
};
