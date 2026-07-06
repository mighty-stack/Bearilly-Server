import Quiz from "./quizzes.model.js";
import Analytics from "../analytics/analytics.model.js";

const createQuiz = async (req, res, next) => {
    try {
        const { lessonId, question, options, correctAnswer } = req.body;
        const quiz = new Quiz({ lessonId, question, options, correctAnswer });
        await quiz.save();
        await Analytics.create({
            userId: req.user._id,
            lessonId,
            eventName: 'quiz_created',
        });
        res.json({
            success: true,
            data: quiz,
        });
    } catch (error) {
        next(error);
    }
};

const getQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        res.json({
            success: true,
            data: quiz,
        });
    } catch (error) {
        next(error);
    }
};

const submitQuiz = async (req, res, next) => {
    try {
        const { quizId, answer } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        const isCorrect = quiz.correctAnswer === answer;
        res.json({
            success: true,
            data: { isCorrect },
        });
        await Analytics.create({
            userId: req.user._id,
            lessonId: quiz.lessonId,
            eventName: isCorrect ? 'quiz_passed' : 'quiz_failed',
        });
    } catch (error) {
        next(error);
    }
};

const quizzesController = {
    createQuiz,
    getQuiz,
    submitQuiz,
} 

export default quizzesController