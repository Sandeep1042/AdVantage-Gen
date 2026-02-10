import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
    user: mongoose.Types.ObjectId;
    prompt: string;
    enhancedPrompt?: string;
    imageUrl: string;
    style?: string;
    lighting?: string;
    color?: string;
    ratio?: string;
    platform?: string;
    productName?: string;
    targetAudience?: string;
    ctaText?: string;
    opacity?: number;
    aiModel?: string;
    createdAt: Date;
}

const ImageSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    prompt: { type: String, required: true },
    enhancedPrompt: { type: String },
    imageUrl: { type: String, required: true },
    style: { type: String, default: "none" },
    lighting: { type: String, default: "none" },
    color: { type: String, default: "none" },
    ratio: { type: String, default: "square" },
    platform: { type: String, default: "Any platform" },
    productName: { type: String },
    targetAudience: { type: String },
    ctaText: { type: String },
    opacity: { type: Number, default: 100 },
    aiModel: { type: String }
}, { timestamps: true });

export default mongoose.model<IImage>('Image', ImageSchema);
