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
  socket.on("join-room", async ({ room, username }) => {
    console.log(`${socket.id}//${username} joined ${room}`);
    socket.join(room);
    socket.to(room).emit("add-user", { username: username });
  });

  // leave a room
  socket.on("leave-room", async ({ room, username }) => {
    console.log(`${socket.id}//${username}  left ${room}`);
    socket.to(room).emit("remove-user", { username: username });
    socket.leave(room);
  });

  // update-collaborators
  socket.on("update-me", ({ room, username }) => {
    console.log("send-status", room, username);
    socket.to(room).emit("update-user", { username: username });
  });

  socket.on("send-points", async ({ points, room, username }) => {
    socket.to(room).emit("get-points", {
      collaboratersPoints: points,
      username: username,
    });
  });

  // create a new sketch
  socket.on("new-sketch", ({ sketchName, username }) => {
    console.log(sketchName, username);
    socket.broadcast.emit("add-sketch", {
      newSketch: sketchName,
      username: username,
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

export default socketIOServer;
