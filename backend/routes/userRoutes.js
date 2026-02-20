import express from "express";
import { toggleFavorite } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/favorite/:productId", protect, toggleFavorite);

export default router;