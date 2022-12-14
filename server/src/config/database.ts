import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI || "", {
      dbName: process.env.DB_NAME,
    });
    console.log("CONNECTED TO DB");
  } catch (err) {
    console.log(err);
    console.error("COULD NOT CONNECT TO DB");
    process.exit();
  }
}

export default connect;
