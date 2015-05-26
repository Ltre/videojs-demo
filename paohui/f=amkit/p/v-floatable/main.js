/**
 * Created by Administrator on 15.5.25.
 */
seajs.config({moduleVersion: [["p/v-floatable", "20140721"], ["p/statistics", "20140617"]]}), define("p/v-floatable/main", ["jquery", "lib/ua/1.0.2/ua", "./m/filter", "lib/swfobject/2.3/swfobject"], function (i) {
    function e() {
        return t(n.selector).filter(function () {
            return n.videoFilter(t(this))
        })
    }

    var t = i("jquery"), a = i("lib/ua/1.0.2/ua");
    if (!a.msie && !a.trident) {
        var n = i("./m/filter");
        e().add("div.embed-video").each(function () {
            var i = t(this);
            i.parent().hasClass("floatable-video") || i.wrap('<div class="floatable-video"></div>')
        }), t(function () {
            var t = e();
            t.length > 0 && i.async("./m/fv", function (i) {
                i.init(t)
            })
        })
    }
});