import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getAllUsers, getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:id
router.get("/me", verifyToken, getCurrentUser);

export default router;
