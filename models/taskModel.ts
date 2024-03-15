import mongoose, { Schema } from "mongoose";

const myTaskSchema = new Schema(
  {
    userEmail: String,
    task: {
      title: String,
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

const MyTask = mongoose.models.MyTask || mongoose.model("MyTask", myTaskSchema);

export default MyTask;