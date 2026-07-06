import Analytics from "./analytics.model.js";

const getLearningStats = async (req, res, next) => {
    try {
        const started =
            await Analytics.countDocuments({ 
                userId: req.user._id,
                eventName: 'lesson_started' });
        const completed =
            await Analytics.countDocuments({ 
                userId: req.user._id,
                eventName: 'lesson_completed' });
        const quizPassed =
            await Analytics.countDocuments({ 
                userId: req.user._id,
                eventName: 'quiz_passed' });
        const quizFailed =
            await Analytics.countDocuments({ 
                userId: req.user._id,
                eventName: 'quiz_failed' });
        const quizAttempted = 
            await Analytics.countDocuments({
                userId: req.user._id,
                eventName:"quiz_attempted"
            })
        const completionRate = started > 0 
        ? ((completed/started)*100).toFixed(2) 
        : 0;
        res.json({
            success: true,
            stats: {
                lessonsStarted: started,
                lessonsCompleted: completed,
                quizzesPassed: quizPassed,
                quizzesFailed: quizFailed,
            },
        });
    } catch (error) {
        next(error);
    }
};

const analyticsController = {
    getLearningStats,
} 

export default analyticsController