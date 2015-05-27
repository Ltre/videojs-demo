define(function(require) {
    var $ = require("jquery");
    var ua = require("./ua");

    return {
        cf: ua.ios ? "ios" : "html5", // "ios" | "html5"

        __serialize: function(json){
            var ret = '';
            var i = 0;
            $.each(json, function(k, v) {
                var glue = (0 == i ? '' : '&');
                if ("string" == typeof v || "number" == typeof v) {
                    ret += (glue + k + '=' + encodeURIComponent(v));
                }
                i ++;
            });
            return ret;
        },

        __reportHiido: function(act, evt, info, extra){
            extra = extra || {};
            var $video = $(evt.currentTarget);
            var url = 'http://stat2.web.yy.com/c.gif'
            var args = {
                act: act,
                channel: info.channelId,
                lp: window.location.href,
                vid: info.vid,
                source: info.from || 'default',
                vname: info.title,
                time: new Date().valueOf(),
                prevurl: window.location.origin,
                ui: Math.random()
            };
            $.each(extra, function(k,v){ args[k] = v; });
            url += ('?' + this.__serialize(args));
            $video.after('<img src="' + url + '" style="display:none;">');
        },

        __reportDwPlatform: function(act, evt, info, extra, fn){
            extra = extra || {};
            fn = fn || function(){};
            $video = $(evt.currentTarget);
            var url = 'http://playstats.v.duowan.com/index.php';
            var args = {
                r: act,
                vid: info.vid,
                type: 'web',
                channelId: info.channelId,
                source_url: window.location.href  /*play/do非必需参数*/
            };
            $.each(extra, function(k,v){ args[k] = v; });
            url += ('?' + this.__serialize(args));
            $video.after('<iframe src="' + url + '" style="display:none;width:1px;height:1px;"><iframe>');
        },

        getInfo: function(vid, callback){
            if (! vid) return;
            var url = 'http://playapi.v.duowan.com/index.php?r=play/baseinfo&vid=' + vid;
            $.ajax({
                url: url,
                dataType: 'jsonp'
            }).done(function(d){
                if (d && callback) {
                    callback(d);
                }
            });
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

        onPlay: function(evt, info){
            console.log('dwH5 play');
            this.__reportHiido('webduowanvideo', evt, info);
            this.__reportDwPlatform('play/do', evt, info);
        },

        onPause: function(evt, info){
            console.log('dwH5 pause');
        },

        onLoadstart: function(evt, info){
            console.log('dwH5 loadstart');
            this.__reportHiido('webduowanvideoload', evt, info);
            this.__reportDwPlatform('play/load', evt, info);
        },

        onSuspend: function(evt, info){
            console.log('dwH5 suspend');
        },

        onProgress: function(evt, info){
            console.log('dwH5 progress readyState=' + evt.currentTarget.readyState);
        },

        onTimeupdate: function(evt, info){
            console.log('dwH5 timeupdate');
        },

        onError: function(evt, info){
            console.log('dwH5 error');
        }

    };
});