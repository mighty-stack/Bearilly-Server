import Submission from "./submission.model.js";
import Assessment from "../assessments/assessment.model.js";

const hasSubmitted = async (
    assessmentId,
    userId
) => {
    return await Submission.findOne({
        assessment: assessmentId,
        user: userId,
    });
};

const createSubmission = async (
    payload
) => {
    return await Submission.create(payload);
};

const getAssessment = async (
    id
) => {
    return await Assessment.findById(id);
};

const getMySubmissions = async (userId) => {
    return await Submission.find({
        user: userId,
    })
    .populate(
        "assessment",
        "title deadline category"
    )
    .sort({
        createdAt: -1,
    })
}

const getAssessmentSubmissions =
async (assessmentId) => {
    return await Submission.find({
        assessment: assessmentId,
    })
    .populate(
        "user",
        "fullName email"
    )
    .sort({
        createdAt: -1,
    })
}

const getSubmissionById =
async (id) => {
    return await Submission.findById(id)
    .populate(
        "user",
        "fullName email"
    )
    .populate(
        "assessment",
        "title"
    )
}

const reviewSubmission =
async (id, payload) => {
    return await Submission.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
    )
}

const updateSubmissionStatus =
async (
    id,
    status
) => {
    return await Submission.findByIdAndUpdate(
        id,
        {
            status,
        },
        {
            new: true,
        }
    )
}

const submissionService = {
    hasSubmitted, 
    createSubmission,
    getAssessment, 
    getMySubmissions, 
    getAssessmentSubmissions,
    getSubmissionById,
    reviewSubmission,
    updateSubmissionStatus
}

export default submissionService