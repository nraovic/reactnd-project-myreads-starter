import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {
  render() {
    const { book, shelf, books, onChangeShelf } = this.props;
    console.log(shelf);
    return (
      <div className="book">
        <div className="book-top">
          {typeof book.imageLinks !== 'undefined' && (
            <div
              className="book-cover"
              style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`, width: 128, height: 188 }}
            />
          )}
          <div className="book-shelf-changer">
            <select value={shelf || 'none'} onChange={event => onChangeShelf(event.target.value, book, books)}>
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

Books.PropTypes = {
  books: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};
export default Book;
