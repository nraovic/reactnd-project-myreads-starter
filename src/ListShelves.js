import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import Book from './Book.js';

//Helper function
//From Shelf name to Book shelf property name

function toShelfTitle(shelfName) {
  shelfName = shelfName.replace(/([A-Z])/g, ' $1').trim();
  shelfName = shelfName[0].toUpperCase() + shelfName.substr(1);
  return shelfName;
}

var result = toShelfTitle('kako Da Ga Kunem Majko');
console.log(result);

class ListShelves extends Component {
  state = {
    query: '',
    results: []
  };

  updateQuery = ev => {};

  updateShelf = (shelf, book) => {
    this.setState(state => ({
      option: shelf.trim(),
      newShelf: (this.props.allBooks[this.props.allBooks.indexOf(book)].shelf = shelf)
    }));
    BooksAPI.update(shelf, book).then(() => {
      console.log(book, shelf);
    });
  };

  render() {
    /* Get all shelves from the current list of Books and sort them alphabetically */
    const onChangeShelf = this.props.onChangeShelf;
    const currentShelves = this.props.allBooks
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
                  {this.props.allBooks.filter(book => book.shelf === shelf).map(book => (
                    <li key={book.id}>
                      <Book book={book} shelf={shelf} onChangeShelf={onChangeShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="open-search">
            <a onClick={event => this.props.onOpenSearch()}>Add a book</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ListShelves;
