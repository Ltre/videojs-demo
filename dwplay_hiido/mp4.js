define(function(require) {
    var $ = require("jquery");
    var ua = require("./ua");

    return {
        cf: ua.ios ? "ios" : "html5", // "ios" | "html5"

        __buildReport: function(api, evt, vid, extra, fn){
            var url = 'http://vstat.webdev.duowan.com/index.php?r=' + api;
            var data = {
                vid: vid,
                moment: evt.currentTarget.currentTime
            };
            $.each(extra, function(i,e){ data[i] = e; });
            $.get(url, data, fn, 'jsonp');
        },

        

        getSource: function(data, callback) {
            if (! data) return;
            var url = "http://playapi.v.duowan.com/index.php?r=play/video";//http://upapi.v.duowan.com/index.php?r=app/video&vid=
            $.ajax({
                url: url,
                dataType: "jsonp",
                data: data
            }).done(function(d){
                if (1 != d.code) return;
                var last = d.result.items.shift();
                var cover = d.result.cover;
                if (last && callback) {
                    var src = last.transcode.urls.shift();
                    callback(src, cover, data);
                }
            });
        },

        onPlay: function(evt, vid){
            alert('play');
            console.log(evt.currentTarget.readyState);
            this.__buildReport('video/onPlay', evt, vid, {}, function(j){console.log(j);});
        },

        onPause: function(evt, vid){
            alert('pause');
            this.__buildReport('video/onPause', evt, vid, {}, function(j){console.log(j);});
        },

        onLoadstart: function(evt, vid){
            window.vid=evt.currentTarget;
            alert('loadstart');
            this.__buildReport('video/onLoadstart', evt, vid, {}, function(j){console.log(j);});
        },

        onSuspend: function(evt, vid){
            console.log('suspend');
            //this.__buildReport('video/onSuspend', evt, vid, {}, function(j){console.log(j);});
        },

        onProgress: function(evt, vid){
            console.log('progress');
            console.log(evt.currentTarget.readyState);
            //this.__buildReport('video/onProgress', evt, vid, {}, function(j){console.log(j);});
        },

        onTimeupdate: function(evt, vid){
            console.log('timeupdate');
            //this.__buildReport('video/onTimeupdate', evt, vid, {}, function(j){console.log(j);});
        },

        onError: function(evt, vid){
            alert('error');
            this.__buildReport('video/onError', evt, vid, {}, function(j){console.log(j);});
        }

    };
});