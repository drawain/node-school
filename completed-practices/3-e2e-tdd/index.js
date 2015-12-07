'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var store = require('./store').create();

app.use(bodyParser.json());

app.get('/books', function(req, res) {
  res.status(200).send({ books: store.getAll() });
});

app.post('/books', function(req, res) {
  store.saveBook(req.body, function(err, book) {
    if (err) res.status(400).send({ error: err });
    else res.status(201).send(book);
  });
});

app.delete('/books', function(req, res) {
  store.removeAll();
  res.status(200).send(store.getAll());
});


app.put('/books/:id', function(req, res) {
  var book = store.updateBook(parseFloat(req.params.id), req.body);
  res.status(200).send(book);
});

app.listen(3000, function () {
  console.log('Library service is listening on port ', this.address().port);
});

module.exports = app;



