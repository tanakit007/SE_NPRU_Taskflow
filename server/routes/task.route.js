import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// All task routes are protected
router.use(protectRoute);

// As per requirements: GET /tasks
router.get("/", getTasks);

// As per requirements: POST /tasks
router.post("/", createTask);

// As per requirements: PUT /tasks/:id
router.put("/:id", updateTask);

// As per requirements: DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;
