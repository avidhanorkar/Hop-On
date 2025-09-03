import User from "../models/userModel.js";
import { AuthRequest } from "./authMiddleware.js"
import { Response, NextFunction } from "express";

const hasPremium = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User Not Found"
            })
        };

        if (user.hasPremium && user.premiumExpiry && new Date() > user?.premiumExpiry) {
            user.hasPremium = false;
            await user.save();
        }

        const isPremUser = user.hasPremium;
        req.prem = isPremUser;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
};

export default {hasPremium};