import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./configs/db.config.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 6001

app.get("/", (req, res) => {
    res.send("👋 Hello from auth service!")
})

app.use("/", authRoutes)

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`)
    connectDB()
})