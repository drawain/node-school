'use strict';

var http = require('http');

// A HTTP.get egy stream-el tér vissza, amely részekben adja vissza a választ, ezt össze kell konkatenálni, hogy
// megkapjuk az egészet
http.get('http://www.google.hu', function (response) {
  response.setEncoding('utf8');

  var body = '';

  response.on('data', (data) => { body += data; });
  response.on('error', console.error);
  response.on('end', () => { console.log(body); });
});
