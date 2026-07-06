import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    started: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    quizScore: {
        type: Number,
        default: 0,
    },
    completedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Progress', progressSchema);