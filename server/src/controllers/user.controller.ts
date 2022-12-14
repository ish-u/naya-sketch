import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

export async function loginHandler(req: Request, res: Response) {
  const user = await UserModel.findById(req.user, {
    password: 0,
    _id: 0,
    __v: 0,
  });

  res.status(201).send({ user });
}
export async function registerHandler(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const email: string = req.body.email;
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;

  try {
    // checking if the sent credentials exists or not
    const user = await UserModel.find().or([
      { username: username },
      { email: email },
    ]);
    if (user.length) {
      throw Error("USER EXISTS");
    }

    // creating hashed password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // creating a new User Document
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
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

export async function checkSessionHandler(req: Request, res: Response) {
  const user = req.user as { username: string; name: string; email: string };
  res.status(201).json({ user });
}
