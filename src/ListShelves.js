import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
//Helper function
//From Shelf name to Book shelf property name

function toShelfTitle(shelfName) {
    shelfName = shelfName.replace(/([A-Z])/g, ' $1').trim();
    shelfName = shelfName[0].toUpperCase() + shelfName.substr(1);
    return shelfName;
}

var result = toShelfTitle('kako Da Ga Kunem Majko');
console.log(result)

class ListShelves extends Component {

    state = {
        shelf: '',
        book: {
            shelf: ''
        }
    }

    updateShelf = (shelf, book) => {
        this.setState ({shelf: shelf.trim(),
                        book: {
                            shelf: shelf
                        }
                      })
        BooksAPI.update(shelf, book).then(() => { console.log(book, shelf) })
    }
    render() {
     return (
         <div className="list-books">
             <div className="list-books-title">
                 <h1>MyReads</h1>
                 {JSON.stringify(this.state)}
            </div>
             <div className="list-books-content">
                        {this.props.allBooks
                            .map((book) => book.shelf)
                            .filter((shelf, index, array) => array.indexOf(shelf) === index)
                            .map( (shelf, index) => (
                            <div key={index} className="bookshelf">
                                    <h2 className="bookshelf-title">{toShelfTitle(shelf)}</h2>
                                    <ol className="books-grid">
                                    {this.props.allBooks.filter((book) => book.shelf === shelf)
                                        .map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`, width: 128, height: 188 }} />
                                                    <div className="book-shelf-changer">
                                                        <select value={this.state.shelf} onChange={(event) => this.updateShelf(event.target.value, book)}>
                                                            <option value="none" disabled>Move to...</option>
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
                                        </li>
                                    )
                                    )}
                                </ol>
                            </div>
                    ))
                    }
                    </div>
                </div>
                    )
    }
}
/*
         <li>
            <h1>Currently Reading</h1>
            <ol>
                 {this.props.allBooks.filter(book => book.shelf === 'currentlyReading').map((book) => (
            <li>
                <div style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`, width: 128, height: 188 }} />
            </li>
            )
            )}
            </ol>
         </li>
         <li>
            <h1>Want to read</h1>
            <ol>
                 {this.props.allBooks.filter(book => book.shelf === 'wantToRead').map((book) => (
            <li>
                <div style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`, width: 128, height: 188 }} />
            </li>
            )
            )}
            </ol>
         </li>
            
         </ol>
     )
 }
}
*/
export default ListShelves