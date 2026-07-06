import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import authMiddleware from "../middleware/auth.middleware.js";
import accessCodeRoutes from "../modules/accessCodes/accessCode.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import progressRoutes from "../modules/progress/progress.routes.js";
import quizzesRoutes from "../modules/quizzes/quizzes.routes.js";
import lessonsRoutes from "../modules/lessons/lesson.routes.js";
import analyticsRoutes from "../modules/analytics/analytics.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js"
import toolKitRoutes from "../modules/toolkit/toolkit.routes.js"
import assessmentRoutes from "../modules/assessments/assessment.routes.js";
import submissionRoutes from "../modules/submission/submission.route.js"

const router = Router();

router.use(
    "/auth", 
    authRoutes
);

router.use("/user", userRoutes);
router.use("/access-codes", accessCodeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/notifications", notificationRoutes);
router.use("/progress", progressRoutes);
router.use("/quizzes", quizzesRoutes);
router.use("/lessons", authMiddleware, lessonsRoutes);
router.use("/analytics", authMiddleware, analyticsRoutes);
router.use("/ai", aiRoutes)
router.use("/toolKit", toolKitRoutes)
router.use("/assessments", assessmentRoutes);
router.use("/submission", submissionRoutes)

export default router;