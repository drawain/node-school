'use strict';

var calculator = (a, b) => a + b;
// ES6-os függvény deklaráció `(a) => a` megegyezik a `function(a) { return a; }`-val

// Argumentumok áthozása command line-ból
var a = parseFloat(process.argv[2]);
var b = parseFloat(process.argv[3]);

console.log(calculator(a, b));


// Környezeti változók (environment variables) beolvasása
console.log('Process env', process.env.ALMAFA);


// Az alkalmazás kényszerített megállítása
process.exit();
