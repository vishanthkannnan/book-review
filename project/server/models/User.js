import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  favoriteGenres: [{
    type: String
  }],
  reviewsCount: {
    type: Number,
    default: 0
  },
  likesReceived: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compare password method (plain text, not secure)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return candidatePassword === this.password;
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);