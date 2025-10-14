import { User } from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { verifyWebhook } from '@clerk/express/webhooks'
import { Request, Response } from "express";

export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    // Verify webhook signature
    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET
    if (!webhookSecret) {
        return res.status(500).json({ error: 'Webhook secret not configured' })
    }

    try {
        const event = await verifyWebhook(req, { signingSecret: webhookSecret })

        switch (event.type) {
            case 'user.created': {
                // Handle user creation
                // Insert user data into your database here
                console.log("event.data =>", event.data)

                const user = await User.create({
                    clerk_Id: event.data.id,
                    firstName: event.data.first_name,
                    lastName: event.data.last_name,
                    email: event.data.email_addresses[0]?.email_address,
                    avatar: event.data.image_url
                })

                return res.status(200).json({ success: true })
            }

            case 'user.updated': {
                // Handle user updates
                const updatedData = {
                    first_name: event.data.first_name,
                    last_name: event.data.last_name,
                    updated_at: new Date(event.data.updated_at).toISOString(),
                }

                // Update user in your database
                // await db.users.update(updatedData, { where: { id: event.data.id } })

                console.log('User updated:', updatedData)
                return res.status(200).json({ success: true })
            }

            default: {
                console.log('Unhandled event type:', event.type)
                return res.status(200).json({ success: true })
            }
        }
    } catch (error) {
        console.error('Webhook verification failed:', error)
        return res.status(400).json({ error: 'Webhook verification failed' })
    }
})