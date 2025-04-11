import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/me
router.get("/me", verifyToken, getCurrentUser);

// PUT /api/users/me
router.put("/me", verifyToken, updateUser);

// DELETE /api/users/me
router.delete("/me", verifyToken, deleteUser);

export default router;
