/**
 * Created by Administrator on 15.5.25.
 */
define("p/search/bdsug-main", ["jquery"], function (e) {
    var t = e("jquery");
    t(function () {
        var a = t('input[data-baidusug="on"]');
        0 != a.length && (seajs.config({moduleVersion: [["p/search", "20140721"]]}), e.async(["arale/autocomplete/1.3.0/autocomplete", "./style/select.css"], function (e) {
            var n = "14439980297804472906", r = {};
            new e({
                trigger: a, classPrefix: "aui-select", zIndex: 99999, dataSource: function (e, a) {
                    if (!e)return a([]), !1;
                    var u = r[e];
                    return u ? a(u) : t.ajax("http://rp.baidu.com/customer_search/api/sug?wd=" + e + "&ch=normal&rn=10&sid=" + n, {dataType: "jsonp"}).success(function (n) {
                        if (!n.error) {
                            var u = [];
                            t.each(n.data.sug, function (t, a) {
                                u.push({value: e, label: a.title})
                            }), r[e] = u, a(u)
                        }
                    }), !1
                }, width: Math.max(a.outerWidth(), 196)
            }).on("itemSelected", function () {
                var e = this.input.get("element").closest("form"), t = e.find('[name="s"]');
                0 == t.length && e.append('<input type="hidden" name="s" value="' + n + '"/>')
            }).render()
        }))
    })
});