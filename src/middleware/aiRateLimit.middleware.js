import rateLimit from "express-rate-limit"
import { success } from "zod"

const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    message: {
        success: false,
        message: "Too many AI request"
    }
})

export default aiRateLimiter