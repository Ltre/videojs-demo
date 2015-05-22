/// <reference path="../../_intellisense/_main.js" />

define(function(require) {
	var $ = require("jquery");
	var ua = require("./ua");

	// code from http://yuntv.letv.com/player_v2.4.js?V1
	function -decode(c) {
		var d, a, b, e, h, k = 0, g = 0;
		e = "";
		var j = [];
		if (!c) return c;
		c += "";
		do d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), b = d << 18 | a << 12 | e << 6 | h, d = b >> 16 & 255, a = b >>
			8 & 255, b &= 255, e == 64 ? j[g++] = String.fromCharCode(d) : h == 64 ? j[g++] = String.fromCharCode(d, a) : j[g++] = String.fromCharCode(d, a, b); while (k < c.length);
		return e = j.join("")
	}

	return {
		cf: ua.ios ? "ios" : "html5", // "ios" | "html5"

		getSource: function(data, callback) {
			if (!data) return;
			var url = "http://api.letvcloud.com/gpc.php?cf=" + this.cf + "&sign=signxxxxx&ver=2.0&format=jsonp";
console.log(url);//test
			$.ajax({
				url: url,
				dataType: "jsonp",
				data: data
			}).done(function(d) {
				if (d.code) return;
				var sourceData = d.data.video_list;
				var source = decode(sourceData[sourceData.default_play].main_url);
				if (source && callback) {
					callback(source, data);
				}
			});
		}
	};
});