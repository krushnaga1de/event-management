import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res, next) => {
  try {
    const { name, date, time, maxSeats } = req.body;

    if (!name || !date || !time || !maxSeats) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    if (maxSeats < 1) {
      res.status(400);
      throw new Error('Max seats must be at least 1');
    }

    const eventDate = new Date(date);
    if (eventDate < new Date().setHours(0,0,0,0)) {
      res.status(400);
      throw new Error('Event date cannot be in the past');
    }

    const event = await Event.create({
      name,
      date,
      time,
      maxSeats,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Private
export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    
    let resultEvents = [];

    // For students, check if they are registered for each event
    if (req.user.role === 'student') {
      const studentRegistrations = await Registration.find({ student: req.user._id });
      const registeredEventIds = studentRegistrations.map(r => r.event.toString());

      resultEvents = events.map(event => {
        const eventObj = event.toJSON();
        eventObj.isRegistered = registeredEventIds.includes(event._id.toString());
        return eventObj;
      });
    } else {
      resultEvents = events.map(e => e.toJSON());
    }

    res.status(200).json(resultEvents);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    // Delete event and its registrations
    await Registration.deleteMany({ event: req.params.id });
    await event.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Event deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get event attendees
// @route   GET /api/events/:id/attendees
// @access  Private/Admin
export const getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    const registrations = await Registration.find({ event: req.params.id })
      .populate('student', 'name email');

    const attendees = registrations.map(reg => reg.student);

    res.status(200).json(attendees);
  } catch (error) {
    next(error);
  }
};
