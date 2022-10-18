import app from "./src/server";
import routes from "./src/routes";
import connect from "./src/config/database";

// PORT
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on port http://localhost:${PORT}.`);
  routes(app);
});
