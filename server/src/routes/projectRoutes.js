import express from "express";

import {
  createProject,
  getProjects,
  addProjectMember,
  deleteProject,
  updateProjectStatus,
} from "../controllers/projectController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
  PROJECT ROUTES
*/

// GET ALL PROJECTS
router.get("/", protect, getProjects);

// CREATE PROJECT
router.post("/", protect, createProject);

// UPDATE PROJECT STATUS
router.put(
  "/:id",
  protect,
  updateProjectStatus
);

// ADD MEMBERS
router.post(
  "/:id/members",
  protect,
  addProjectMember
);

// DELETE PROJECT
router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;