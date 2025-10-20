import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";

export const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated) {
        return res.status(401).json({ error: 'User not authenticated' })
    }

    const user = await clerkClient.users.getUser(userId)

    res.status(200).json(new ApiResponse(200, "User Data is fetched", user))
})