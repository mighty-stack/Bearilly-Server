import lesson from "./lesson.model.js";
import Progress from "../progress/progress.model.js";
import Analytics from "../analytics/analytics.model.js";
import Quiz from "../quizzes/quizzes.model.js";

const getAllLessons = async (req, res) => {
    try {
        const lessons = await lesson.find().sort({ order: 1 });
        res.json({
            success: true,
            data: lessons,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch lessons",
            error: error.message,
        });
    }
};
const getLesson = async (req, res) => {
    try {
        const lesson = await lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }
        res.json({
            success: true,
            data: lesson,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch lesson",
            error: error.message,
        });
    }
};

const lessonController = {
    getAllLessons,
    getLesson,
} 

export default lessonController