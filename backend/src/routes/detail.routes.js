import { Router } from "express";
import { addDetail, getDetails, updateDetail, deleteDetail, getDashboardStats } from "../controllers/detail.controller.js";

const router = Router();

// Get stats for dashboard
router.route("/stats").get(getDashboardStats);

// Add new detail
router.route("/").post(addDetail);

// Get all details
router.route("/").get(getDetails);

// Update detail by ID
router.route("/:id").put(updateDetail);

// Delete detail by ID
router.route("/:id").delete(deleteDetail);

export default router;
