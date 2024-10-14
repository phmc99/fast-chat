import { authControllers } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

export const authRoutes = () => {
  router.post("/register", authControllers.signup);
  router.post("/login", authControllers.signin);

  return router;
};
