import express from "express";
import {
  getDashboardSummary,
  getWeeklyActivity,
  getClassBreakdown,
  getTeacherDetails,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);
router.get("/weekly", getWeeklyActivity);
router.get("/:id/breakdown", getClassBreakdown);
router.get("/:id", getTeacherDetails);

export default router;
