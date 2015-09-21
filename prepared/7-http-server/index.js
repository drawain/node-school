'use strict';

var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response){

  // Sample routing
  if (/^\/api\//.test(request.url)) {
    response.end(`It was an api request!`);

  } else {
    var parsedUrl = url.parse(request.url, true);

    response.end(`
      I'm alive!
      Path: ${request.url}
      QueryString: ${JSON.stringify(parsedUrl.query)}
      `);
  }
});

server.listen(1234, function() {
  console.log("Server listening on: http://localhost:1234");
});
