'use strict';

var expect = require('chai').expect;
var Store = require('./store');

describe('Store', function() {

  // TODO: saveBook, getAll, removeAll tests
  // This is for only a demo to build downside up an app

  describe('#update', function() {

    it(`should update a book by it's id`, function(done) {
      var store = new Store();

      store.saveBook({ title: 'Sample', amount: 5 }, function(err, book) {
        store.updateBook(book.id, { title: 'New Sample', amount: 6 });
        expect(store.getAll()).to.eql([{ id: 1, title: 'New Sample', amount: 6 }]);
        done();
      });
    });

  });


});
