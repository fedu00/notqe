import mongoose, { Schema } from "mongoose";

const myTaskSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    task: {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        required: true,
        enum: ["health", "work", "study", "other"],
      },
      importanceLevel: {
        type: String,
        required: true,
        enum: [
          "no important",
          "less important",
          "medium",
          "important",
          "very important",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

const MyTask = mongoose.models.MyTask || mongoose.model("MyTask", myTaskSchema);

export default MyTask;
