import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IListing } from "./listing.interface";
import { Listing } from "./listing.model";

const createListing = async (payload: Partial<IListing>) => {
  const listing = await Listing.create(payload);
  return listing;
};

const getSingleListing = async (listingId: string) => {
  const listing = await Listing.findById(listingId).populate(
    "guide",
    "name email profilePic"
  );
  if (!listing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Listing not found");
  }
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
const deleteListing = async (listingId: string, guideId: string) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Listing not found");
  }

  // Owner check
  if (listing.guide.toString() !== guideId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Unauthorized to delete this listing"
    );
  }

  await Listing.findByIdAndDelete(listingId);
  return null;
};

export const ListingServices = {
  createListing,
  getSingleListing,
  updateListing,
  deleteListing,
};
