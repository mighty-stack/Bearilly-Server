import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    quizScore: {
        type: Number,
    },
    metadata: {
        type: Object,
    }
}, {
    timestamps: true,
});




export default mongoose.model('Analytics', analyticsSchema);