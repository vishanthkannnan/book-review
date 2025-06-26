import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortDesc, Grid, List } from 'lucide-react';
import { booksAPI } from '../services/api';
import BookCard from '../components/Books/BookCard';
import BookFilters from '../components/Books/BookFilters';
import { useLocation, useNavigate } from 'react-router-dom';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  coverImage: string;
  averageRating: number;
  totalReviews: number;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search') || '';
    const genre = urlParams.get('genre') || 'all';
    const rating = urlParams.get('minRating') || '0';
    
    setSearchQuery(search);
    setSelectedGenre(genre);
    setMinRating(parseFloat(rating));
  }, [location.search]);

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedGenre, sortBy, minRating, currentPage]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery || undefined,
        genre: selectedGenre !== 'all' ? selectedGenre : undefined,
        minRating: minRating > 0 ? minRating : undefined,
        sortBy,
        page: currentPage,
        limit: 12,
      };

      const response = await booksAPI.getBooks(params);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    updateURL();
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedGenre !== 'all') params.set('genre', selectedGenre);
    if (minRating > 0) params.set('minRating', minRating.toString());
    
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleFilterChange = (filters: any) => {
    setSelectedGenre(filters.genre);
    setMinRating(filters.minRating);
    setSortBy(filters.sortBy);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Books
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our vast collection of books, read reviews from fellow readers, and find your next literary adventure.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books, authors, or genres..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="averageRating">Highest Rated</option>
                  <option value="totalReviews">Most Reviewed</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <BookFilters
                  selectedGenre={selectedGenre}
                  minRating={minRating}
                  onFilterChange={handleFilterChange}
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-80 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-12"
              >
                <div className="flex space-x-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No books found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse our collection without filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('all');
                  setMinRating(0);
                  setCurrentPage(1);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;