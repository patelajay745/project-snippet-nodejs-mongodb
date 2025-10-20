import express, { Express } from "express";
import clerkRoute from "./routes/clerk.route";
import userRoute from "@/routes/user.route"
const app: Express = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

app.use("/api/webhooks/clerk", clerkRoute)
app.use("/v1/user", userRoute)

export default app