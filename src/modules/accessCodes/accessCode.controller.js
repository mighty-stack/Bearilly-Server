import accessCodeModel from "./accessCode.model.js";
import User from "../users/user.model.js";

import generateAccessCode from "../../utils/generateCode.js";

const generateCode = async (req, res, next) => {
    try {
        const code = generateAccessCode();
        const accessCode = await accessCodeModel.create({
            code,
            UsageLimit: 1,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
            createdBy: req.user._id});
        res.status(201).json({
            success: true,
            message: "Access code generated successfully",
            data: accessCode
        });
    } catch (error) {
        next(error)
    }
    }

    const verifyCode =
        async (req, res, next) => {
            try {
                const { code } = req.body;
                const accessCode = await accessCodeModel.findOne({ code })
                if (!accessCode) {
                    return res.status(404).json({
                        success: false,
                        message: "Invalid access code"
                    })
                }

                if (accessCode.status !== "active") {
                    return res.status(400).json({
                        success: false,
                        message: "Access code is not active"
                    })
                }

                if (accessCode.expiresAt < new Date()) {
                    return res.status(400).json({
                        success: false,
                        message: "Access code has expired"
                    })
                }

                if (accessCode.UsageCount >= accessCode.UsageLimit) {
                    return res.status(400).json({
                        success: false,
                        message: "Access code usage limit reached"
                    })
                }

                const user = await User.findById(req.user._id);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    })
                }

                user.accessGranted = true
                user.accessCodeId = accessCode._id
                await user.save();  

                accessCode.UsageCount += 1
                await accessCode.save()

                res.status(200).json({
                    success: true,
                    message: "Access code verified successfully",
                    data: accessCode
                });
            } catch (error) {
                next(error);
            }
        }

        const accessCodeController = {
            generateCode,
            verifyCode
        } 

        export default accessCodeController