import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book.js';

class ShowSearchResults extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };
  state = {
    query: '',
    results: [],
    searchError: false
  };

  // Get a list of books for every new query or the error message for an empty search result
  updateQuery = event => {
    const query = event.target.value;
    this.setState({
      query: query,
      results: []
    });
    if (query.length > 0) {
      BooksAPI.search(query).then(results => {
        this.setState({ results: results, searchError: results.hasOwnProperty('error') });
      });
    }
  };
  render() {
    const { onChangeShelf, books } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="list-books-content-search">
          <ol className="books-grid">
            {this.state.results.length > 0 &&
              this.state.results.map(result => (
                <li key={result.id}>
                  <Book books={books} book={result} shelf={result.shelf} onChangeShelf={onChangeShelf} />
                </li>
              ))}
            {this.state.searchError && (
              <div>
                <h3>Sorry, no results were found. Please try another search.</h3>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default ShowSearchResults;
