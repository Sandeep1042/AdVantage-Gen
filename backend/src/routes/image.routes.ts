import { Router } from "express";
import { generateImage, enhanceUserPrompt, getUserHistory, getDashboardStats, getRecentImages, trackDownload } from "../controllers/image.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Generate a new image (Protected)
router.post("/generate", protect, generateImage);

// Enhance prompt (Public for now, or protected?)
router.post("/enhance", enhanceUserPrompt);

// Get user history (Protected)
router.get("/history", protect, getUserHistory);

// Get dashboard statistics (Protected)
router.get("/stats", protect, getDashboardStats);

// Get recent images (Protected)
router.get("/recent", protect, getRecentImages);

// Track download (Protected)
router.post("/download/:id", protect, trackDownload);

export default router;
