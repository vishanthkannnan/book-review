import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { booksAPI } from '../../services/api';

interface BookFiltersProps {
  selectedGenre: string;
  minRating: number;
  onFilterChange: (filters: any) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({
  selectedGenre,
  minRating,
  onFilterChange,
}) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState({
    genre: selectedGenre,
    minRating: minRating,
    sortBy: 'createdAt',
  });

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setLocalFilters({
      genre: selectedGenre,
      minRating: minRating,
      sortBy: 'createdAt',
    });
  }, [selectedGenre, minRating]);

  const fetchGenres = async () => {
    try {
      const response = await booksAPI.getGenres();
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      genre: 'all',
      minRating: 0,
      sortBy: 'createdAt',
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            value={localFilters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="space-y-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="minRating"
                  value={rating}
                  checked={localFilters.minRating === rating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <div className="flex items-center space-x-1">
                  {rating === 0 ? (
                    <span className="text-gray-600">Any Rating</span>
                  ) : (
                    <>
                      <span className="text-gray-900">{rating}+</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="createdAt">Newest First</option>
            <option value="averageRating">Highest Rated</option>
            <option value="totalReviews">Most Reviewed</option>
            <option value="title">Title A-Z</option>
            <option value="publishedYear">Publication Year</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </motion.div>
  );
};

export default BookFilters;