import { Request, Response } from "express";
import SketchModel from "../models/sketch.model";

export async function sketchDataHandler(req: Request, res: Response) {
  const data = req.body.data;
  const name = req.body.name;

  try {
    // checking if the sketch exists
    const sketch = await SketchModel.findOne({ name: name });
    if (!sketch) {
      throw new Error("SKETCH DOES NOT EXIST");
    }
    console.log(sketch?.data.length);

    // updating the data array of SketchModel
    sketch.data = [...sketch.data, ...data];

    // saving the updated document
    await sketch.save();

    res.status(204).send("UPDATED");
  } catch (error) {
    console.log(error);
    res.status(510).send({ error: error });
  }
}

export async function createSketchHandler(req: Request, res: Response) {
  const name = req.params.name;
  const username = (req.user as { username: string; email: string }).username;
  try {
    // check if the sketch exists
    const sketch = await SketchModel.findOne({
      name: name,
    });
    if (sketch) {
      throw new Error("SKETCH EXISTS");
    }

    // creating a new Sketch
    const newSketch = new SketchModel({
      name: name,
      owner: username,
    });

    // saving the new Skecth in the DB
    const savedSkecth = await newSketch.save();
    res.status(201).send(savedSkecth);
  } catch (error) {
    console.log(error);
    res.status(510).json({ err: error });
  }
}

export async function getSketchDataHandler(req: Request, res: Response) {
  const name = req.params.name;
  try {
    // finding the sketch
    const sketch = await SketchModel.findOne({ name: name });
    if (!sketch) {
      throw new Error("SKECTH DOES NOT EXISTS");
    }

    // getting the data array and sending it to user
    const data = sketch.data;

    res.status(200).json({ points: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
}
