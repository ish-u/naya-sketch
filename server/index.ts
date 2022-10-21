import app from "./src/server";
import socketIO from "./src/socket";
import routes from "./src/routes";
import connect from "./src/config/database";

// PORTS
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

// Express Server
app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on http://localhost:${PORT}.`);
  routes(app);
});

// SocketIO Server
socketIO.listen(SOCKET_PORT, () => {
  console.log(`Server is running on port : ${SOCKET_PORT}.`);
});
