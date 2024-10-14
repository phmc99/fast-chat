import { messageRoutes } from "./message.js";
import { authRoutes } from "./auth.js";
import { userRoutes } from "./user.js";

export const initializeRoutes = (app) => {
  app.use("/api/message", messageRoutes());
  app.use("/api/auth", authRoutes());
  app.use("/api/user", userRoutes());
};
