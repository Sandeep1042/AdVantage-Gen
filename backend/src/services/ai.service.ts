import axios from "axios";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const HUGGING_FACE_URL = "https://huggingface.co/black-forest-labs/FLUX.1-dev";

// ---------------- Gemini Prompt Enhancement ----------------
export const enhancePrompt = async (userPrompt: string): Promise<string[]> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are an expert AI prompt engineer. Provide 3 distinct, highly detailed versions of the following ad prompt for FLUX image generation.
            
            1. **Cinematic & Dramatic**: High contrast, moody lighting, emotional.
            2. **Clean & Minimalist**: Bright, studio lighting, product-focused.
            3. **Creative & Artistic**: Unique composition, stylized, vibrant.

            Return ONLY a raw JSON array of strings. Do not include markdown formatting (like \`\`\`json).
            Example: ["Prompt 1...", "Prompt 2...", "Prompt 3..."]

            User Prompt: ${userPrompt}`
          }]
        }]
      }
    );

    const textResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Raw Gemini Response:", textResponse);

    // Clean up potential markdown code blocks if Gemini still adds them
    const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    const enhancedOptions = JSON.parse(cleanJson);

    if (Array.isArray(enhancedOptions)) {
      return enhancedOptions;
    }
    return [userPrompt]; // Fallback
  } catch (err: any) {
    console.error("🔥 Gemini API Error:", err.response?.data || err.message);
    return [userPrompt];
  }
};

// ---------------- Hugging Face Image Generation ----------------
const client = new InferenceClient(process.env.HF_API_KEY!);

export const createImage = async (prompt: string): Promise<string> => {
  try {
    console.log("🎨 Generating image with FLUX.1-schnell via Hugging Face Inference API...");

    const result = await client.textToImage({
      provider: "nscale",
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: { num_inference_steps: 30 },
    });

    // Type guard to handle Blob vs string
    if (typeof result === "string") {
      console.warn("⚠️ Received string response instead of Blob from Hugging Face.");
      return result; // Might be a base64 string or error message
    }

    const arrayBuffer = await (result as Blob).arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (err: any) {
    console.error("🔥 Hugging Face FLUX error:", err.message);
    throw new Error("Image generation failed. Check model or API key.");
  }
};
