import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(201).send();
}

export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const email: string = req.body.email;
  const name: string = req.body.name;

  try {
    const user = await UserModel.findOne({
      username: username,
    });
    if (user) {
      throw Error("USER DOES EXISTS");
    }

    // creating hashed password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // creating a new User Document
    const newUser = new UserModel({
      name: name,
      username: username,
      password: encryptedPassword,
      email: email,
    });

    // saving the new User Document
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);

    return res.send();
  } catch (err) {
    console.error(err);
    res.status(701).json({ err: err });
  }
}

export async function logoutHandler(req: Request, res: Response) {
  req.logout(function (err) {
    if (err) {
      return res.status(411).send();
    }
    res.status(204).send();
  });
}

export async function checkSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(201).send();
}
