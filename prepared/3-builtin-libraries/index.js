var fs = require('fs');

// 1. Szinkron fájl olvasás (blokkol, kerüljük!)
var dataString = fs.readFileSync('prepared/3-builtin-libraries/data.json', 'utf8');
console.log(dataString);

var dataJSON = JSON.parse(dataString);
console.log(dataJSON.value);


// 2. Aszinkron fájl beolvasás
fs.readFile('prepared/3-builtin-libraries/data.json', function(err, data) {
  console.log('ASYNC', data.toString());
});


// 3. Útvonal feloldás
var path = require('path');
console.log(path.dirname('./alma/korte/index.js'));
console.log(path.extname('./alma/korte/index.js'));
console.log(path.parse('./alma/korte/index.js'));


var url = require('url');
console.log(url.parse('http://index.hu:80'));
console.log(url.parse('http://index.hu:80?parameter=almafa', true).query.parameter); // => almafa
console.log(url.resolve('http://index.hu:80', 'almafa')); // => http://index.hu:80/almafa
