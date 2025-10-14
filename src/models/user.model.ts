import { model, Schema } from "mongoose";

const userSchema = new Schema({
    clerk_Id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }

}, { timestamps: true })

export const User = model("User", userSchema)