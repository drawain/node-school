var fs = require('fs');

// 1. Sync file reading
var dataString = fs.readFileSync('prepared/3-builtin-libraries/data.json', 'utf8');
console.log(dataString);

var dataJSON = JSON.parse(dataString);
console.log(dataJSON.value);


// 2. Async file reading
fs.readFile('prepared/3-builtin-libraries/data.json', function(err, data) {
  console.log('ASYNC', data.toString());
});


// 3. Path parsing
var path = require('path');
console.log(path.dirname('./alma/korte/index.js'));
console.log(path.extname('./alma/korte/index.js'));
console.log(path.parse('./alma/korte/index.js'));

