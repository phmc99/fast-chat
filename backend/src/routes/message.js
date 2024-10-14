import { messageControllers } from "../controllers/message.js";
import auth from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

export const messageRoutes = () => {
  router.post("/", auth, messageControllers.postMessage);
  router.get("/chat/:chatId", messageControllers.getMessageByChat);

  return router;
};
