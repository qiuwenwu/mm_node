const CP = require('./index');
console.log(CP([3, 4], "<", [3,5]));
console.log(CP([3, 4], ">", [3,5]));
console.log(CP([1, 5], "=", [2,5]));
console.log(CP([1, 5.21], "~=", [2,5.3]));
