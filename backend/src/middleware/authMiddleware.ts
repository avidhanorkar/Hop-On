import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string,
    prem?: boolean
}

const isLoggedIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(404).json({
            msg: "Login Token not present"
        })
    }

    const token = authHeaders.split(" ")[1];

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_secret as string) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Invalid or Expired Token"
        })
    }
}


export default { isLoggedIn };