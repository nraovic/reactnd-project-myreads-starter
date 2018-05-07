import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book.js';

//Helper function
//From Shelf name to Book shelf property name

function toShelfTitle(shelfName) {
  shelfName = shelfName.replace(/([A-Z])/g, ' $1').trim();
  shelfName = shelfName[0].toUpperCase() + shelfName.substr(1);
  return shelfName;
}

class ListShelves extends Component {
  render() {
    /* Get all shelves from the current list of Books and sort them alphabetically */
    const onChangeShelf = this.props.onChangeShelf;
    const currentShelves = this.props.books
      .map(book => book.shelf)
      .filter((shelf, index, array) => array.indexOf(shelf) === index)
      .sort();
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {currentShelves.map((shelf, index) => (
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">{toShelfTitle(shelf)}</h2>
                <ol className="books-grid">
                  {this.props.books.filter(book => book.shelf === shelf).map(book => (
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
