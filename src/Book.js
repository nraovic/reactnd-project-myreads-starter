import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };
  render() {
    const { book, shelf, books, onChangeShelf } = this.props;
    /* Fallback for the non-existing imageLinks property */
    let bookImageUrl = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : '';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: bookImageUrl, width: 128, height: 188 }} />
          <div className="book-shelf-changer">
            {/* Select the current shelf as an option, otherwise assign it to the None option */}
            <select value={shelf || 'none'} onChange={event => onChangeShelf(event.target.value, book, books)}>
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="wantToRead">Want to Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {/* Fallback for the non-existing book title */}
        <div className="book-title">{book.title ? book.title : 'No Title Available'}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;
