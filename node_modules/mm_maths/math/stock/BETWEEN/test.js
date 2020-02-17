const BETWEEN = require('./index');
console.log(BETWEEN([1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 3, 3));
console.log(BETWEEN([2, 4, 6, 8, 16, 2, 4, 6, 8, 16], 4, 3));
console.log(BETWEEN([21, 37, 25, 36, 30.5, 21, 37, 25, 36, 30.5], 10, 3));