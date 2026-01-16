import { Router } from "express";
import { enhancePrompt, createImage } from "../services/ai.service";
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const enhancedPrompt = await enhancePrompt(prompt);
    const imageUrl = await createImage(enhancedPrompt);

    res.json({ enhancedPrompt, imageUrl });
  } catch (err) {
    console.error("🔥 Error generating image:", err);
    res.status(500).json({ error: "Image generation failed." });
  }
});

export default router;
