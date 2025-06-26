import mongoose from 'mongoose';
import Book from './models/Book.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booknest';

const sampleBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    coverImage: "https://images.pexels.com/photos/3692073/pexels-photo-3692073.jpeg",
    publishedYear: 2020,
    pageCount: 288,
    averageRating: 4.5,
    totalReviews: 156,
    totalRatings: 156,
    isTrending: true,
    isPopular: true
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. James Clear draws on the most proven ideas from biology, psychology, and neuroscience.",
    coverImage: "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg",
    publishedYear: 2018,
    pageCount: 320,
    averageRating: 4.7,
    totalReviews: 243,
    totalRatings: 243,
    isTrending: true,
    isPopular: true
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Fiction",
    description: "Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    coverImage: "https://images.pexels.com/photos/3771605/pexels-photo-3771605.jpeg",
    publishedYear: 2017,
    pageCount: 400,
    averageRating: 4.6,
    totalReviews: 198,
    totalRatings: 198,
    isTrending: true
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides—who would become known as Muad'Dib.",
    coverImage: "https://images.pexels.com/photos/3771608/pexels-photo-3771608.jpeg",
    publishedYear: 1965,
    pageCount: 688,
    averageRating: 4.3,
    totalReviews: 189,
    totalRatings: 189,
    isPopular: true
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know.",
    coverImage: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg",
    publishedYear: 2020,
    pageCount: 256,
    averageRating: 4.4,
    totalReviews: 167,
    totalRatings: 167,
    isTrending: true
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    description: "A lone astronaut must save the earth and humanity in this brilliant and funny novel from the author of The Martian.",
    coverImage: "https://images.pexels.com/photos/3771610/pexels-photo-3771610.jpeg",
    publishedYear: 2021,
    pageCount: 496,
    averageRating: 4.8,
    totalReviews: 134,
    totalRatings: 134,
    isTrending: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();