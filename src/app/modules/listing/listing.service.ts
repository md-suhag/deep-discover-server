import { IListing } from "./listing.interface";
import { Listing } from "./listing.model";

const createListing = async (payload: Partial<IListing>) => {
  const listing = await Listing.create(payload);
  return listing;
};

export const ListingServices = {
  createListing,
};
