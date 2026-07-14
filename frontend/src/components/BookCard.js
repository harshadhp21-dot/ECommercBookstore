import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-image">
        <img 
          src={book.image_url || '/images/book-placeholder.jpg'} 
          alt={book.title}
          onError={(e) => {
            e.target.src = '/images/book-placeholder.jpg';
          }}
        />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-genre">{book.genre}</p>
        <p className="book-price">${book.price}</p>
        <p className="book-stock">
          {book.stock_quantity > 0 ? 
            `${book.stock_quantity} in stock` : 'Out of stock'
          }
        </p>
        <div className="book-actions">
          <Link to={`/books/${book.id}`} className="btn btn-primary">
            View Details
          </Link>
          {book.stock_quantity > 0 && (
            <button className="btn btn-secondary">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;