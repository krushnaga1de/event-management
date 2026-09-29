import express from 'express';
import { createEvent, getEvents, deleteEvent, getEventAttendees } from '../controllers/eventController.js';
import { registerForEvent } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';
import { requireRole as roleCheck } from '../middleware/role.js';

const router = express.Router();

router.route('/')
  .get(protect, getEvents)
  .post(protect, roleCheck('admin'), createEvent);

router.route('/:id')
  .delete(protect, roleCheck('admin'), deleteEvent);

router.get('/:id/attendees', protect, roleCheck('admin'), getEventAttendees);

router.post('/:id/register', protect, roleCheck('student'), registerForEvent);

export default router;
