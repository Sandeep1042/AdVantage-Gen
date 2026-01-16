import { Request, Response } from "express";
import { enhancePrompt, createImage } from "../services/ai.service";

export const generateImage = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    console.log("🧠 Prompt received:", prompt);

    const enhancedPrompt = await enhancePrompt(prompt);
    console.log("✨ Enhanced Prompt:", enhancedPrompt);

    const imageUrl = await createImage(enhancedPrompt);
    console.log("🖼️ Image generated successfully!");

    res.json({ enhancedPrompt, imageUrl });
  } catch (err: any) {
    console.error("🔥 Error in image generation:", err.response?.data || err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
};
