import {Router} from 'express';

import authMiddleware from '../../middleware/auth.middleware.js';
import accessMiddleware from '../../middleware/access.middleware.js';
import userController from './user.controller.js';

const router = Router();  

router.get('/profile', authMiddleware, accessMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, accessMiddleware, userController.updateProfile);

export default router;  