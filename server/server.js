import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import registerSocketHandlers from "./sockets/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" },
  pingTimeout: 60000
});

// health route
app.get("/api/health", (req, res) => res.json({ ok: true }));

registerSocketHandlers(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
