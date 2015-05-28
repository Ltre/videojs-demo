define(function(require) {
    var $ = require("jquery");
    var ua = require("./ua");

    return {
        cf: ua.ios ? "ios" : "html5", // "ios" | "html5"

        __getCookie: function(c_name){
        　　if (document.cookie.length>0){
        　　　　c_start = document.cookie.indexOf(c_name + "=");
        　　　　if (c_start != -1){ 
        　　　　　　c_start = c_start + c_name.length + 1;
        　　　　　　c_end = document.cookie.indexOf(";", c_start);
        　　　　　　if (c_end == -1) c_end = document.cookie.length;　　
        　　　　　　return unescape(document.cookie.substring(c_start, c_end));
        　　　　} 
        　　}
        　　return "";
        },

        __reportHiido: function(act, evt, info, extra){
            extra = extra || {};
            var url = 'http://stat2.web.yy.com/c.gif'
            var args = {
                act: act,
                channel: info.channelId || '',
                lp: window.location.href,
                vid: info.vid,
                source: info.from || 'default',
                vname: info.title,
                time: new Date().valueOf(),
                prevurl: window.location.origin,
                ui: this.__getCookie('hiido_ui') || Math.random()
            };
            $.each(extra, function(k,v){ args[k] = v; });
            url += ('?' + $.param(args, true));
            var img = new Image();
            img.src = url;
        },

        __reportDwPlatform: function(act, info, extra, fn){
            extra = extra || {};
            fn = fn || function(){};
            var url = 'http://playstats.v.duowan.com/index.php';
            var args = {
                r: act,
                vid: info.vid,
                type: 'web',
                channelId: info.channelId,
                source_url: window.location.href  /*play/do非必需参数*/
            };
            $.each(extra, function(k,v){ args[k] = v; });
            url += ('?' + $.param(args, true));
            var img = new Image();
            img.src = url;
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
            var _this = this;
            setTimeout(function(){
                _this.__reportHiido('webduowanvideoload', evt, info);
                _this.__reportDwPlatform('play/load', evt, info);
            }, 250);//确保比getInfo()晚执行
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