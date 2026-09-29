import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    maxSeats: {
      type: Number,
      required: [true, 'Maximum seats is required'],
      min: [1, 'Maximum seats must be at least 1'],
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for remaining seats
eventSchema.virtual('remainingSeats').get(function() {
  return this.maxSeats - this.registeredCount;
});

// Ensure virtuals are included in toJSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
