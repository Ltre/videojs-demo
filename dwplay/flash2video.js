/// <reference path="../../_intellisense/_main.js" />

define(function(require, exports) {
	var $ = require("jquery");
	var UA = require("./ua"), MP4 = require("./mp4");

	function getFlash() {
		var result = [];

		function add(jqFlash, val) {
			var vals = {};
			val.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
				vals[$1] = $3;
			});
			if (vals.uu && vals.vu) {
				if (jqFlash.parent("object").length) {
					jqFlash = jqFlash.parent("object").eq(0);
				}
				result.push({
					jq: jqFlash,
					uu: vals.uu,
					vu: vals.vu
				});
			}
		}

		$('[type="application/x-shockwave-flash"]').each(function(i, f) {
			var jqFlash = $(f);
			if (jqFlash.attr("flashvars")) {
				add(jqFlash, jqFlash.attr("flashvars"));
			} else if (jqFlash.find('param[name="flashvars"]').length) {
				add(jqFlash, jqFlash.find('param[name="flashvars"]').attr("value"));
			} else if (jqFlash.attr("data")) {
				add(jqFlash, jqFlash.attr("data"));
			} else if (jqFlash.attr("src")) {
				add(jqFlash, jqFlash.attr("src"));
			}
		});

		$('[data-type="application/x-shockwave-flash"]').each(function(i, f) {
			var jqFlash = $(f);
			add(jqFlash, jqFlash.data("flashvars"));
		});

		return result;
	}


	exports.run = function(){
		if (UA.ios || UA.android) {
			$.each(getFlash(), function(i, o) {
				MP4.getSource({
					vu: o.vu,
					uu: o.uu
				}, function(src) {
					var jqFlash = o.jq, width = jqFlash.attr("width") || jqFlash.width() || "610", height = jqFlash.attr("height") || jqFlash.height() || "498";
					jqFlash.replaceWith('<video width="' + width + '" height="' + height + '" preload="meta" controls><source src="' + src + '" type="video/mp4">您的浏览器不支持 video 标签</video>');
				});
			});
		}
	};

});