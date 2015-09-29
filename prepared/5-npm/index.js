'use strict';

// Új npm package telepítése: npm install reverse-string
// Ezt követően a require(package név)-el behúzható
var reverse = require('reverse-string');
console.log(reverse('alma'));


// npm init: a packages.json legenerálása, npm inicializálása a projekthez
// npm run szkriptNév: a packages.json scripts részében definiált script futtatása
// npm start: a packages.json-ben definitált start szkript futtatása (kivételesen nem kell a "run", mint fentebb)
// npm test: a packages.json-ben definitált teszt-szkript futtatása (kivételesen nem kell a "run", mint fentebb)

// Példa packages.json-re:
//{
//  "name": "node-demo",
//  "version": "1.0.0",
//  "description": "",
//  "main": "index.js",
//  "scripts": {
//    "start": "node prepared/1-simple-code",
//    "serve": "node prepared/7-http-server"
//  },
//  "author": "",
//  "license": "ISC",
//  "dependencies": {
//    "reverse-string": "0.0.4"
//  }
//}
