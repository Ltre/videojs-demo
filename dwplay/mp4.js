define(function(require) {
	var $ = require("jquery");
	var ua = require("./ua");

	return {
		cf: ua.ios ? "ios" : "html5", // "ios" | "html5"

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
				if (last && callback) {
					var src = last.transcode.urls.pop();
					callback(src, data);
				}
			});
		},

		onPlay: function(evt){
			alert('play');
			console.log(evt.currentTarget.readyState);
		},

		onPause: function(){
			alert('pause')
		},

		onLoadstart: function(){
			alert('onLoadstart')
		},

		onSuspend: function(){
			console.log('suspend')
		},

		onProgress: function(evt){
			console.log('progress');
			console.log(evt.currentTarget.readyState);
		},

		onTimeupdate: function(){
			console.log('timeupdate')
		},

		onError: function(){
			alert('error')
		}

	};
});