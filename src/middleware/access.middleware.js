const accessMiddleware = (requiredRoleOrReq, res, next) => {
    if (typeof requiredRoleOrReq === "string") {
        const requiredRole = requiredRoleOrReq;

        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }

            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }

            if (!req.user.accessGranted) {
                return res.status(403).json({
                    success: false,
                    message: "Access code required"
                });
            }

            next();
        };
    }

    const req = requiredRoleOrReq;

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (!req.user.accessGranted) {
        return res.status(403).json({
            success: false,
            message: "Access code required"
        });
    }

    next();
};

export default accessMiddleware;