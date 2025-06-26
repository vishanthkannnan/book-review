import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  coverImage: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number
  },
  language: {
    type: String,
    default: 'English'
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

export default mongoose.model('Book', bookSchema);