'use strict';

var calculator = (a, b) => a + b;

// Get arguments from command line (starts from index 2)
var a = parseFloat(process.argv[2]);
var b = parseFloat(process.argv[3]);

console.log(calculator(a, b));


// Read environment variables
console.log('Process env', process.env.ALMAFA);


// Force exit from NodeJS application
process.exit();
