'use strict';

var StringCalculator = function() {
};

StringCalculator.prototype = {

  sum: function(numberAsString) {
    if (!numberAsString) return 0;
    var numbers = this._getNumbersFromString(numberAsString);
    return this._sum(numbers);
  },

  _getNumbersFromString: function(numberAsString) {
    return numberAsString.split(/[\n,]/).map(parseFloat);
  },

  _sum: function(numbers) {
    return numbers.reduce(this._add, 0);
  },

  _add: function(a, b) {
    return a + b;
  }

};

module.exports = StringCalculator;
