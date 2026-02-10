import { Request, Response } from "express";
import { enhancePrompt, createImage } from "../services/ai.service";

export const generateImage = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    console.log("🧠 Prompt received:", prompt);

    const enhancedPrompts = await enhancePrompt(prompt);
    const selectedPrompt = enhancedPrompts[0]; // Use first option for direct generation
    console.log("✨ Enhanced Prompt used:", selectedPrompt);

    const imageUrl = await createImage(selectedPrompt);
    console.log("🖼️ Image generated successfully!");

    res.json({ enhancedPrompt: selectedPrompt, imageUrl });
  } catch (err: any) {
    console.error("🔥 Error in image generation:", err.response?.data || err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
}


export const enhanceUserPrompt = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const enhancedPrompts = await enhancePrompt(prompt);
    res.json({ enhancedPrompts });
  } catch (err: any) {
    console.error("🔥 Error in prompt enhancement:", err.response?.data || err.message);
    res.status(500).json({ error: "Prompt enhancement failed" });
  }
};
