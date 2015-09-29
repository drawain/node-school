'use strict';

var myLibrary = require('./my-library');
var folder = require('./folder');
var myAnotherLibrary = require('./folder/my-another-library');

console.log(myLibrary, folder, myAnotherLibrary);



// Egy library/fájl "require"-el való behívása az alkalmazás futása során egyszer történik meg!
for (let i = 0; i < 5; i++) {
  let randomNumber = require('./random');
  console.log('#' + i + ' ', randomNumber);
}
