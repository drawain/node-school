'use strict';

class Store {

  constructor() {
    this._books = [];
  }

  saveBook(book, cb) {
    if (!book.title) return cb('Title is missing');
    book.id = this._books.length + 1;
    this._books.push(book);
    return cb(null, book);
  }

  getAll() {
    return this._books;
  }

  removeAll() {
    this._books = [];
  }

  updateBook(bookId, newData) {
    var book = this._books.find(book => book.id === bookId);
    book.title = newData.title;
    book.amount = newData.amount;
  }

  static create() {
    return new Store();
  }

}

module.exports = Store;
