import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Worker } from "../models/worker.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addWorker = asyncHandler(async (req, res) => {
  const workerData = req.body;

  // Validate required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "designation",
    "shift",
    "contactNumber",
    "emergencyContact",
    "address",
  ];
  if (requiredFields.some((field) => !workerData[field] || workerData[field].trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check for duplicate email or contact number
  const existingWorker = await Worker.findOne({
    $or: [{ email: workerData.email }, { contactNumber: workerData.contactNumber }],
  });
  if (existingWorker) {
    throw new ApiError(409, "A worker with the given email or contact number already exists.");
  }

  const worker = await Worker.create(workerData);
  res.status(201).json(new ApiResponse(201, worker, "Worker added successfully."));
});

const getWorkers = asyncHandler(async (req, res) => {
  try {
    const workers = await Worker.find();
    return res.status(200).json(new ApiResponse(200, workers, "Workers fetched successfully."));
  } catch (err) {
    console.error('Error fetching workers:', err);
    // Ensure CORS header is present on error responses
    if (req && req.headers && req.headers.origin) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    return res.status(500).json({ success: false, message: 'Failed to fetch workers' });
  }
});

const updateWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const worker = await Worker.findByIdAndUpdate(id, updatedData, { new: true });
  if (!worker) {
    throw new ApiError(404, "Worker not found.");
  }

  res.status(200).json(new ApiResponse(200, worker, "Worker updated successfully."));
});

const deleteWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const worker = await Worker.findByIdAndDelete(id);
  if (!worker) {
    throw new ApiError(404, "Worker not found.");
  }

  res.status(200).json(new ApiResponse(200, {}, "Worker deleted successfully."));
});

export { addWorker, getWorkers, updateWorker, deleteWorker };
