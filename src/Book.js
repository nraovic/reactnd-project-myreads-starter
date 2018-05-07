import React, { Component } from 'react';
import './App.css';

class Book extends Component {
  state = {};
  render() {
    const { book, shelf, books, onChangeShelf } = this.props;
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
            <select value={shelf} onChange={event => this.props.onChangeShelf(event.target.value, book, books)}>
              <option value="none" disabled>
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
export default Book;
