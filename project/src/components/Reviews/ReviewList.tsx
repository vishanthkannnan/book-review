import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MessageCircle, Calendar, AlertTriangle } from 'lucide-react';
import { reviewsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  content: string;
  emoji: string;
  likesCount: number;
  spoilerWarning: boolean;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
  onReviewUpdate: () => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading, onReviewUpdate }) => {
  const { user, isAuthenticated } = useAuth();

  const handleLikeReview = async (reviewId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like reviews');
      return;
    }

    try {
      await reviewsAPI.likeReview(reviewId);
      onReviewUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to like review');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-32 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts about this book!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
        >
          {/* Review Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {review.user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{review.user.username}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-2xl">{review.emoji}</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Spoiler Warning */}
          {review.spoilerWarning && (
            <div className="flex items-center space-x-2 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">This review contains spoilers</span>
            </div>
          )}

          {/* Review Content */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{review.title}</h3>
            <p className="text-gray-700 leading-relaxed">{review.content}</p>
          </div>

          {/* Review Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLikeReview(review._id)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/50 hover:bg-white/80 rounded-full transition-all duration-300"
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-700 font-medium">{review.likesCount}</span>
            </motion.button>

            <div className="text-sm text-gray-500">
              Helpful review? Give it a like!
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewList;