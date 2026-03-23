import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// As per requirements: POST /auth/register
router.post("/register", signup);

// As per requirements: POST /auth/login
router.post("/login", login);

// Added for functionality
router.post("/logout", logout);

// As per requirements: GET /auth/me
router.get("/me", protectRoute, getMe);

export default router;
