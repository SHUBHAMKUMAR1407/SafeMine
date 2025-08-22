import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Detail } from "../models/detail.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addDetail = asyncHandler(async (req, res) => {
  const detailData = req.body;

  const detail = await Detail.create(detailData);
  res.status(201).json(new ApiResponse(201, detail, "Detail added successfully."));
});

const getDetails = asyncHandler(async (req, res) => {
  const details = await Detail.find();
  res.status(200).json(new ApiResponse(200, details, "Details fetched successfully."));
});

const updateDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const detail = await Detail.findByIdAndUpdate(id, updatedData, { new: true });
  if (!detail) {
    throw new ApiError(404, "Detail not found.");
  }

  res.status(200).json(new ApiResponse(200, detail, "Detail updated successfully."));
});

const deleteDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const detail = await Detail.findByIdAndDelete(id);
  if (!detail) {
    throw new ApiError(404, "Detail not found.");
  }

  res.status(200).json(new ApiResponse(200, {}, "Detail deleted successfully."));
});

export { addDetail, getDetails, updateDetail, deleteDetail };
