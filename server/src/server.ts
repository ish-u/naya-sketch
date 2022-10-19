// ENV Variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Express } from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/session";

// Express App
const app: Express = express();

// Middleware
app.use(
  cors({
    origin: [
      process.env.DEV === "TRUE"
        ? "http://localhost:5173"
        : process.env.FRONTEND || "",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI || "",
    }),
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.DEV === "TRUE" ? false : true,
      sameSite: process.env.DEV === "TRUE" ? "lax" : "none",
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static("public"));

export default app;
