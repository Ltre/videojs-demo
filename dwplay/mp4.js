define(function(require) {
	var $ = require("jquery");
	var ua = require("./ua");

	return {
		cf: ua.ios ? "ios" : "html5", // "ios" | "html5"
		evtBaseUrl: 'http://vstat.webdev.duowan.com/index.php?r=',

		getSource: function(data, callback) {
			if (! data) return;
			var url = "http://playapi.v.duowan.com/index.php?r=play/video";//http://upapi.v.duowan.com/index.php?r=app/video&vid=
			$.ajax({
				url: url,
				dataType: "jsonp",
				data: data
			}).done(function(d){
				if (1 != d.code) return;
				var last = d.result.items.pop();
				var cover = d.result.cover;
				if (last && callback) {
					var src = last.transcode.urls.pop();
					callback(src, cover, data);
				}
			});
		},

		onPlay: function(evt, vid){
			alert('play');
			console.log(evt.currentTarget.readyState);
			var url = this.evtBaseUrl + 'video/onPlay';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onPause: function(evt, vid){
			alert('pause');
			var url = this.evtBaseUrl + 'video/onPause';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onLoadstart: function(evt, vid){
			alert('loadstart');
			var url = this.evtBaseUrl + 'video/onLoadstart';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onSuspend: function(evt, vid){
			console.log('suspend');
			var url = this.evtBaseUrl + 'video/onSuspend';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onProgress: function(evt, vid){
			console.log('progress');
			console.log(evt.currentTarget.readyState);
			var url = this.evtBaseUrl + 'video/onProgress';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onTimeupdate: function(evt, vid){
			console.log('timeupdate');
			var url = this.evtBaseUrl + 'video/onTimeupdate';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		},

		onError: function(evt, vid){
			alert('error');
			var url = this.evtBaseUrl + 'video/onError';
			$.get(url, {vid:vid}, function(j){console.log(j)}, 'jsonp');
		}

	};
});