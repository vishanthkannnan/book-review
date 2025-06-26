import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// Books API
export const booksAPI = {
  getBooks: (params?: any) =>
    api.get('/books', { params }),
  
  getTrendingBooks: () =>
    api.get('/books/trending'),
  
  getBookById: (id: string) =>
    api.get(`/books/${id}`),
  
  getGenres: () =>
    api.get('/books/meta/genres'),
};

// Reviews API
export const reviewsAPI = {
  createReview: (reviewData: any) =>
    api.post('/reviews', reviewData),
  
  getBookReviews: (bookId: string, params?: any) =>
    api.get(`/reviews/book/${bookId}`, { params }),
  
  getUserReviews: (userId: string) =>
    api.get(`/reviews/user/${userId}`),
  
  likeReview: (reviewId: string) =>
    api.post(`/reviews/${reviewId}/like`),
};

export default api;