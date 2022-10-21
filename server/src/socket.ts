import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const appIO = express();
const socketIOServer = createServer(appIO);
const io = new Server(socketIOServer, {
  cors: {
    origin: [
      process.env.DEV === "TRUE"
        ? "http://localhost:5173"
        : process.env.FRONTEND || "",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected");
  // join a room
  socket.on("join-room", async (room) => {
    console.log(`${socket.id} joined ${room}`);
    socket.join(room);
  });

  // leave a room
  socket.on("leave-room", async (room) => {
    console.log(`${socket.id} left ${room}`);
    socket.leave(room);
  });

  // ping
  socket.on("ping", async ({ points, room, username }) => {
    console.log(points, room);
    socket.to(room).emit("pong", {
      collaboratersPoints: points,
      username: username,
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

export default socketIOServer;
