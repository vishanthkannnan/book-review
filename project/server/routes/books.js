import express from 'express';
import Book from '../models/Book.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get all books with filtering and search
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      genre, 
      minRating, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Genre filter
    if (genre && genre !== 'all') {
      query.genre = genre;
    }

    // Rating filter
    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
});

// Get trending books
router.get('/trending', async (req, res) => {
  try {
    const trendingBooks = await Book.find({ isTrending: true })
      .sort({ averageRating: -1, totalReviews: -1 })
      .limit(10)
      .lean();

    res.json(trendingBooks);
  } catch (error) {
    console.error('Get trending books error:', error);
    res.status(500).json({ message: 'Server error fetching trending books' });
  }
});

// Get book by ID with reviews
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get recent reviews for this book
    const reviews = await Review.find({ book: book._id })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({ ...book, recentReviews: reviews });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error fetching book' });
  }
});

// Get genres
router.get('/meta/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres.sort());
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({ message: 'Server error fetching genres' });
  }
});

export default router;