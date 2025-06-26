import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { reviewsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import JSConfetti from 'js-confetti';

interface ReviewFormProps {
  bookId: string;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onClose, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    emoji: '📚',
    spoilerWarning: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const emojis = ['📚', '😍', '🤯', '😢', '😂', '🔥', '💯', '🌟', '❤️', '👍'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewsAPI.createReview({
        bookId,
        ...formData,
      });

      // Confetti animation
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ['📚', '🎉', '⭐', '💫', '🌟'],
        emojiSize: 50,
        confettiNumber: 30,
      });

      toast.success('Review submitted successfully! 🎉');
      onReviewSubmitted();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Write Your Review
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRatingClick(rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          rating <= (hoveredRating || formData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="ml-4 text-lg font-medium text-gray-700">
                      {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Emoji Selector */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Mood
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <motion.button
                      key={emoji}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileT ap={{ scale: 0.9 }}
                      onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                      className={`text-2xl p-3 rounded-full border-2 transition-all ${
                        formData.emoji === emoji
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Sum up your thoughts in a few words..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Your Review *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts about this book. What did you love? What could be better? Help other readers discover their next great read!"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg resize-none"
                  maxLength={2000}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.content.length}/2000 characters
                </p>
              </div>

              {/* Spoiler Warning */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="spoilerWarning"
                  checked={formData.spoilerWarning}
                  onChange={(e) => setFormData(prev => ({ ...prev, spoilerWarning: e.target.checked }))}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="spoilerWarning" className="text-gray-700 font-medium">
                  This review contains spoilers
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Review</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewForm;