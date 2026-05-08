import express from "express";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET TASKS
router.get("/", protect, getTasks);

// CREATE TASK
router.post("/", protect, createTask);

// UPDATE TASK STATUS
router.put(
  "/:id",
  protect,
  updateTaskStatus
);

// DELETE TASK
router.delete(
  "/:id",
  protect,
  deleteTask
);

export default router;