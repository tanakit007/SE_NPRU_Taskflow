import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String },
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
