import {Router} from 'express';

import authMiddleware from '../../middleware/auth.middleware.js';
import notificationController from './notification.controller.js';

const router = Router();

router.get('/:userId', authMiddleware, notificationController.getUserNotifications);
router.post('/', authMiddleware, notificationController.createNotification);
router.patch('/:notificationId/read', authMiddleware, notificationController.markAsRead);

export default router;