import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  publishedYear: number;
  pageCount?: number;
  language: string;
}

const AdminPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
    coverImage: '',
    publishedYear: '',
    pageCount: '',
    language: 'English'
  });

  const adminEmail = 'vishanthkannan777@gmail.com';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/books?email=${adminEmail}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        toast.error('Failed to fetch books');
      }
    } catch (error) {
      toast.error('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingBook 
        ? `${import.meta.env.VITE_API_URL}/admin/books/${editingBook._id}?email=${adminEmail}`
        : `${import.meta.env.VITE_API_URL}/admin/books?email=${adminEmail}`;
      
      const method = editingBook ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          publishedYear: parseInt(formData.publishedYear),
          pageCount: formData.pageCount ? parseInt(formData.pageCount) : undefined,
          email: adminEmail
        }),
      });

      if (response.ok) {
        toast.success(editingBook ? 'Book updated successfully!' : 'Book added successfully!');
        setShowForm(false);
        setEditingBook(null);
        resetForm();
        fetchBooks();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to save book');
      }
    } catch (error) {
      toast.error('Error saving book');
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/books/${bookId}?email=${adminEmail}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Book deleted successfully!');
        fetchBooks();
      } else {
        toast.error('Failed to delete book');
      }
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: '',
      genre: book.genre,
      description: book.description,
      coverImage: book.coverImage,
      publishedYear: book.publishedYear.toString(),
      pageCount: book.pageCount?.toString() || '',
      language: book.language
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      genre: '',
      description: '',
      coverImage: '',
      publishedYear: '',
      pageCount: '',
      language: 'English'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
                Admin Panel
              </h1>
              <p className="text-gray-600 mt-2">Manage books and content</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingBook(null);
                resetForm();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Book
            </button>
          </div>

          {/* Add/Edit Book Form */}
          {showForm && (
            <div className="mb-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre *</label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Published Year *</label>
                  <input
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({...formData, publishedYear: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1800"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL *</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    value={formData.pageCount}
                    onChange={(e) => setFormData({...formData, pageCount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    {editingBook ? 'Update Book' : 'Add Book'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBook(null);
                      resetForm();
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Books List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Books ({books.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      {book.genre} • {book.publishedYear}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center transition-colors"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {books.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No books added yet. Add your first book!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 