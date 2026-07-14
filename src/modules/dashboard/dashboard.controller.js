import dashboardService from './dashboard.service.js';

const getDashboard = async (req, res, next) => {
    try {
        const dashboardData = await dashboardService.getDashboardData(req.user._id);
        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: dashboardData
        });
    } catch (error) {
        next(error);
    }
};

const dashboardController = {
    getDashboard
}

export default dashboardController