import app from "./src/server";
import socketIO from "./src/socket";
import routes from "./src/routes";
import connect from "./src/config/database";

// PORTS
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

// SocketIO Server
socketIO.listen(SOCKET_PORT, () => {
  console.log(`SocketIO is running on port : ${SOCKET_PORT}.`);
});

// Express Server
app.listen(PORT, async () => {
  await connect();
  console.log(`Express is running on : ${PORT}.`);
  routes(app);
});
