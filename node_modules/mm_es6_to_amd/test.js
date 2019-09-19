const es6_to_amd = require('./index.js');

// async function test(){
// 	var code = es6_to_amd("import sys from 'sys';console.log(sys)");
// 	console.log(code);
// }
async function test(){
	var src = `<template></template>
	<script>
	import sys from 'sys';
	console.log(sys);
	
	export default {}
	</script>
	`;
	var code = es6_to_amd(src);
	console.log(code);
}
test();