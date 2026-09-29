import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private/Student
export const registerForEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user._id;

    // Atomically increment registeredCount if less than maxSeats
    const updatedEvent = await Event.findOneAndUpdate(
      { 
        _id: eventId, 
        $expr: { $lt: ['$registeredCount', '$maxSeats'] } 
      },
      { 
        $inc: { registeredCount: 1 } 
      },
      { 
        new: true 
      }
    );

    if (!updatedEvent) {
      // Check if event exists at all
      const eventExists = await Event.findById(eventId);
      if (!eventExists) {
        res.status(404);
        throw new Error('Event not found');
      } else {
        res.status(400); // 409 or 400
        throw new Error('Event is full');
      }
    }

    try {
      // Create registration
      const registration = await Registration.create({
        event: eventId,
        student: studentId,
      });

      res.status(201).json(registration);
    } catch (error) {
      // If duplicate key error (code 11000) or any other error, rollback the increment
      await Event.findByIdAndUpdate(eventId, {
        $inc: { registeredCount: -1 },
      });

      if (error.code === 11000) {
        res.status(409);
        return next(new Error('You are already registered for this event'));
      }
      
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get my registrations
// @route   GET /api/registrations/my
// @access  Private/Student
export const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });
    
    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};
