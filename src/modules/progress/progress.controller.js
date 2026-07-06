import Progress  from "./progress.model.js";
import Analytics from "../analytics/analytics.model.js";

const startLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.body;
        const userId = req.user._id;
        let progress = await Progress.findOne({ userId, lessonId });
        if (!progress) {
            progress = new Progress({ userId, lessonId, started: true });
        }
        await progress.save();
        await Analytics.create({
            userId,
            lessonId,
            eventName: 'lesson_started',
        });
        res.json({
            success: true,
            data: progress,
        });
    } catch (error) {
        next(error);
    }
};

const completeLesson = async (req, res, next) => {
    try {
        const { lessonId, quizScore } = req.body;
        const userId = req.user._id;
        let progress = await Progress.findOneAndUpdate(
            { userId, lessonId },
            { completed: true, quizScore },
            { new: true }
        );
        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Progress not found",
            });
        }
        await Analytics.create({
            userId,
            lessonId,
            eventName: 'lesson_completed',
        });
        res.json({
            success: true,
            data: progress,
        });
    } catch (error) {
        next(error);
    }
};

const progressController = {
    startLesson,
    completeLesson,
}

export default progressController