import { Request, Response } from "express";
import mongoose from "mongoose";
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
      return res.json({ enhancedPrompt: selectedPrompt, imageUrl, id: newImage._id });
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

export const trackDownload = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
    res.json({ message: "Download tracked" });
  } catch (err: any) {
    console.error("🔥 Error tracking download:", err.message);
    res.status(500).json({ error: "Failed to track download" });
  }
};


export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // console.log("📊 Fetching stats for user:", userId);

    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Ads Generated (Total Images)
    const adsGenerated = await Image.countDocuments({ user: userId });
    // console.log("   - Total Ads:", adsGenerated);

    // Ads Generated This Month
    const adsThisMonth = await Image.countDocuments({
      user: userId,
      createdAt: { $gte: firstDayCurrentMonth }
    });

    // Ads Generated Last Month
    const adsLastMonth = await Image.countDocuments({
      user: userId,
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth }
    });

    // Calculate Change
    let changeText = "-";
    if (adsLastMonth > 0) {
      const change = ((adsThisMonth - adsLastMonth) / adsLastMonth) * 100;
      changeText = `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
    } else if (adsThisMonth > 0) {
      changeText = "+100%"; // First month with activity
    }


    // Total Campaigns (Downloads)
    const aggregateDownloads = await Image.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId.toString()) } },
      { $group: { _id: null, totalDownloads: { $sum: "$downloadCount" } } }
    ]);
    const totalCampaigns = aggregateDownloads[0]?.totalDownloads || 0;
    // console.log("   - Total Downloads:", totalCampaigns);

    // Time Saved: Ads Generated * 2 hours
    const timeSaved = adsGenerated * 2;

    const plan = (req.user as any)?.plan || "Starter";
    const limit = plan === "Pro" ? 200 : 50;
    const creditsLeft = Math.max(0, limit - adsGenerated);

    res.json({
      totalCampaigns, // Downloads
      adsGenerated,
      timeSaved,
      creditsLeft,
      changeText,
      planLimit: limit
    });

  } catch (err: any) {
    console.error("🔥 Error fetching stats:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getRecentImages = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const recent = await Image.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(recent);
  } catch (err: any) {
    console.error("🔥 Error fetching recent images:", err.message);
    res.status(500).json({ error: "Failed to fetch recent images" });
  }
};
