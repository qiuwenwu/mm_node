define(["Vue", "./highlight.pack.js"], function(Vue, hljs) {
	"use strict";

	Vue.directive("highlightjs", {
		deep: true,
		bind: function bind(el, binding) {
			var targets = el.querySelectorAll("code");
			var target;
			var i;
			for (i = 0; i < targets.length; i += 1) {
				target = targets[i];
				if (typeof binding.value === "string") {
					target.textContent = binding.value;
				}
				hljs.highlightBlock(target);
			}
		},
		componentUpdated: function componentUpdated(el, binding) {
			var targets = el.querySelectorAll("code");
			var target;
			var i;
			for (i = 0; i < targets.length; i += 1) {
				target = targets[i];
				if (typeof binding.value === "string") {
					target.textContent = binding.value;
					hljs.highlightBlock(target);
				}
			}
		}
	});
});
