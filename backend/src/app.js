import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { initializeRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";
import { handleSocket } from "./socket/handleSocket.js";

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

initializeRoutes(app);

app.use(errorHandler);

handleSocket(io);

httpServer.listen(3001, () => {
  console.log("App is running");
});
