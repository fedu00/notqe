import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB connected successfuly!");
    });
    connection.on("error", (err) => {
      console.log("mongoDB err!");
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("something is wrong!", error);
  }
}
