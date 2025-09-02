import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {

    const { name, email, phone, gender, password, cnfmPassword } = req.body;

    if (!name || !email || !password || !cnfmPassword || !phone || !gender) {
        return res.status(400).json({
            msg: "All Fields are required"
        })
    };

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                msg: "User Email Already Exists"
            })
        };

        if (password !== cnfmPassword) {
            return res.status(400).json({
                msg: "Password and Confirm Password do not match."
            })
        };

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPass,
            phoneNo: phone,
            gender
        })

        const userResponse = newUser.toObject() as Record<string, any>;
        delete userResponse.password;

        return res.status(201).json({
            msg: "User Created Successfully",
            user: userResponse
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            msg: "All Fields are Required"
        })
    };

    const existingUser = await User.findOne({email: email});
    if (!existingUser) {
        return res.status(404).json({
            msg: "User not found"
        })
    };

    const correctPass = await bcrypt.compare(password, existingUser.password);
    if (!correctPass) {
        return res.status(403).json({
            msg: "Wrong Password"
        })
    };

    const payload = {
        userId: existingUser._id
    };

    const token = jwt.sign(payload, process.env.JWT_Secret as string, {
        expiresIn: 2 * 24 * 60 * 60 // 2 days
    });

    return res.status(200).json({
        msg: "user logged in successfully",
        token: token
    });
}



export default {
    registerUser,
    loginUser
};