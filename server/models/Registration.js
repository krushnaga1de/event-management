import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index so a student can only register once per event
registrationSchema.index({ event: 1, student: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
