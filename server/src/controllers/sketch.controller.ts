import { Request, Response } from "express";
import SketchModel from "../models/sketch.model";

export async function sketchDataHandler(req: Request, res: Response) {
  const data = req.body.data;
  const name = req.body.name;
  const username = (req.user as { username: string }).username;

  try {
    // checking if the sketch exists
    const sketch = await SketchModel.findOne({ name: name });
    if (!sketch) {
      throw new Error("SKETCH DOES NOT EXIST");
    }

    // updating the data array of SketchModel
    sketch.data = [...sketch.data, data];
    var collaboraterExists = false;
    for (var i = 0; i < sketch.collaboraters.length; i++) {
      if (sketch.collaboraters[i] === username) {
        collaboraterExists = true;
        break;
      }
    }
    if (!collaboraterExists) {
      sketch.collaboraters = [...sketch.collaboraters, username];
    }

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
    const collaboraters = sketch.collaboraters;

    res.status(200).json({ data, collaboraters });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
}

export async function getSkechListHandler(req: Request, res: Response) {
  try {
    // getting the list of all sketch
    const sketches = (await SketchModel.find().select({ _id: 0, name: 1 })).map(
      (sketch) => sketch.name
    );
    res.status(200).json({ sketches });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
}
