import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { listingRoutes } from "../modules/listing/listing.route";
import { bookingRoutes } from "../modules/booking/booking.route";

export const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/tourists",
    route: authRoutes,
  },
  {
    path: "/listings",
    route: listingRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
