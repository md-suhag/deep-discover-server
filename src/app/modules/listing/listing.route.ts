import express from "express";
import { ListingControllers } from "./listing.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { USER_ROLES } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { ListingValidation } from "./listing.validation";
import { multipleImageUpload } from "../../config/multer";

const router = express.Router();

router.post(
  "/",
  checkAuth(USER_ROLES.GUIDE),
  multipleImageUpload,
  validateRequest(ListingValidation.createListingZodSchema),
  ListingControllers.createListing
);

router.get("/:id", ListingControllers.getSingleListing);

router.patch(
  "/:id",
  checkAuth(USER_ROLES.GUIDE),
  multipleImageUpload,
  validateRequest(ListingValidation.updateListingZodSchema),
  ListingControllers.updateListing
);

router.delete(
  "/:id",
  checkAuth(USER_ROLES.GUIDE),
  ListingControllers.deleteListing
);

router.get("/", ListingControllers.getAllListings);

export const listingRoutes = router;
