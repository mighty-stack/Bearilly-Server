import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
import paymentController from './payment.controller.js';

const router = Router();

router.post('/initialize', authMiddleware, paymentController.initializePayment);
router.get('/verify/:reference', authMiddleware, paymentController.verifyPayment);

export default router;
