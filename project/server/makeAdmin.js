import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booknest';
const ADMIN_EMAIL = 'vishanthkannan777@gmail.com';

async function makeAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('📚 Connected to MongoDB');

    // Find user by email
    const user = await User.findOne({ email: ADMIN_EMAIL });
    
    if (!user) {
      console.log('❌ User not found. Please register first with email:', ADMIN_EMAIL);
      return;
    }

    // Update user role to admin
    user.role = 'admin';
    await user.save();

    console.log('✅ User made admin successfully!');
    console.log('Email:', user.email);
    console.log('Username:', user.username);
    console.log('Role:', user.role);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📚 Disconnected from MongoDB');
  }
}

makeAdmin(); 