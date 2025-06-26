import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, BookOpen, MessageCircle, Heart, Share2 } from 'lucide-react';
import { booksAPI, reviewsAPI } from '../services/api';
import ReviewForm from '../components/Reviews/ReviewForm';
import ReviewList from '../components/Reviews/ReviewList';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  publishedYear: number;
  pageCount: number;
  averageRating: number;
  totalReviews: number;
  recentReviews: any[];
}

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      fetchBookDetails();
      fetchReviews();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await booksAPI.getBookById(id!);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
      toast.error('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await reviewsAPI.getBookReviews(id!, { 
        sortBy: 'createdAt',
        limit: 10 
      });
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchBookDetails();
    fetchReviews();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: `Check out "${book?.title}" by ${book?.author} on BookNest`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <p className="text-gray-600">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-96 lg:h-full object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Book Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-full mb-3">
                      {book.genre}
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                      {book.title}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">by {book.author}</p>
                  </div>
                  
                  <button
                    onClick={handleShare}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Rating and Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(book.averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {book.averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">({book.totalReviews} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-5 h-5" />
                    <span>{book.publishedYear}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-500">
                    <BookOpen className="w-5 h-5" />
                    <span>{book.pageCount} pages</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  {isAuthenticated ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReviewForm(true)}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Write Review</span>
                    </motion.button>
                  ) : (
                    <p className="text-gray-500 italic">Sign in to write a review</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-gray-300 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Add to Wishlist</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Reviews ({book.totalReviews})
            </h2>
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <ReviewForm
              bookId={book._id}
              onClose={() => setShowReviewForm(false)}
              onReviewSubmitted={handleReviewSubmitted}
            />
          )}

          {/* Reviews List */}
          <ReviewList
            reviews={reviews}
            loading={reviewsLoading}
            onReviewUpdate={fetchReviews}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetailPage;