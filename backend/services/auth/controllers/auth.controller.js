import { getAuth } from "firebase-admin/auth";

import { app } from "../configs/firebase.config.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const googleAuth = async (req, res) => {
    try {
        const { token } = req.body
        const decoded = await getAuth(app).verifyIdToken(token);

        let user = await User.findOne({
            firebaseUID: decoded.uid,
            name: decoded.name,
            email: decoded.email
        })

        if (!user) {
            user = await User.create({
                firebaseUID: decoded.uid,
                name: decoded.name,
                email: decoded.email
            })
        }

        const sessionId = crypto.randomUUID()

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await redis.set(`session:${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            interviewCoins: user.interviewCoins
        }), "EX", 7 * 24 * 60 * 60)

        return res.status(200).json({ success: true, user })
    } catch (error) {
        return res.status(500).json("Google auth error:", error)
    }
}

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.session

        if (sessionId) {
            await redis.del(`session:${sessionId}`)
        }

        res.clearCookie("session", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })

        res.status(200).json({
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}