// ENV Variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Express } from "express";
import cors from "cors";

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
app.use("/public", express.static("public"));

export default app;
