import express from 'express';
import Book from '../models/Book.js';
import User from '../models/User.js';
import { adminMiddleware } from '../middleware/admin.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Add a new book
router.post('/books', async (req, res) => {
  try {
    const { title, author, isbn, genre, description, coverImage, publishedYear, pageCount, language } = req.body;

    // Validation
    if (!title || !author || !genre || !description || !coverImage || !publishedYear) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if book already exists
    const existingBook = await Book.findOne({ 
      $or: [{ isbn }, { title, author }] 
    });

    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    // Create new book
    const book = new Book({
      title,
      author,
      isbn,
      genre,
      description,
      coverImage,
      publishedYear,
      pageCount,
      language
    });

    await book.save();

    res.status(201).json({
      message: 'Book added successfully',
      book
    });
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a book
router.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all books (admin view)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Make a user admin
router.post('/users/:id/make-admin', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User made admin successfully',
      user
    });
  } catch (error) {
    console.error('Make admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 