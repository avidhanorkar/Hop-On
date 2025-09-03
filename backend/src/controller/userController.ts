import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                msg: "Unauthorized"
            })
        };

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        };

        const userDetails = {
            name: user.name,
            email: user.email,
            emailVerification: user.emailVerification,
            profilePic: user.profilePic,
            phone: user.phoneNo,
            gender: user.gender
        }

        return res.status(200).json({
            msg: "User Retrieved Successfully",
            user: userDetails
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

const updateUserDetails = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                msg: "Unauthorized"
            })
        };

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        };

        const { name, gender, profilePic } = req.body;
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.profilePic = profilePic || user.profilePic;
        await user.save();

        return res.status(200).json({
            msg: "User Updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

const deleteAccount = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                msg: "Unauthorized"
            })
        };

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        };

        return res.status(200).json({
            msg: "Success"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

// TODOS
// 1. Add Ticket buying and selling history
// 2. Add Car pool history
// 


export default { getUserProfile, updateUserDetails, deleteAccount };