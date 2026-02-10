import { Request, Response } from "express";
import { enhancePrompt, createImage } from "../services/ai.service";
import Image from "../models/image.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const generateImage = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, style, lighting, color, ratio, platform, productName, targetAudience, ctaText, opacity, aiModel } = req.body;
    const userId = req.user?.id; // Assuming auth middleware adds user to req

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // console.log("🧠 Prompt received:", prompt);
    // console.log("👤 User ID:", userId);

    const enhancedPrompts = await enhancePrompt(prompt);
    const selectedPrompt = enhancedPrompts[0]; // Use first option for direct generation
    // console.log("✨ Enhanced Prompt used:", selectedPrompt);

    const imageUrl = await createImage(selectedPrompt);
    // console.log("🖼️ Image generated successfully!");

    // Save to Database if user is authenticated
    if (userId) {
      const newImage = new Image({
        user: userId,
        prompt,
        enhancedPrompt: selectedPrompt,
        imageUrl,
        style,
        lighting,
        color,
        ratio,
        platform,
        productName,
        targetAudience,
        ctaText,
        opacity,
        aiModel
      });
      await newImage.save();
    }

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

export const getUserHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const history = await Image.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err: any) {
    console.error("🔥 Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
