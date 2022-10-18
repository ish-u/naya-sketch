import { Express } from "express";
import { indexHandler } from "./controllers/index.controller";

function routes(app: Express) {
  app.get("/", indexHandler);
}

export default routes;
