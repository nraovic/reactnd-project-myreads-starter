import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListShelves from './ListShelves';
import ShowSearchResults from './ShowSearchResults';

class App extends Component {
  state = {
    books: [],
    showSearchPage: false
  };

  //Update books state based on the option value of the option that's been clicked on
  changeShelf = (shelf, newBook, books) => {
    newBook.shelf = shelf.trim();

    var updatedBooks = this.state.books;

    // Remove a book with the same id if alredy in books
    updatedBooks = updatedBooks.filter(book => book.id !== newBook.id);

    //Add a new book to the list unless its shelf is 'none'
    newBook.shelf !== 'none' && updatedBooks.push(newBook);

    BooksAPI.update(newBook, shelf).then(() => {
      this.setState({ books: updatedBooks });
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  render() {
    return (
      <div>
        <Route
          exact
          path="/search"
          render={() => <ShowSearchResults books={this.state.books} onChangeShelf={this.changeShelf} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListShelves books={this.state.books} onChangeShelf={this.changeShelf} onOpenSearch={this.openSearch} />
          )}
        />
      </div>
    );
  }
}

export default App;
