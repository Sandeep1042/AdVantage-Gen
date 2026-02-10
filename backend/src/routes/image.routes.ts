import { Router } from "express";
import { generateImage, enhanceUserPrompt, getUserHistory } from "../controllers/image.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Generate a new image (Protected)
router.post("/generate", protect, generateImage);

// Enhance prompt (Public for now, or protected?)
router.post("/enhance", enhanceUserPrompt);

// Get user history (Protected)
router.get("/history", protect, getUserHistory);

export default router;
