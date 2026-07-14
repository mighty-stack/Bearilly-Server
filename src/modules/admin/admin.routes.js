import { Router } from 'express';

import authMiddleware from '../../middleware/auth.middleware.js';
import authorize from '../../middleware/authorize.middleware.js';
import adminController from './admin.controller.js';

const router = Router();

router.get('/overview', authMiddleware, authorize('admin'), adminController.getAdminDashboard);
router.get('/users', authMiddleware, authorize('admin'), adminController.getUsers);
router.patch('/users/:id/role', authMiddleware, authorize('admin'), adminController.updateUserRoleHandler);
router.get('/access-codes', authMiddleware, authorize('admin'), adminController.getAccessCodes);
router.get('/analytics', authMiddleware, authorize('admin'), adminController.getAnalytics);

export default router;
