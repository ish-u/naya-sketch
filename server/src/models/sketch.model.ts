import mongoose from "mongoose";

// User Schema
const SktechSchma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  data: {
    type: [
      {
        points: [
          {
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number,
          },
        ],
        sketchedBy: String,
      },
    ],
    default: [],
  },
  collaboraters: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Sketch", SktechSchma);
