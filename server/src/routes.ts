import { Express } from "express";
import passport from "passport";
import { indexHandler } from "./controllers/index.controller";
import { authenticate } from "./utils/authenticate";
import {
  checkSessionHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
} from "./controllers/user.controller";
import {
  sketchDataHandler,
  createSketchHandler,
  getSketchDataHandler,
} from "./controllers/sketch.controller";

function routes(app: Express) {
  app.get("/", indexHandler);
  // SESSION
  app.get("/check", authenticate, checkSessionHandler);

  // USER
  app.post("/login", passport.authenticate("local"), loginHandler);
  app.post("/register", registerHandler);
  app.get("/logout", authenticate, logoutHandler);

  // SKETCH
  app.put("/sketch/update", authenticate, sketchDataHandler);
  app.get("/sketch/create/:name", authenticate, createSketchHandler);
  app.get("/sketch/get/:name", authenticate, getSketchDataHandler);
}

export default routes;
