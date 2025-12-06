import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
import { BOOKING_STATUS, PAYMENT_STATUS } from "./booking.constant";

const bookingSchema = new Schema<IBooking>(
  {
    guide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
