import { success } from "zod"

const authorize = (...roles) => 
    (res, req, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({
                success,
                message: "You do not have permission to perform this action"
            })
        }

        next()
    }

    export default authorize
