import Analytics from "./analytics.model.js";
import { getAnalyticsDashboard, recordEvent } from "./analytics.service.js";

const getLearningStats = async (req, res, next) => {
    try {
        const started = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "lesson_started" }, { eventName: "lesson_started" }],
        });
        const completed = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "lesson_completed" }, { eventName: "lesson_completed" }],
        });
        const quizPassed = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "quiz_passed" }, { eventName: "quiz_passed" }],
        });
        const quizFailed = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "quiz_failed" }, { eventName: "quiz_failed" }],
        });
        const submissionsStarted = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "submission_started" }, { eventName: "submission_started" }],
        });
        const submissionsCompleted = await Analytics.countDocuments({
            userId: req.user._id,
            $or: [{ eventType: "submission_completed" }, { eventName: "submission_completed" }],
        });
        const fileTypeUsage = await Analytics.aggregate([
            {
                $match: {
                    $or: [{ eventType: "file_type_usage" }, { eventName: "file_type_usage" }],
                    userId: req.user._id,
                },
            },
            {
                $group: {
                    _id: "$metadata.fileType",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ]);

        const completionRate = started > 0 ? ((completed / started) * 100).toFixed(2) : 0;

        res.json({
            success: true,
            stats: {
                lessonsStarted: started,
                lessonsCompleted: completed,
                completionRate: Number(completionRate),
                quizzesPassed,
                quizzesFailed,
                submissionsStarted,
                submissionsCompleted,
                fileTypeUsage,
            },
        });
    } catch (error) {
        next(error);
    }
};

const trackEvent = async (req, res, next) => {
    try {
        const event = await recordEvent({
            userId: req.user?._id || req.body.userId,
            lessonId: req.body.lessonId,
            eventType: req.body.eventType,
            eventName: req.body.eventName,
            quizId: req.body.quizId,
            quizScore: req.body.quizScore,
            metadata: req.body.metadata,
        });

        res.status(201).json({
            success: true,
            message: "Event tracked successfully",
            event,
        });
    } catch (error) {
        next(error);
    }
};

const getDashboardAnalytics = async (req, res, next) => {
    try {
        const payload = await getAnalyticsDashboard();
        res.status(200).json({
            success: true,
            data: payload,
        });
    } catch (error) {
        next(error);
    }
};

const analyticsController = {
    getLearningStats,
    trackEvent,
    getDashboardAnalytics,
};

export default analyticsController;