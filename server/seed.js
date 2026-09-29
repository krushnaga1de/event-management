import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Event from './models/Event.js';
import Registration from './models/Registration.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Registration.deleteMany();
    await Event.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'password123',
      role: 'admin',
    });

    const student1 = await User.create({
      name: 'Student One',
      email: 'student1@college.edu',
      password: 'password123',
      role: 'student',
    });

    const student2 = await User.create({
      name: 'Student Two',
      email: 'student2@college.edu',
      password: 'password123',
      role: 'student',
    });

    const sampleEvents = [
      {
        name: 'Tech Symposium 2026',
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        time: '10:00 AM',
        maxSeats: 50,
        createdBy: admin._id,
      },
      {
        name: 'React Workshop',
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        time: '2:00 PM',
        maxSeats: 20,
        createdBy: admin._id,
      },
      {
        name: 'Exclusive AI Seminar',
        date: new Date(new Date().setDate(new Date().getDate() + 10)),
        time: '4:00 PM',
        maxSeats: 1, // Only 1 seat to test 'Full' case easily
        createdBy: admin._id,
      },
    ];

    await Event.insertMany(sampleEvents);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Registration.deleteMany();
    await Event.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
