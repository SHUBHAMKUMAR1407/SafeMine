import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 18 },
    designation: { type: String, required: true },
    shift: { type: String, required: true },
    contactNumber: { type: String, required: true, match: /^\d{10}$/ },
    emergencyContact: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Worker = mongoose.model("Worker", workerSchema);
