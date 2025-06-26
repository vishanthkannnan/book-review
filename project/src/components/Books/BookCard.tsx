import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TrendingUp, MessageCircle } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  coverImage: string;
  averageRating: number;
  totalReviews: number;
}

interface BookCardProps {
  book: Book;
  showTrendingBadge?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showTrendingBadge = false }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <Link to={`/books/${book._id}`}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
          {/* Trending Badge */}
          {showTrendingBadge && (
            <div className="absolute top-4 left-4 z-10">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
            </div>
          )}

          {/* Book Cover */}
          <div className="relative overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Book Info */}
          <div className="p-6">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
                {book.genre}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {book.title}
            </h3>
            
            <p className="text-gray-600 mb-4 font-medium">
              by {book.author}
            </p>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">
                    {book.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{book.totalReviews}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span className="text-white font-bold">→</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;