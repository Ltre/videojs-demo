define(function(require, exports) {
    var $ = require("jquery");
    var UA = require("./ua"), MP4 = require("./mp4");

    function getByFlash() {
        var result = [];

        function add(jqFlash, val) {
            var vals = {};
            val.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
                vals[$1] = $3;
            });
            if (vals.vid) {
                if (jqFlash.parent("object").length) {
                    jqFlash = jqFlash.parent("object").eq(0);
                }
                var utilData = {
                    jq: jqFlash,
                    vid: vals.vid,
                    from: vals.from,
                    uu: vals.uu,
                    vu: vals.vu,
                    channelId: vals.channelId,
                    height: vals.height,
                    width: vals.width,
                    title: ''
                };
                //需确认此处是否为同步获取
                MP4.getInfo(vals.vid, function(info){
                    utilData.title = info.title;
                    utilData.channelId = info.channel_id;//若接口有channel_id，则以此为准，否则以页面为准
                });
                result.push(utilData);
            }
        }

        //way1：
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

        //way2：
        $('[data-type="application/x-shockwave-flash"]').each(function(i, f) {
            var jqFlash = $(f);
            add(jqFlash, jqFlash.data("flashvars"));
        });

        //way3：针对多玩专区电脑版进行特殊处理（在多玩专区下无法用上面两种方式查找，这是由于http://assets.dwstatic.com/video/vpp.js抢先把视频swf禁用了）
        var pcf = window.player_conf;
        if (pcf && 'object' == typeof pcf) {
            if (pcf.vid) {
                result.push({
                    jq: null,
                    vid: pcf.vid,
                    from: pcf.from || "",
                    uu: pcf.userUnique || "",
                    vu: pcf.letvVideoUnique || "",
                    channelId: pcf.channelId || "",
                    height: pcf.height,
                    width: pcf.width
                });
            }
        }

        return result;
    }

    function getByVideo(callback){
        $('video').each(function(i,e){
            var p = $(e).attr('poster');
            var vid = p.split('/')[p.split('/').length - 2];
            MP4.getInfo(vid, function(info){
                var o = {
                    vid: vid,
                    channelId: info.channel_id || '',
                    title: info.title || '',
                    from: ''
                };
                callback(o);
            });
        });
    }

    function playerBind(elemID, o){
        $('#' + elemID)
            .on('play', function(evt){MP4.onPlay(evt, o);})
            .on('pause', function(evt){MP4.onPause(evt, o);})
            .on('loadstart', function(evt){MP4.onLoadstart(evt, o);})
            .on('suspend', function(evt){MP4.onSuspend(evt, o);})
            .on('progress', function(evt){MP4.onProgress(evt, o);})
            .on('timeupdate', function(evt){MP4.onTimeupdate(evt, o);})
            .on('error', function(evt){MP4.onError(evt, o);});
    }

    //Main Code
    if (UA.ios || UA.android) {
        var infos = getByFlash();

        if (infos.length > 0) { /*先考虑常规嵌入FLASH的情况*/

            $.each(infos, function(i, o) {
                MP4.getSource({
                    vid: o.vid
                }, function(src, cover) {
                    var elemID = (new Date().getUTCMilliseconds() + '_' + o.vid);
                    if (o.jq) { /*对应上面的way1或way2解析方式*/
                        var jqFlash = o.jq, width = jqFlash.attr("width") || jqFlash.width() || "610", height = jqFlash.attr("height") || jqFlash.height() || "498";
                        jqFlash.replaceWith('<video id="' + elemID + '" width="' + width + '" height="' + height + '" preload="meta" poster="' + cover + '" controls><source src="' + src + '" type="video/mp4">您的浏览器不支持 video 标签</video>');
                    } else { /*对应上面way3的解析方式*/
                        var $container = $('#' + window.dwVideoContainerId);//这个全局变量是从多玩专区播放页拿到的
                        var width = o.width || "610", height = o.height || "498";
                        $container.html('<video id="' + elemID + '" width="' + width + '" height="' + height + '" preload="meta" poster="' + cover + '" controls><source src="' + src + '" type="video/mp4">您的浏览器不支持 video 标签</video>');
                    }
                    playerBind(elemID, o);
                });
            });

        } else { /*后考虑完全没有FLASH的情况*/

            getByVideo(function(o){
                var elemID = (new Date().getUTCMilliseconds() + '_' + o.vid);
                playerBind(elemID, o);
            });

        }
    }
    

});