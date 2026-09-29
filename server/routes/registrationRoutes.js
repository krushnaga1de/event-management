import express from 'express';
import { getMyRegistrations } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/my', protect, requireRole('student'), getMyRegistrations);

export default router;
