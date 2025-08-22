import mongoose, { Schema } from "mongoose";

const detailSchema = new Schema(
  {
    date: { type: Date, required: true },
    rounds: {
      completed: { type: Number, default: 0 },
      overdue: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
      inProgress: { type: Number, default: 0 },
      cancelled: { type: Number, default: 0 },
    },
    tasks: {
      completed: { type: Number, default: 0 },
      incomplete: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
    },
    actions: {
      pending: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
    },
    employees: {
      total: { type: Number, default: 0 },
      present: { type: Number, default: 0 },
      absent: { type: Number, default: 0 },
      lateArrival: { type: Number, default: 0 },
      onLeave: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Detail = mongoose.model("Detail", detailSchema);
