'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var books = [];

app.get('/books', function(req, res) {
  res.status(200).send({ books: books });
});

app.post('/books', function(req, res) {
  var book = req.body;

  if (!book.title) {
    res.status(400).send({ error: 'Title is missing' });
  } else {
    book.id = books.length + 1;
    books.push(book);
    res.status(201).send(book);
  }

});

app.delete('/books', function(req, res) {
  books = [];
  res.status(200).send(books);
});

app.listen(3000, function () {
  console.log('Library service is listening on port ', this.address().port);
});

module.exports = app;



