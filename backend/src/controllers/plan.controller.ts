import { Request, Response } from "express";
import Plan from "../models/plan.model";

export const getPlans = async (req: Request, res: Response) => {
    try {
        const plans = await Plan.find({});
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

export const seedPlans = async (req: Request, res: Response) => {
    try {
        await Plan.deleteMany({}); // Clear existing plans

        const plans = [
            {
                name: "Starter",
                price: "$0",
                period: "/month",
                features: [
                    "50 ad generations/month",
                    "AI image & copywriting",
                    "3 social platforms",
                    "Basic analytics",
                    "Email support"
                ],
                buttonText: "Get Started",
                buttonClass: "bg-gray-200 text-gray-900 hover:bg-gray-300",
                borderClass: "border-2 border-gray-200 hover:border-blue-500",
                bgClass: "bg-gradient-to-br from-white/20 to-white/40 text-white"
            },
            {
                name: "Professional",
                price: "$79",
                period: "/month",
                popular: true,
                features: [
                    "200 ad generations/month",
                    "Advanced AI features",
                    "All social platforms",
                    "Advanced analytics",
                    "Priority support",
                    "Brand kit storage"
                ],
                buttonText: "Get Started",
                buttonClass: "bg-white text-blue-600 hover:bg-gray-100",
                bgClass: "bg-gradient-to-br from-blue-600/40 to-blue-700/40 text-white"
            },
            {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                features: [
                    "Unlimited generations",
                    "Custom AI training",
                    "All platforms + API",
                    "Custom analytics",
                    "24/7 support",
                    "Team collaboration",
                    "Dedicated account manager"
                ],
                buttonText: "Contact Sales",
                buttonClass: "bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600",
                borderClass: "border-2 border-gray-200 hover:border-blue-500",
                bgClass: "bg-gradient-to-br from-white/20 to-white/40 text-white"
            }
        ];

        await Plan.insertMany(plans);
        res.json({ message: "Plans seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error seeding plans", error: (error as Error).message });
    }
};
