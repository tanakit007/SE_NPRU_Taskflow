import { Task } from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    if (!title) return res.status(400).json({ message: "Title is required" });
    const newTask = new Task({
      title,
      description,
      priority,
      userId: req.user._id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true },
    );
    if (!updatedTask)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
