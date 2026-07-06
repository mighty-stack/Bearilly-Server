import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js"
import accessMiddleware from "../../middleware/access.middleware.js"
import aiRateLimiter from "../../middleware/aiRateLimit.middleware.js";
import chat from "./ai.controller.js";

const router = Router()

router.post(
    "/chat", authMiddleware, accessMiddleware, aiRateLimiter, chat
)

export default router