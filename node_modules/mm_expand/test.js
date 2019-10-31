require('./index.js');

var arr = [{name: "test", age: 15 },{name: "bbs", age: 33 }];
console.log(arr.getVal('age', { name: 'test' }));


console.log("../".fullname(__dirname));
console.log("./".fullname(__dirname));
console.log("/".fullname());