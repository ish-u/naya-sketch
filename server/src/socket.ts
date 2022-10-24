import express, { Request, Response } from "express";
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

appIO.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello SocketIO Server</h1>");
});

io.on("connection", (socket) => {
  //console.log("Connected");
  // join a room
  socket.on("join-room", async ({ room, username }) => {
    //console.log(`${socket.id}//${username} joined ${room}`);
    socket.join(room);
    socket.to(room).emit("add-user", { username: username });
  });

  // leave a room
  socket.on("leave-room", async ({ room, username }) => {
    // console.log(`${socket.id}//${username}  left ${room}`);
    socket.to(room).emit("remove-user", { username: username });
    socket.leave(room);
  });

  // update-collaborators
  socket.on("update-me", ({ room, username }) => {
    //console.log("send-status", room, username);
    socket.to(room).emit("update-user", { username: username });
  });

  socket.on("send-point", async ({ point, room, username }) => {
    socket.to(room).emit("get-point", {
      collaboratorsPoint: point,
      username: username,
    });
  });

  // create a new sketch
  socket.on("new-sketch", ({ sketchName, username }) => {
    //console.log(sketchName, username);
    socket.broadcast.emit("add-sketch", {
      newSketch: sketchName,
      username: username,
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    //console.log("Disconnected");
  });
});

export default socketIOServer;
