import express from 'express';
import Review from '../models/Review.js';
import Book from '../models/Book.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { bookId, rating, title, content, emoji, spoilerWarning } = req.body;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user.userId,
      book: bookId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Create review
    const review = new Review({
      user: req.user.userId,
      book: bookId,
      rating,
      title,
      content,
      emoji: emoji || '📚',
      spoilerWarning: spoilerWarning || false
    });

    await review.save();

    // Update book statistics
    await updateBookStats(bookId);

    // Update user review count
    await User.findByIdAndUpdate(req.user.userId, { $inc: { reviewsCount: 1 } });

    // Populate user data for response
    await review.populate('user', 'username avatar');

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error creating review' });
  }
});

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'username avatar')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Review.countDocuments({ book: bookId });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

// Like/Unlike a review
router.post('/:reviewId/like', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const userIndex = review.likes.indexOf(req.user.userId);
    
    if (userIndex > -1) {
      // Unlike
      review.likes.splice(userIndex, 1);
      review.likesCount = Math.max(0, review.likesCount - 1);
    } else {
      // Like
      review.likes.push(req.user.userId);
      review.likesCount += 1;
    }

    await review.save();

    res.json({
      message: userIndex > -1 ? 'Review unliked' : 'Review liked',
      likesCount: review.likesCount,
      isLiked: userIndex === -1
    });
  } catch (error) {
    console.error('Like review error:', error);
    res.status(500).json({ message: 'Server error processing like' });
  }
});

// Get user's reviews
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('book', 'title author coverImage')
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error fetching user reviews' });
  }
});

// Helper function to update book statistics
async function updateBookStats(bookId) {
  const reviews = await Review.find({ book: bookId });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  await Book.findByIdAndUpdate(bookId, {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    totalRatings: totalReviews
  });
}

export default router;