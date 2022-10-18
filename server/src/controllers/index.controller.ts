import { Request, Response } from "express";

// Index Route Controller
export async function indexHandler(req: Request, res: Response) {
  res.status(200).send("naya-sketch server");
}
