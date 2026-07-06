import {Router} from 'express';

import authMiddleware from '../../middleware/auth.middleware.js';
import accessMiddleware from '../../middleware/access.middleware.js';

import dashboardController from './dashboard.controller.js';

const router = Router();
router.get('/', authMiddleware, accessMiddleware, dashboardController.getDashboard);

export default router;