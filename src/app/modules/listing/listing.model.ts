import { Schema, model } from "mongoose";
import { IListing } from "./listing.interface";
import { LISTING_STATUS } from "./listing.constant";
import { createSlug } from "../../utils/createSlug";

const listingSchema = new Schema<IListing>(
  {
    guide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    itinerary: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Itinerary must contain at least one item",
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    meetingPoint: {
      type: String,
      required: true,
      trim: true,
    },

    maxGroupSize: {
      type: Number,
      required: true,
      min: 1,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Images array cannot be empty",
      },
    },

    status: {
      type: String,
      enum: Object.values(LISTING_STATUS),
      default: LISTING_STATUS.ACTIVE,
      required: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    languages: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Languages array cannot be empty",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

listingSchema.pre("save", async function (next) {
  const baseSlug = createSlug(this.title);

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await Listing.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }
  this.slug = uniqueSlug;
  next();
});

export const Listing = model<IListing>("Listing", listingSchema);
