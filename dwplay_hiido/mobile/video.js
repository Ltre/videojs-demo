define(function(require, exports) {

    //var $ = require("http://assets.dwstatic.com/mobile/src/js/main/zepto/zepto.min.js");
	var $ = require("zepto");
	
	
    var MP4 = {

        __playCount: {/*vid:count*/},

        __infoGet: {/*vid:boolean*/},

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

        __reportHiido: function(act, info, extra){
            extra = extra || {};
            var url = 'http://stat2.web.yy.com/c.gif';
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
            var _this = this;
            var url = 'http://playapi.v.duowan.com/index.php?r=play/baseinfo&vid=' + vid;
			$.get(url, function(d){
                if (d && callback) {
                    callback(d);
                    _this.__infoGet[vid] = true;//确保触发loadstart
                }			
			}, 'jsonp');
        },

        getSource: function(data, callback) {
            if (! data) return;
            var url = "http://playapi.v.duowan.com/index.php?r=play/video";//http://upapi.v.duowan.com/index.php?r=app/video&vid=
			$.get(url, data, function(d){
                if (1 != d.code) return;
                var last = d.result.items.shift();
                var cover = d.result.cover;
                if (last && callback) {
                    var src = last.transcode.urls.shift();
                    callback(src, cover, data);
                }
			}, 'jsonp');
        },

        onPlay: function(evt, info){
            if (this.__playCount[info.vid]) {
                this.__playCount[info.vid] ++;
            } else {
                this.__playCount[info.vid] = 1;
                this.__reportHiido('webduowanvideo', info);
                this.__reportDwPlatform('play/do', info);
            }
        },

        onLoadstart: function(evt, info){
            var _this = this;
            var iv = setInterval(function(){
                if (_this.__infoGet[info.vid]) {
                    clearInterval(iv);
                    _this.__reportHiido('webduowanvideoload', info);
                    _this.__reportDwPlatform('play/load', info);
                    //alert('loadstart!!! vid is ' + info.vid);
                }
            }, 100);
        }

    };
	
	
	
    function getByVideo(callback){
        $('video').each(function(i,e){
            var p = $(e).attr('poster');
            var vid = p.split('/')[p.split('/').length - 2];
            MP4.getInfo(vid, function(info){
                var info = {
                    vid: vid,
                    channelId: info.channel_id || '',
                    title: info.title || '',
                    from: ''
                };
                callback(info, e);
            });
        });
    }
	
	

    //Main Code
    getByVideo(function(info, e){
        $(e).on('play', function(evt){MP4.onPlay(evt, info);});
        MP4.onLoadstart(undefined, info);
    });

});