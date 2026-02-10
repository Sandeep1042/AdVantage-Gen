import { Router } from "express";
import { enhancePrompt, createImage } from "../services/ai.service";
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const enhancedPrompts = await enhancePrompt(prompt);
    const selectedPrompt = enhancedPrompts[0];
    const imageUrl = await createImage(selectedPrompt);

    res.json({ enhancedPrompt: selectedPrompt, imageUrl });
  } catch (err) {
    console.error("🔥 Error generating image:", err);
    res.status(500).json({ error: "Image generation failed." });
  }
});

router.post("/enhance", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const enhancedPrompts = await enhancePrompt(prompt);
    res.json({ enhancedPrompts });
  } catch (err) {
    console.error("🔥 Error enhancing prompt:", err);
    res.status(500).json({ error: "Prompt enhancement failed." });
  }
});


export default router;
