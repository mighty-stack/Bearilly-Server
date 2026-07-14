import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware.js";
import accessMiddleware from "../../middleware/access.middleware.js";
import analyticsController from "./analytics.controller.js";

const router = Router()

router.get("/stats", authMiddleware, accessMiddleware, analyticsController.getLearningStats)
router.post("/track", authMiddleware, accessMiddleware, analyticsController.trackEvent)
router.get("/dashboard", authMiddleware, accessMiddleware, analyticsController.getDashboardAnalytics)

export default router