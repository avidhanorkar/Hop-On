import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMails } from "../utils/sendMail.js";
import crypto from "crypto";

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

        const newUser = new User({
            name,
            email,
            password: hashedPass,
            phoneNo: phone,
            gender
        })

        const userResponse = newUser.toObject() as Record<string, any>;
        delete userResponse.password;

        const otp = generateOtp();
        console.log("Generated Otp: ", otp);

        newUser.otp = otp as string;
        newUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await newUser.save();

        await sendMails(email, "Hop On Email Verification", `Use the given OTP to complete registration: ${otp}`);

        return res.status(201).json({
            msg: "User Created Successfully",
            verificationDetails: "An OTP is sent to you || you have exactly 10 minutes to verify your mail",
            user: userResponse
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "All Fields are Required"
        })
    };

    const existingUser = await User.findOne({ email: email });
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

const verifyEmail = async (req: Request, res: Response) => {

    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.status(400).json({ msg: "All Fields are required" })
        };


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User Not Found"
            })
        }


        if (!otp) {
            return res.status(400).json({
                msg: "OTP not provided"
            })
        }

        if (!user.otpExpiry || user?.otpExpiry < new Date()) {
            return res.status(400).json({
                msg: "OTP Expired"
            })
        }

        if (otp != user.otp) {
            return res.status(400).json({
                msg: "invalid OTP"
            })
        }

        user.otp = null;
        user.otpExpiry = null;
        user.emailVerification = true;
        await user.save();

        return res.status(200).json({
            msg: "Email Verified successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const requestForChangePass = async (req: AuthRequest, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                msg: "All Fields are required"
            })
        };

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                msg: "Not Found"
            })
        };

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPassToken = hashedToken;
        user.resetPassExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        const url = `{{base}}/auth/passReset?token=${resetToken}`;
        // TODO 1: On Completion Change the link for better 
        await sendMails(user.email, "Hop On Password Reset", "Visit URL: " + url);

        return res.status(200).json({
            msg: "Password Reset Mail Sent Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

const resetPassword = async (req: AuthRequest, res: Response) => {
    const { newPass, cnfmNewPass } = req.body;
    const { token } = req.params;

    try {
        if (!token || !newPass || !cnfmNewPass) {
            return res.status(400).json({ msg: "All Fields are required" })
        };

        if (newPass !== cnfmNewPass) {
            return res.status(400).json({
                msg: "Password and Confirm Password do not match"
            })
        };

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetPassToken: hashedToken,
            resetPassExpiry: {
                $gt: Date.now()
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: "Not Found"
            })
        };

        const newHashedPass = await bcrypt.hash(newPass, 10);
        user.password = newHashedPass;
        user.resetPassToken = null;
        user.resetPassExpiry = null;
        await user.save();

        return res.status(200).json({
            msg: "Password Reset Succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}



export default {
    registerUser,
    loginUser,
    verifyEmail,
    requestForChangePass,
    resetPassword
};