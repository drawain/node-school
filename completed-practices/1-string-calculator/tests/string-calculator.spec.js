var StringCalculator = require('../string-calculator');
var expect = require('chai').expect;

describe('StringCalculator', function() {

  describe('#sum', function() {
    var calculator;

    beforeEach(function() {
      calculator = new StringCalculator;
    });

    it('given empty string returns zero', function() {
      var result = calculator.sum('');
      expect(result).to.eql(0);
    });

    it('given a number returns the number', function() {
      var result = calculator.sum('1');
      expect(result).to.eql(1);
    });

    it('given two numbers separated by comma returns the sum of them', function() {
      var result = calculator.sum('1,2');
      expect(result).to.eql(3);
    });

    it('given more than 2 numbers separated by comma returns the sum of them', function() {
      var result = calculator.sum('1,2,3');
      expect(result).to.eql(6);
    });

    it('should work with new line as separator', function() {
      var result = calculator.sum('1\n2,5');
      expect(result).to.eql(8);
    });

  });

});
