import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
    name: string;
    price: string;
    period: string;
    features: string[];
    popular: boolean;
    buttonText: string;
    buttonClass: string;
    borderClass?: string;
    bgClass?: string;
}

const PlanSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        period: { type: String, required: true },
        features: [{ type: String, required: true }],
        popular: { type: Boolean, default: false },
        buttonText: { type: String, required: true },
        buttonClass: { type: String, required: true },
        borderClass: { type: String },
        bgClass: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IPlan>("Plan", PlanSchema);
