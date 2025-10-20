import { getUserDetails } from "@/controllers/user.controller";
import { clerkMiddleware } from "@clerk/express";
import { Router } from "express";

const router = Router();

router.get("/", clerkMiddleware(), getUserDetails)

export default router