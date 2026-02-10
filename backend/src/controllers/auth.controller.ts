import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// Generate JWT Token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                profilePicture: user.profilePicture,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user: any = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                profilePicture: user.profilePicture,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
};

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;

        // Ensure token exists
        if (!token) {
            res.status(400).json({ message: "Google token is required" });
            return;
        }

        // Verify Google Token (Access Token approach requires fetching user info, ID Token can be verified locally)
        // Since we are using @react-oauth/google's useGoogleLogin which gives an access token, we verify by fetching user info.
        // OR if using the GoogleLogin component (credential response), we verify ID token.
        // Let's support the access_token approach as planned.

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        if (!response.ok) {
            res.status(401).json({ message: "Invalid Google Token" });
            return;
        }

        const data = await response.json();
        const { name, email, picture } = data;

        if (!email) {
            res.status(400).json({ message: "Google account does not have an email" });
            return;
        }

        let user = await User.findOne({ email });

        if (!user) {
            // content...
            user = await User.create({
                name,
                email,
                password: "", // No password for Google users
                profilePicture: picture,
            });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            profilePicture: user.profilePicture,
            token: generateToken(user.id),
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Google Login Failed", error: (error as Error).message });
    }
};
