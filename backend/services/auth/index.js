import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 6001

app.get("/", (req, res) => {
    res.send("👋 Hello from auth service!")
})

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`)
})