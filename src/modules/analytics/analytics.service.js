import Analytics from './analytics.model.js';

export const buildAnalyticsDashboardPayload = ({ funnel, cohorts, retention }) => ({
  funnel: {
    lessonStarts: funnel?.lessonStarts ?? 0,
    lessonCompletes: funnel?.lessonCompletes ?? 0,
    quizAttempts: funnel?.quizAttempts ?? 0,
    quizPasses: funnel?.quizPasses ?? 0,
    submissionsCompleted: funnel?.submissionsCompleted ?? 0,
    completionRate: funnel?.lessonStarts
      ? Number(((funnel.lessonCompletes / funnel.lessonStarts) * 100).toFixed(2))
      : 0,
  },
  cohorts: cohorts ?? [],
  retention: retention ?? [],
});

export const recordEvent = async ({ userId, lessonId, eventType, eventName, quizId, quizScore, metadata }) => {
  const normalizedEventType = eventType || eventName || 'custom_event';

  return Analytics.create({
    userId,
    lessonId,
    eventType: normalizedEventType,
    eventName,
    quizId,
    quizScore,
    metadata,
  });
};

export const getAnalyticsDashboard = async () => {
  const [lessonStarts, lessonCompletes, quizAttempts, quizPasses, submissionsCompleted] = await Promise.all([
    Analytics.countDocuments({ $or: [{ eventType: 'lesson_started' }, { eventName: 'lesson_started' }] }),
    Analytics.countDocuments({ $or: [{ eventType: 'lesson_completed' }, { eventName: 'lesson_completed' }] }),
    Analytics.countDocuments({ $or: [{ eventType: 'quiz_started' }, { eventType: 'quiz_attempted' }, { eventName: 'quiz_started' }, { eventName: 'quiz_attempted' }] }),
    Analytics.countDocuments({ $or: [{ eventType: 'quiz_passed' }, { eventName: 'quiz_passed' }] }),
    Analytics.countDocuments({ $or: [{ eventType: 'submission_completed' }, { eventName: 'submission_completed' }] }),
  ]);

  const cohorts = await Analytics.aggregate([
    {
      $group: {
        _id: {
          month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          userId: '$userId',
        },
      },
    },
    {
      $group: {
        _id: '$_id.month',
        users: { $sum: 1 },
        activeUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const retention = await Analytics.aggregate([
    {
      $group: {
        _id: {
          month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          userId: '$userId',
        },
      },
    },
    {
      $group: {
        _id: '$_id.month',
        retainedUsers: { $sum: 1 },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return buildAnalyticsDashboardPayload({
    funnel: {
      lessonStarts,
      lessonCompletes,
      quizAttempts,
      quizPasses,
      submissionsCompleted,
    },
    cohorts: cohorts.map((item) => ({ month: item._id, users: item.users, activeUsers: item.activeUsers })),
    retention: retention.map((item) => ({ month: item._id, retainedUsers: item.retainedUsers, totalUsers: item.totalUsers })),
  });
};
