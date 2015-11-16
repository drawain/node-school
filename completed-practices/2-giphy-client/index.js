var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('superagent');

var images = [
  'http://media3.giphy.com/media/QgcQLZa6glP2w/200.gif',
  'http://media2.giphy.com/media/9kwYb954sUMx2/200.gif'
];

app.use(function(req, res, next) {
  var requestStartTime = new Date().getTime();

  next();

  var requestDuration = new Date().getTime() - requestStartTime;
  console.log(`[${new Date()}] REQUEST method="${req.method}" url="${req.url}" duration="${requestDuration}ms"`);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

app.get('/images', function (req, res) {
  res.send(images);
});

app.post('/', function (req, response) {
  request
    .get('http://api.giphy.com/v1/gifs/search')
    .query({ q: req.body.add, api_key: 'dc6zaTOxFJmzC' })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (!err && res.body && res.body.data && res.body.data.length > 0) {
        var firstData = res.body.data[0];
        var firstImage = firstData.images.fixed_height.url;
        images.unshift(firstImage);
      }

      response.redirect('/');
    });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
