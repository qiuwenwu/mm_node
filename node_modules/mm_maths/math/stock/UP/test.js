var UP = require('./index');

var A1 = [1, 2, 3, 4, 5];
var A11 = [1, 1.02, 1.05, 1.08, 1.11];
var A2 = [5, 4, 3, 2, 1];

console.log(UP(A1));
console.log(UP(A11, 0.02));
console.log(UP(A2));
