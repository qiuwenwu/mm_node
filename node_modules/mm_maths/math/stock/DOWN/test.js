var DOWN = require('./index');

var A1 = [1, 2, 3, 4, 5];
var A2 = [5, 4, 3, 2, 1];
var A21 = [1, 0.98, 0.96, 0.94, 0.92];
console.log(DOWN(A1));
console.log(DOWN(A2));
console.log(DOWN(A21, 0.02));
