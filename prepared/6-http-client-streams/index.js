'use strict';

var http = require('http');

// HTTP get returns a stream which has to be concatenated to get the full response
http.get('http://www.google.hu', function (response) {
  response.setEncoding('utf8');

  var body = '';

  response.on('data', (data) => { body += data; });
  response.on('error', console.error);
  response.on('end', () => { console.log(body); });
});
