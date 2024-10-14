import { userControllers } from "../controllers/user.js";
import express from "express";

const router = express.Router();

export const userRoutes = () => {
  router.get("/", userControllers.getUsers);

  return router;
};
