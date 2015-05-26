/**
 * Created by Administrator on 15.5.25.
 */
define("p/livetip/1.1.0/main", [], function (n) {
    location.hostname && -1 === location.hostname.indexOf("duowan.com") || (seajs.config({moduleVersion: [["p/livetip", "20150331"]]}), n.async(["jquery", "./m/tip"], function (n, i) {
        n(function () {
            n.ajax({
                url: "http://tips.duowan.com/", dataType: "jsonp", success: function (n) {
                    i.init({tip: n})
                }
            })
        })
    }))
});
