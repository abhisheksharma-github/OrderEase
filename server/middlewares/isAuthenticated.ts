import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include `id`
declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ success: false, message: "User not authenticated" });
            return;
        }

        interface DecodedToken extends jwt.JwtPayload {
            userId: string;
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as DecodedToken;
            req.id = decoded.userId;
            next(); // ✅ Ensure `next()` is only called after successful verification
        } catch (err) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
