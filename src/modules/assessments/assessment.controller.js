import assessmentService from "./assessment.service.js";

const createAssessment = async (req, res, next) => {
  try {
    const assessment =
      await assessmentService.createAssessment({
        ...req.body,
        createdBy: req.user._id,
      });
    res.status(201).json({
      success: true,
      assessment,
    });
  } catch (error) {
    next(error);
  }
}

const getAllAssessments = async (req, res, next) => {
  try {
    const result =
      await assessmentService.getAllAssessments(
        req.query,
        req.user
      );
    res.json({
      success: true,
      ...result,
    })
  } catch (error) {
    next(error)
  }
};

const getAssessment = async (req, res, next) => {
  try {
    const assessment =
      await assessmentService.getAssessment(
        req.params.id
      )
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message:
          "Assessment not found"
      })
    }
    res.json({
      success: true,
      assessment
    })
  } catch (error) {
    next(error)
  }
}

const updateAssessment = async (req, res, next) => {
  try {
    const assessment =
      await assessmentService.updateAssessment(
        req.params.id,
        req.body
      )
    res.json({
      success: true,
      assessment,
    })
  } catch (error) {
    next(error)
  }
}

const deleteAssessment = async (req, res, next) => {
  try {
    await assessmentService.deleteAssessment(
      req.params.id
    );
    res.json({
      success: true,
      message:
        "Assessment deleted successfully",
    })
  } catch (error) {
    next(error);
  }
}

const publishAssessment = async (req, res, next) => {
  try {
    const assessment =
      await assessmentService.publishAssessment(
        req.params.id
      )
    res.json({
      success: true,
      assessment
    })
  } catch (error) {
    next(error)
  }
}

const closeAssessment = async (req, res, next) => {
  try {
    const assessment =
      await assessmentService.closeAssessment(
        req.params.id
      )
    res.json({
      success: true,
      assessment
    })
  } catch (error) {
    next(error)
  }
}

const reopenAssessment = async (req, res, next) => {
  try {
    const assessment =
      await AssessmentService.reopenAssessment(
        req.params.id
      );
    res.json({
      success: true,
      assessment,
    })
  } catch (error) {
    next(error);
  }
}

const assessmentController = {
    createAssessment,
    getAssessment,
    getAllAssessments,
    updateAssessment,
    deleteAssessment,
    publishAssessment,
    closeAssessment,
    reopenAssessment
}

export default assessmentController