import { Router } from "express";
import { addWorker, getWorkers, updateWorker, deleteWorker } from "../controllers/worker.controller.js";

const router = Router();

// Add new worker
router.route("/").post(addWorker);

// Get all workers
router.route("/").get(getWorkers);

// Update worker by ID
router.route("/:id").put(updateWorker);

// Delete worker by ID
router.route("/:id").delete(deleteWorker);

export default router;
