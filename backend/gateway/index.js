import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 6000

app.get("/", (req, res) => {
    console.log("👋 Hello from gateway!")
})

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`)
})