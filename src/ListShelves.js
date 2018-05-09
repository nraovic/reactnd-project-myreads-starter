import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book.js';

//Helper function
//From Shelf name to Book shelf property name

function toShelfTitle(shelfName) {
  shelfName = shelfName.replace(/([A-Z])/g, ' $1').trim();
  shelfName = shelfName[0].toUpperCase() + shelfName.substr(1);
  return shelfName;
}

function ListShelves(props) {
  /* Get all shelves from the current list of Books and sort them alphabetically */
  const onChangeShelf = props.onChangeShelf;

  //Sort books by their shelves
  const booksByShelves = props.books.reduce((result, book) => {
    result[book.shelf] = result[book.shelf] || [];
    result[book.shelf].push(book);
    return result;
  }, []);
  //Get only a list of shelves
  const shelves = Object.keys(booksByShelves).sort();

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

ListShelves.PropTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};
export default ListShelves;
