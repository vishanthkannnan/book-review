import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BookNest</span>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Discover your next favorite read. Join our community of book lovers and share your thoughts on the books that move you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-purple-200 hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-purple-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-purple-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?genre=fiction" className="text-purple-200 hover:text-white transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?genre=fantasy" className="text-purple-200 hover:text-white transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link to="/books?genre=mystery" className="text-purple-200 hover:text-white transition-colors">
                  Mystery
                </Link>
              </li>
              <li>
                <Link to="/books?genre=science-fiction" className="text-purple-200 hover:text-white transition-colors">
                  Science Fiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-purple-200 text-sm mb-4">
              Get the latest book recommendations and reviews delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-purple-300/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm">
            © 2025 BookNest. Made with <Heart className="w-4 h-4 inline text-red-400" /> for book lovers.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-purple-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-purple-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;