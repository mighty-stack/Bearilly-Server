import openai from "./ai.service.js";

import AIMessage from "./ai.model.js"
import redis from "../../config/redis.js";
import aiGuardrails from "./ai.guardrails.js";
import moderatePrompt from "./ai.moderation.js";
import { success } from "zod";

const chat = 
    async (req, res, next) => {
        try {
            const {message} = req.body
            validatePrompt(message)

            await moderatePrompt(message)

            const cacheKey = `ai:${message}`
            const cached = await redis.get(cacheKey)

            if (cached) {
                return res.json({
                    success: true,
                    answer: cached,
                    cached: true
                })
            }

            const history = await AIMessage
            .find({
                userId: req.user._id
            })
            .sort({
                createdAt: -1
            })
            .limit(10)

            const messages = [{
                role: "system",
                content: `You're Bearily AI Tutor
                You teach
                - Content Creation
                - Social Media
                - Branding
                - Monetization
                keep answers concise and educational
                `
            },
            ...history.reverse(),
            {
                role: "user",
                content: message
            }
        ]

        const response = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages
        })

        const answer = response.choices[0].message.content

        await AIMessage.create({
            userId: req.user._id,
            role: "assistant",
            content: answer
        })

        await redis.set(
            cacheKey,
            answer,
            "EX",
            86400
        )

        res.json({
            success: true,
            answer
        })
        } catch (error) {
            next(error)
        }
    }

export default chat