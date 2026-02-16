import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
