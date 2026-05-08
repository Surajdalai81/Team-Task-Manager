import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import { registerValidation } from "../validations/authValidation.js";

import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post("/login", loginUser);

export default router;