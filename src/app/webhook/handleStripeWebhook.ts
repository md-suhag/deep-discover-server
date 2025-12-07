import { Request, Response } from "express";
import Stripe from "stripe";
import { envVars } from "../config/env";
import stripe from "../config/stripe";
import { Guide } from "../modules/guide/guide.model";
import { Booking } from "../modules/booking/booking.model";
import {
  BOOKING_STATUS,
  PAYMENT_STATUS,
} from "../modules/booking/booking.constant";

const handleAccountUpdated = async (account: Stripe.Account) => {
  const guide = await Guide.findOne({ stripeAccountId: account.id });
  if (!guide) {
    console.warn(`No user found for Stripe account: ${account.id}`);
    return;
  }
  const isReady = account.details_submitted && account.charges_enabled;
  guide.isStripeAccountReady = isReady;
  await guide.save();
};
const handlePaymentIntentSuccess = async (
  paymentIntent: Stripe.PaymentIntent
) => {
  await Booking.findOneAndUpdate(
    { transactionId: paymentIntent.id },
    {
      status: BOOKING_STATUS.COMPLETED,
      paymentStatus: PAYMENT_STATUS.PAID,
    },
    { runValidators: true }
  );
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  let event: Stripe.Event;
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    console.error("Missing Stripe signature header");
    return res.status(400).json({ error: "Missing stripe signature header" });
  }
  const connectSecret = envVars.STRIPE.CONNECT_WEBHOOK_SECRET;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      connectSecret as string
    );
  } catch (err) {
    console.error(
      "❌ Webhook signature verification failed:",
      (err as Error).message
    );
    return res.sendStatus(400);
  }

  try {
    switch (event.type) {
      case "account.updated":
        await handleAccountUpdated(event.data.object as Stripe.Account);
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSuccess(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send({ received: true });
  } catch (error) {
    console.error("Error handling Stripe event:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while processing Stripe webhook",
      error: (error as Error).message,
    });
  }
};
