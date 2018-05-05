import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import Book from './Book.js';

function toShelfTitle(shelfName) {
  shelfName = shelfName.replace(/([A-Z])/g, ' $1').trim();
  shelfName = shelfName[0].toUpperCase() + shelfName.substr(1);
  return shelfName;
}

class ShowSearchResults extends Component {
  state = {
    query: '',
    results: [],
    searchErr: false
  };

  updateQuery = event => {
    const query = event.target.value.trim();
    this.setState({
      query: query
    });
    console.log(query);
    const books = this.props.books;
    if (query.length > 0) {
      BooksAPI.search(query).then(results => {
        this.setState({ results: results, searchErr: results.length === 0 });
        console.log(results);
      });
    } else {
      this.setState({ results: [], searchErr: true });
    }
  };
  render() {
    const onChangeShelf = this.props.onChangeShelf;
    const currentShelves = this.props.allBooks;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="list-books-content">
          <ol className="books-grid">
            {this.state.results.length > 0 &&
              this.state.results.map(result => (
                <li key={result.id}>
                  <Book book={result} shelf={result.shelf} onChangeShelf={onChangeShelf} />
                </li>
              ))}
            {this.state.searchErr && (
              <div>
                <div className="">
                  <h3>Search returned 0 books. Please try again!</h3>
                </div>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default ShowSearchResults;
