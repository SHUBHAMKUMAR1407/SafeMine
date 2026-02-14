import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
   // Extract user details from frontend
   const { firstName, lastName, mobile, email, password } = req.body;

   // Validate required fields
   if ([firstName, lastName, mobile, email, password].some(field => !field || field.trim() === "")) {
      throw new ApiError(400, "All fields are required.");
   }

   // Check if user already exists based on email or mobile number
   const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
   });

   if (existingUser) {
      throw new ApiError(409, "A user with the given email or mobile number already exists.");
   }

   // Create new user in the database
   const user = await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password
   });

   // Retrieve created user without password and tokens
   const createdUser = await User.findById(user._id).select("-password -refreshToken");

   if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user.");
   }

   return res.status(201).json(
      new ApiResponse(201, createdUser, "User registered successfully.")
   );
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new ApiError(400, "Email and password are required.");
   }

   const user = await User.findOne({ email });
   if (!user) {
      throw new ApiError(400, "User does not exist.");
   }

   const isPasswordValid = await user.isPasswordCorrect(password);
   if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials.");
   }

   // Generate access and refresh tokens using user methods
   const accessToken = user.generateAccessToken();
   const refreshToken = user.generateRefreshToken();
   const loggedInUser = await User.findById(user._id).select("-password");

   const options = {
      httpOnly: true,
      secure: true,
   };

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
         }, "User logged in successfully.")
      );
});
const logoutUser = asyncHandler(async (req, res) => {
   await User.findByIdAndUpdate(
      req.user._id,
      {
         $set: {
            refreshToken: undefined
         }
      },
      {
         new: true
      }
   )

   const options = {
      httpOnly: true,
      secure: true
   }
   return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"))
});


const resetPassword = asyncHandler(async (req, res) => {
   const { email, newPassword } = req.body;

   if (!email || !newPassword) {
      throw new ApiError(400, "Email and new password are required");
   }

   // Find user by email (case-insensitive)
   const user = await User.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") }
   });

   if (!user) {
      throw new ApiError(404, "User not found");
   }

   user.password = newPassword;
   await user.save({ validateBeforeSave: false });

   return res.status(200).json(
      new ApiResponse(200, {}, "Password reset successfully")
   );
});

export {
   registerUser,
   loginUser,
   logoutUser,
   resetPassword
}