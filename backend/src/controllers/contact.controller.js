import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";

const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        throw new ApiError(400, "All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        message
    });

    if (!contact) {
        throw new ApiError(500, "Something went wrong while submitting the form");
    }

    return res.status(201).json(
        new ApiResponse(201, contact, "Message submitted successfully")
    );
});

export { submitContactForm };
