import User from '../users/user.model.js';
import Assessment from '../assessments/assessment.model.js';
import Submission from '../submission/submission.model.js';
import AccessCode from '../accessCodes/accessCode.model.js';
import Analytics from '../analytics/analytics.model.js';

export const buildAdminOverviewPayload = ({ totals, recentAssessments, recentSubmissions }) => ({
  stats: {
    totalUsers: totals.users,
    totalAdmins: totals.admins,
    totalAssessments: totals.assessments,
    publishedAssessments: totals.publishedAssessments,
    totalSubmissions: totals.submissions,
    pendingReviews: totals.pendingReviews,
    reviewedSubmissions: totals.reviewedSubmissions,
    activeAccessCodes: totals.activeAccessCodes,
  },
  recentAssessments,
  recentSubmissions,
});

export const getAdminOverview = async () => {
  const [users, admins, assessments, submissions, activeAccessCodes] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'admin' }),
    Assessment.countDocuments(),
    Submission.countDocuments(),
    AccessCode.countDocuments({ status: 'active' }),
  ]);

  const [publishedAssessments, pendingReviews, reviewedSubmissions, recentAssessments, recentSubmissions] = await Promise.all([
    Assessment.countDocuments({ status: 'Published' }),
    Submission.countDocuments({ status: 'Under Review' }),
    Submission.countDocuments({ status: 'Reviewed' }),
    Assessment.find({ isActive: true }).sort({ createdAt: -1 }).limit(5).select('title status deadline').lean(),
    Submission.find().populate('assessment', 'title').sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return buildAdminOverviewPayload({
    totals: {
      users,
      admins,
      assessments,
      publishedAssessments,
      submissions,
      pendingReviews,
      reviewedSubmissions,
      activeAccessCodes,
    },
    recentAssessments,
    recentSubmissions,
  });
};

export const listUsers = async (query = {}) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const filter = {};

  if (query.role) {
    filter.role = query.role;
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateUserRole = async (userId, role) => {
  if (!['user', 'admin'].includes(role)) {
    throw new Error('Invalid role');
  }

  const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const listAccessCodes = async (query = {}) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  const total = await AccessCode.countDocuments(filter);
  const accessCodes = await AccessCode.find(filter)
    .populate('createdBy', 'fullName email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    accessCodes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAdminAnalytics = async () => {
  const [lessonStarts, lessonCompletes, submissionsCompleted, reviewedSubmissions, userActivity] = await Promise.all([
    Analytics.countDocuments({ eventType: 'lesson_started' }),
    Analytics.countDocuments({ eventType: 'lesson_completed' }),
    Analytics.countDocuments({ eventType: 'submission_completed' }),
    Submission.countDocuments({ status: 'Reviewed' }),
    Analytics.aggregate([
      { $group: { _id: '$userId' } },
      { $count: 'activeUsers' },
    ]),
  ]);

  const reviewedScores = await Submission.aggregate([
    { $match: { status: 'Reviewed', score: { $exists: true, $ne: null } } },
    { $group: { _id: null, averageScore: { $avg: '$score' }, totalReviewed: { $sum: 1 } } },
  ]);

  const averageScore = reviewedScores[0]?.averageScore || 0;

  return {
    revenueDashboard: {
      totalRevenue: 0,
      totalPayments: 0,
      currency: 'NGN',
    },
    userBehaviorDashboard: {
      activeUsers: userActivity[0]?.activeUsers || 0,
      lessonStarts,
      lessonCompletes,
      submissionsCompleted,
    },
    learningPerformanceDashboard: {
      reviewedSubmissions,
      averageScore: Number(averageScore.toFixed(2)),
    },
  };
};
