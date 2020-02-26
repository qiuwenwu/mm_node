define(["Vue", "./highlight.pack.js"], function(Vue, hljs) {
	"use strict";

	function createCode(el, binding) {
		var targets = el.querySelectorAll("code");
		var target;
		var i;
		for (i = 0; i < targets.length; i++) {
			target = targets[i];
			// if (typeof binding.value === "string") {
			if (binding.value) {
				target.textContent = binding.value;
			}
			var arr = target.innerHTML.trim().split('\n');
			var text = "";
			for (var n = 0; n < arr.length; n++) {
				text += '<li data-line-number="' + (n + 1) + '"><div>' + arr[n] + '\n</div></li>';
			}
			target.innerHTML = "<ul>" + text + "</ul>";
			hljs.highlightBlock(target);
		}
	}

	Vue.directive("highlightjs", {
		deep: true,
		bind: createCode,
		componentUpdated: createCode
	});
});
