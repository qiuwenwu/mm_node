const four_run = require('./index');

var t = '4*a+1/2*3-3+b*a/2+b-b';
var t = '4*a^3 + 3 - 2 + 1';
var t = '4/a^-3 + 3 - 2 + 1 - 0.5a - a_2^2 * a_2^4';
var t = '3 - 2 + 1 - 1 * 4^2 + 0.2';
console.log(four_run(t));