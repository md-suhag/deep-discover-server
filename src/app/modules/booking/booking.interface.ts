import { Types } from "mongoose";
import { BOOKING_STATUS, PAYMENT_STATUS } from "./booking.constant";

export interface IBooking {
  guide: Types.ObjectId;
  tourist: Types.ObjectId;
  listing: Types.ObjectId;
  date: Date;
  price: number;
  transactionId?: string;
  status: BOOKING_STATUS;
  paymentStatus: PAYMENT_STATUS;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequestBookingPayload {
  listing: string;
  date: string;
  notes?: string;
}
