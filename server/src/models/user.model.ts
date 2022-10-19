import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  files: {
    type: Map,
    of: String,
    default: {},
  },
});

export default mongoose.model("User", UserSchema);
