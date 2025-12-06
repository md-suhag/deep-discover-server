import Stripe from "stripe";

import { envVars } from "./env";

const stripe = new Stripe(envVars.STRIPE.STRIPE_API_SECRET as string, {
  apiVersion: "2025-11-17.clover",
});

export default stripe;
