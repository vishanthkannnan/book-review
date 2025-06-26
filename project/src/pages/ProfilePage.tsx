import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Star, Heart, Calendar, Edit3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { reviewsAPI } from '../services/api';

interface UserReview {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  rating: number;
  title: string;
  content: string;
  emoji: string;
  likesCount: number;
  createdAt: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reviews' | 'stats'>('reviews');

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  const fetchUserReviews = async () => {
    try {
      const response = await reviewsAPI.getUserReviews(user!._id);
      setUserReviews(response.data);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const averageRating = userReviews.length > 0 
    ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length 
    : 0;

  const totalLikes = userReviews.reduce((sum, review) => sum + review.likesCount, 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-4xl">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.username}</h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                {user.bio && (
                  <p className="text-gray-700 max-w-2xl">{user.bio}</p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex space-x-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{user.reviewsCount}</div>
                  <div className="text-sm text-gray-500">Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{totalLikes}</div>
                  <div className="text-sm text-gray-500">Likes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg mb-8"
        >
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>My Reviews</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Statistics</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'reviews' ? (
            <div className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : userReviews.length > 0 ? (
                userReviews.map((review, index) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex">
                      {/* Book Cover */}
                      <div className="w-24 h-32 flex-shrink-0">
                        <img
                          src={review.book.coverImage}
                          alt={review.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{review.book.title}</h3>
                            <p className="text-gray-600 text-sm">by {review.book.author}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{review.emoji}</span>
                            <div className="flex">
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

                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 mb-4 line-clamp-3">{review.content}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span>{review.likesCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(review.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Start exploring books and share your thoughts!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Reading Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Reading Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{user.reviewsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold">{averageRating.toFixed(1)} ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Likes</span>
                    <span className="font-semibold">{totalLikes} ❤️</span>
                  </div>
                </div>
              </div>

              {/* Favorite Genres */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Favorite Genres</h3>
                </div>
                <div className="space-y-2">
                  {user.favoriteGenres && user.favoriteGenres.length > 0 ? (
                    user.favoriteGenres.map((genre, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-600">{genre}</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No favorite genres set</p>
                  )}
                </div>
              </div>

              {/* Achievement */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-medium text-gray-900">Book Reviewer</p>
                      <p className="text-sm text-gray-500">Written {user.reviewsCount} reviews</p>
                    </div>
                  </div>
                  {totalLikes > 10 && (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="font-medium text-gray-900">Community Favorite</p>
                        <p className="text-sm text-gray-500">Received {totalLikes} likes</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;