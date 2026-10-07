import { getAuth } from "firebase-admin/auth";

import { app } from "../configs/firebase.config";
import User from "../models/user.model";

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

        return res.status(200).json({ success: true, user })
    } catch (error) {
        return res.status(500).json("Google auth error:", error)
    }
}