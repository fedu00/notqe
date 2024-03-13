import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema(
  {
    tasks: {
      current: {
        title: {
          type: String,
          required: [true, "The task must have a title"],
        },
        description: {
          type: String,
          required: [true, "The task must have a description"],
        },
      },
      history: {
        title: {
          type: String,
          required: [true, "The task must have a title"],
        },
        description: {
          type: String,
          required: [true, "The task must have a description"],
        },
      },
    },
    completed: Boolean,
  },
  { timestamps: true }
);

// const Task = mongoose.models.task || mongoose.model("task", todoSchema);

// export default Task;
