import Assessment from "./assessment.model.js";
import Submission from "../submission/submission.model.js"

const createAssessment =
  (payload) =>
    Assessment.create(payload);

const getSubmission =
  (id) =>
    Submission.findById(id);

const updateAssessment = async (id, payload) => {
  const assessment =
    await Assessment.findById(id);
  if (!assessment) {
    throw new Error("Assessment not found");
  }
  if (assessment.status === "Closed") {
    throw new Error(
      "Closed assessments cannot be edited."
    );
  }
  return await Assessment.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteAssessment = async (id) => {
  return await Assessment.findByIdAndDelete(id);
};

const getAssessment = async (id) => {
  return await Assessment.findById(id)
    .populate(
      "createdBy",
      "fullName email"
    );
};

const getAllAssessments = async (query, user) => {

  const {
    page = 1,
    limit = 10,
    status,
    category,
    search,
  } = query;

  const filter = {
    isActive: true,
  };

  // Learners only see published assessments
  if (user.role !== "admin") {
    filter.status = "Published";
  } else if (status) {
    filter.status = status;
  }

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const total = await Assessment.countDocuments(filter);

  const assessments = await Assessment.find(filter)
    .sort({ deadline: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    assessments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const publishAssessment = async (id) => {
  return await Assessment.findByIdAndUpdate(
    id,
    {
      status: "Published",
    },
    {
      new: true,
    }
  )
};

const closeAssessment = async (id) => {
  return await Assessment.findByIdAndUpdate(
    id,
    {
      status: "Closed",
    },
    {
      new: true,
    }
  )
};

const reopenAssessment = async (id) => {
  return await Assessment.findByIdAndUpdate(
    id,
    {
      status: "Published",
    },
    {
      new: true,
    }
  )
}

const assessmentService = {
  createAssessment, 
  getAssessment, 
  getSubmission, 
  updateAssessment, 
  deleteAssessment, 
  getAllAssessments,
  publishAssessment,
  closeAssessment,
  reopenAssessment
}

export default assessmentService