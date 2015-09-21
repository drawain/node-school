'use strict';

var myLibrary = require('./my-library');
var folder = require('./folder');
var myAnotherLibrary = require('./folder/my-another-library');

console.log(myLibrary, folder, myAnotherLibrary);



// A "require" is a single event within an application runtime
for (let i = 0; i < 5; i++) {
  let randomNumber = require('./random');
  console.log('#' + i + ' ', randomNumber);
}
