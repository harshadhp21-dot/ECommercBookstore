import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      setBooks(response.data.slice(0, 8)); // Show only 8 books on home page
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }

    try {
      const response = await bookService.searchBooks(searchTerm);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  if (loading) {
    return <div className="container text-center">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to BookStore</h1>
            <p>Discover your next favorite book from our extensive collection</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for books, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="featured-books">
        <div className="container">
          <div className="section-header">
            <h2>Featured Books</h2>
            <Link to="/books" className="btn btn-secondary">
              View All Books
            </Link>
          </div>
          
          {books.length === 0 ? (
            <div className="text-center">
              <p>No books found. Try a different search term.</p>
            </div>
          ) : (
            <div className="books-grid">
              {books.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Popular Categories</h2>
          <div className="categories-grid">
            <Link to="/books?genre=Fiction" className="category-card">
              <h3>Fiction</h3>
            </Link>
            <Link to="/books?genre=Science+Fiction" className="category-card">
              <h3>Science Fiction</h3>
            </Link>
            <Link to="/books?genre=Romance" className="category-card">
              <h3>Romance</h3>
            </Link>
            <Link to="/books?genre=Mystery" className="category-card">
              <h3>Mystery</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;