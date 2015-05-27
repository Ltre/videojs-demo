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
                var utilData = {
                    jq: jqFlash,
                    vid: vals.vid,
                    from: vals.from,
                    uu: vals.uu,
                    vu: vals.vu,
                    channelId: vals.channelId
                };
                //需确认此处是否为同步获取
                MP4.getInfo(vals.vid, function(info){
                    utilData.title = info.title;
                    utilData.channel_id = info.channel_id;//若接口有channel_id，则以此为准，否则以页面为准
                });
                result.push(utilData);
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

    //Main Function
    exports.run = function(){
        if (UA.ios || UA.android) {
            $.each(getFlash(), function(i, o) {
                MP4.getSource({
                    vid: o.vid
                }, function(src, cover) {
                    var jqFlash = o.jq, width = jqFlash.attr("width") || jqFlash.width() || "610", height = jqFlash.attr("height") || jqFlash.height() || "498";
                    var id = (new Date().getUTCMilliseconds() + '_' + o.vid);
                    jqFlash.replaceWith('<video id="' + id + '" width="' + width + '" height="' + height + '" preload="meta" poster="' + cover + '" controls><source src="' + src + '" type="video/mp4">您的浏览器不支持 video 标签</video>');
                    $('#'+id)
                        .on('play', function(evt){MP4.onPlay(evt, o);})
                        .on('pause', function(evt){MP4.onPause(evt, o);})
                        .on('loadstart', function(evt){MP4.onLoadstart(evt, o);})
                        .on('suspend', function(evt){MP4.onSuspend(evt, o);})
                        .on('progress', function(evt){MP4.onProgress(evt, o);})
                        .on('timeupdate', function(evt){MP4.onTimeupdate(evt, o);})
                        .on('error', function(evt){MP4.onError(evt, o);});
                });

            });
        }
    };

});