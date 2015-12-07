'use strict';

var request = require('supertest');
var app = require('./index');

describe('Library', function() {

  var book;
  var bookWithId;

  var checkBooks = function(expectedBooks, done) {
    request(app)
      .get('/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        books: expectedBooks
      }, done);
  };

  var postBook = function(book, cb) {
    request(app)
      .post('/books')
      .send(book)
      .set('Accept', 'application/json')
      .end(cb);
  };

  beforeEach(function() {
    book = { title: 'Harry Potter', amount: 4 };
    bookWithId = { id: 1, title: 'Harry Potter', amount: 4 };
  });


  describe('GET /books', function() {

    it('should get an empty array if there is no book saved in the service', function(done) {
      checkBooks([], done);
    });

  });


  describe('POST /books', function() {

    beforeEach(function(done) {
      request(app).delete('/books').end(done);
    });


    it('should accept a new book save request', function(done) {
      request(app)
        .post('/books')
        .send(book)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, bookWithId, done);
    });

    it('should save the book to the service', function(done) {
      postBook(book, function() {
        checkBooks([bookWithId], done);
      });
    });

    it('should increment the book ids after save', function(done) {
      postBook(book, function() {
        postBook({ title: 'another', amount: 1 }, function() {
          checkBooks([bookWithId, { id: 2, title: 'another', amount: 1 }], done);
        })
      });
    });

    it('should throw a validation error with error code 400 if title is missing', function(done) {
      delete book.title;

      request(app)
        .post('/books')
        .send(book)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, { error: 'Title is missing' }, done);
    });

  });


  describe('DELETE /books', function() {

    it('should respond with empty array', function(done) {
      request(app)
        .post('/books')
        .send(book)
        .end(function() {
          request(app)
            .delete('/books')
            .expect(200, [], done);
        });
    });

    it('should delete all of the books', function(done) {
      request(app)
        .post('/books')
        .send(book)
        .end(function() {
          request(app)
            .delete('/books')
            .end(function() {
              checkBooks([], done);
            });
        });
    });

  });


  describe('PUT /books/:id', function() {

    it('should update a book', function(done) {
      request(app)
        .post('/books')
        .send(book)
        .end(function() {
          request(app)
            .put('/books/1')
            .send({ title: 'Harry', amount: 2 })
            .expect(200, { id: 1, title: 'Harry', amount: 2 }, function() {
              checkBooks([{ id: 1, title: 'Harry', amount: 2 }], done);
            });
        });
    });

  });

});
