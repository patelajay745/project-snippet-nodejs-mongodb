import express, { Express } from "express";
import clerkRoute from "./routes/clerk.route";
const app: Express = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

app.use("/api/webhooks/clerk", clerkRoute)

export default app