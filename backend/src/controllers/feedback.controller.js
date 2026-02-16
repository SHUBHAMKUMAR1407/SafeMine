import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feedback } from "../models/feedback.model.js";

const submitFeedback = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        throw new ApiError(400, "All fields are required");
    }

    const feedback = await Feedback.create({
        name,
        email,
        message
    });

    if (!feedback) {
        throw new ApiError(500, "Something went wrong while submitting feedback");
    }

    return res.status(201).json(
        new ApiResponse(201, feedback, "Feedback submitted successfully")
    );
});

export { submitFeedback };
