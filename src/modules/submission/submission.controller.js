import submissionService from "./submission.service.js";
import Analytics from "../analytics/analytics.model.js";

import generateSubmissionId from "../../utils/generateSubmissionId.js";

const submitProject = async (req, res, next) => {
  try {
    const assessment = await submissionService.getAssessment(
      req.params.assessmentId,
    );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    if (assessment.status !== "Published") {
      return res.status(400).json({
        success: false,
        message: "Assessment is not accepting submissions",
      });
    }

    if (new Date() > assessment.deadline && !assessment.allowLateSubmission) {
      return res.status(400).json({
        success: false,
        message: "Submission deadline has passed",
      });
    }

    const existing = await submissionService.hasSubmitted(
      req.params.assessmentId,
      req.user._id,
    );

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted this assessment.",
      });
    }

    let fileUrl = "";
    let originalName = "";
    let fileType = "link";

    if (req.file) {
      fileUrl = `/uploads/submissions/${req.file.filename}`;
      originalName = req.file.originalname;
      fileType = req.file.originalname.split(".").pop()?.toLowerCase() || "file";
    } else {
      fileUrl = req.body.fileUrl || "";
      fileType = req.body.submissionType === "File" ? "file" : req.body.submissionType.toLowerCase();
    }

    const submission = await submissionService.createSubmission({
      assessment: req.params.assessmentId,
      user: req.user._id,
      submissionType: req.body.submissionType,
      fileUrl,
      originalFileName: originalName,
      remarks: req.body.remarks,
      submissionId: generateSubmissionId(),
    });

    await assessment.updateOne({
      $inc: {
        totalSubmissions: 1,
      },
    });

    await Analytics.create({
      userId: req.user._id,
      lessonId: assessment._id,
      eventType: "submission_started",
      metadata: { assessmentId: assessment._id, submissionType: req.body.submissionType },
    });

    await Analytics.create({
      userId: req.user._id,
      lessonId: assessment._id,
      eventType: "submission_completed",
      metadata: { assessmentId: assessment._id, submissionId: submission.submissionId },
    });

    await Analytics.create({
      userId: req.user._id,
      lessonId: assessment._id,
      eventType: "file_type_usage",
      metadata: { fileType, assessmentId: assessment._id },
    });

    res.status(201).json({
      success: true,
      message: "Submission successful.",
      submission,
    });
  } catch (error) {
    next(error);
  }
};

const getMySubmissions = async (req, res, next) => {
  try {
    const submissions = await submissionService.getMySubmissions(req.user._id);
    res.json({
      success: true,

      submissions,
    });
  } catch (error) {
    next(error);
  }
};

const getAssessmentSubmissions = async (req, res, next) => {
  try {
    const submissions = await submissionService.getAssessmentSubmissions(
      req.params.assessmentId,
    );
    res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};

const getSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.getSubmissionById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }
    res.json({
      success: true,
      submission,
    });
  } catch (error) {
    next(error);
  }
};

const reviewSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.reviewSubmission(req.params.id, {
      score: req.body.score,
      feedback: req.body.feedback,
      status: "Reviewed",
    });
    res.json({
      success: true,
      message: "Submission reviewed.",
      submission,
    });
  } catch (error) {
    next(error);
  }
};

const markUnderReview = async (req, res, next) => {
  try {
    const submission = await submissionService.updateSubmissionStatus(
      req.params.id,
      "Under Review",
    );
    res.json({
      success: true,
      submission,
    });
  } catch (error) {
    next(error);
  }
};

const downloadSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.getSubmissionById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }
    res.download(submission.fileUrl.replace("/", ""));
  } catch (error) {
    next(error);
  }
};

const submissionReceipt = async (req, res, next) => {
  try {
    const submission = await submissionService.getSubmissionById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    res.json({
      success: true,
      receipt: {
        submissionId: submission.submissionId,
        assessment: submission.assessment?.title || "N/A",
        submittedBy: submission.user?.fullName || "N/A",
        date: submission.createdAt,
        status: submission.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

const submissionController = {
  submitProject,
  getMySubmissions,
  getAssessmentSubmissions,
  getSubmission,
  reviewSubmission,
  markUnderReview,
  downloadSubmission,
  submissionReceipt,
};

export default submissionController
