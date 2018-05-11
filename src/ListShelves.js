import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book.js';

// Helper function
// Return a string with uppercase and space before an uppercase

function toShelfTitle(shelfTitle) {
  shelfTitle = shelfTitle.replace(/([A-Z])/g, ' $1').trim();
  shelfTitle = shelfTitle[0].toUpperCase() + shelfTitle.substr(1);
  return shelfTitle;
}

class ListShelves extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { onChangeShelf, books } = this.props;
    // Sort books by their shelves
    const booksByShelves = books.reduce((result, book) => {
      result[book.shelf] = result[book.shelf] || [];
      result[book.shelf].push(book);
      return result;
    }, []);
    // Get only a list of shelves
    const shelves = Object.keys(booksByShelves).sort();

    // Create h1 for each shelf and populate them with the books that belong to them
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {shelves.map((shelf, index) => (
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">{toShelfTitle(shelf)}</h2>
                <ol className="books-grid">
                  {booksByShelves[shelf].map(book => (
                    <li key={book.id}>
                      <Book book={book} shelf={shelf} onChangeShelf={onChangeShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ListShelves;
