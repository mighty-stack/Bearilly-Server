import {Router} from "express"

import authMiddleware from "../../middleware/auth.middleware.js"

import accessCodeController from "./accessCode.controller.js"

const accessCodeRouter = Router()

accessCodeRouter.post("/generate", authMiddleware, accessCodeController.generateCode)
accessCodeRouter.post("/verify", authMiddleware, accessCodeController.verifyCode)

export default accessCodeRouter