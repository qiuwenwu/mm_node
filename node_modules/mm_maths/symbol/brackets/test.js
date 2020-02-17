const brackets = require('./index');
// console.log(brackets('a^3 + (3^3 - 3)'));
// console.log(brackets('(2a + 3) + (3 * 3 - 3)'));
// console.log(brackets('(2a + 3) - (3 * 3 - 3)'));

// console.log(brackets('(2a + 3) - (a * 3 - 3)'));


console.log(brackets('2a + 6 / (a * 3)'));


console.log(brackets('2a + 6 * (a * 1/3)'));