/**
 * Created by Administrator on 15.5.25.
 */
define("p/letv/flash2video", ["jquery", "./ua", "./mp4"], function (a) {
    function t() {
        function a(a, e) {
            var r = {};
            e.replace(/([^?=&]+)(=([^&]*))?/g, function (a, t, e, u) {
                r[t] = u
            }), r.uu && r.vu && (a.parent("object").length && (a = a.parent("object").eq(0)), t.push({
                jq: a,
                uu: r.uu,
                vu: r.vu
            }))
        }

        var t = [];
        return e('[type="application/x-shockwave-flash"]').each(function (t, r) {
            var u = e(r);
            u.attr("flashvars") ? a(u, u.attr("flashvars")) : u.find('param[name="flashvars"]').length ? a(u, u.find('param[name="flashvars"]').attr("value")) : u.attr("data") ? a(u, u.attr("data")) : u.attr("src") && a(u, u.attr("src"))
        }), e('[data-type="application/x-shockwave-flash"]').each(function (t, r) {
            var u = e(r);
            a(u, u.data("flashvars"))
        }), t
    }

    var e = a("jquery"), r = a("./ua"), u = a("./mp4");
    (r.ios || r.android) && e.each(t(), function (a, t) {
        u.getSource({vu: t.vu, uu: t.uu}, function (a) {
            var e = t.jq, r = e.attr("width") || e.width() || "610", u = e.attr("height") || e.height() || "498";
            e.replaceWith('<video width="' + r + '" height="' + u + '" preload="meta" controls><source src="' + a + '" type="video/mp4">\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301 video \u6807\u7b7e</video>')
        })
    })
});
;
define("p/letv/ua", [], function () {
    var e = window.navigator.userAgent.toLowerCase(), t = /iphone/.test(e), i = /ipad/.test(e), o = /ipod/.test(e);
    return {ios: t || i || o, iphone: t, ipad: i, ipod: o, android: /android/.test(e)}
});
;
define("p/letv/mp4", ["jquery", "./ua"], function (r) {
    function t(r) {
        var t, a, n, e, i, o = 0, f = 0;
        e = "";
        var d = [];
        if (!r)return r;
        r += "";
        do t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r.charAt(o++)), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r.charAt(o++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r.charAt(o++)), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r.charAt(o++)), n = t << 18 | a << 12 | e << 6 | i, t = 255 & n >> 16, a = 255 & n >> 8, n &= 255, d[f++] = 64 == e ? String.fromCharCode(t) : 64 == i ? String.fromCharCode(t, a) : String.fromCharCode(t, a, n); while (o < r.length);
        return e = d.join("")
    }

    var a = r("jquery"), n = r("./ua");
    return {
        cf: n.ios ? "ios" : "html5", getSource: function (r, n) {
            if (r) {
                var e = "http://api.letvcloud.com/gpc.php?cf=" + this.cf + "&sign=signxxxxx&ver=2.0&format=jsonp";
                a.ajax({url: e, dataType: "jsonp", data: r}).done(function (a) {
                    if (!a.code) {
                        var e = a.data.video_list, i = t(e[e.default_play].main_url);
                        i && n && n(i, r)
                    }
                })
            }
        }
    }
});
;
define("gallery/jquery/1.11.1/jquery", [], function (e, t, n) {
    !function (e, t) {
        "object" == typeof n && "object" == typeof n.exports ? n.exports = e.document ? t(e, !0) : function (e) {
            if (!e.document)throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function (e) {
        function t(e) {
            var t = e.length, n = rt.type(e);
            return "function" === n || rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function n(e, t, n) {
            if (rt.isFunction(t))return rt.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            });
            if (t.nodeType)return rt.grep(e, function (e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (dt.test(t))return rt.filter(t, e, n);
                t = rt.filter(t, e)
            }
            return rt.grep(e, function (e) {
                return rt.inArray(e, t) >= 0 !== n
            })
        }

        function r(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function i(e) {
            var t = bt[e] = {};
            return rt.each(e.match(yt) || [], function (e, n) {
                t[n] = !0
            }), t
        }

        function o() {
            pt.addEventListener ? (pt.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1)) : (pt.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
        }

        function a() {
            (pt.addEventListener || "load" === event.type || "complete" === pt.readyState) && (o(), rt.ready())
        }

        function s(e, t, n) {
            if (void 0 === n && 1 === e.nodeType) {
                var r = "data-" + t.replace(Nt, "-$1").toLowerCase();
                if (n = e.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ct.test(n) ? rt.parseJSON(n) : n
                    } catch (i) {
                    }
                    rt.data(e, t, n)
                } else n = void 0
            }
            return n
        }

        function l(e) {
            var t;
            for (t in e)if (("data" !== t || !rt.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
            return !0
        }

        function u(e, t, n, r) {
            if (rt.acceptData(e)) {
                var i, o, a = rt.expando, s = e.nodeType, l = s ? rt.cache : e, u = s ? e[a] : e[a] && a;
                if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t)return u || (u = s ? e[a] = V.pop() || rt.guid++ : a), l[u] || (l[u] = s ? {} : {toJSON: rt.noop}), ("object" == typeof t || "function" == typeof t) && (r ? l[u] = rt.extend(l[u], t) : l[u].data = rt.extend(l[u].data, t)), o = l[u], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[rt.camelCase(t)] = n), "string" == typeof t ? (i = o[t], null == i && (i = o[rt.camelCase(t)])) : i = o, i
            }
        }

        function c(e, t, n) {
            if (rt.acceptData(e)) {
                var r, i, o = e.nodeType, a = o ? rt.cache : e, s = o ? e[rt.expando] : rt.expando;
                if (a[s]) {
                    if (t && (r = n ? a[s] : a[s].data)) {
                        rt.isArray(t) ? t = t.concat(rt.map(t, rt.camelCase)) : t in r ? t = [t] : (t = rt.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                        for (; i--;)delete r[t[i]];
                        if (n ? !l(r) : !rt.isEmptyObject(r))return
                    }
                    (n || (delete a[s].data, l(a[s]))) && (o ? rt.cleanData([e], !0) : tt.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
                }
            }
        }

        function d() {
            return !0
        }

        function f() {
            return !1
        }

        function p() {
            try {
                return pt.activeElement
            } catch (e) {
            }
        }

        function h(e) {
            var t = Mt.split("|"), n = e.createDocumentFragment();
            if (n.createElement)for (; t.length;)n.createElement(t.pop());
            return n
        }

        function m(e, t) {
            var n, r, i = 0, o = typeof e.getElementsByTagName !== Tt ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Tt ? e.querySelectorAll(t || "*") : void 0;
            if (!o)for (o = [], n = e.childNodes || e; null != (r = n[i]); i++)!t || rt.nodeName(r, t) ? o.push(r) : rt.merge(o, m(r, t));
            return void 0 === t || t && rt.nodeName(e, t) ? rt.merge([e], o) : o
        }

        function g(e) {
            Dt.test(e.type) && (e.defaultChecked = e.checked)
        }

        function v(e, t) {
            return rt.nodeName(e, "table") && rt.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function y(e) {
            return e.type = (null !== rt.find.attr(e, "type")) + "/" + e.type, e
        }

        function b(e) {
            var t = Ut.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function x(e, t) {
            for (var n, r = 0; null != (n = e[r]); r++)rt._data(n, "globalEval", !t || rt._data(t[r], "globalEval"))
        }

        function w(e, t) {
            if (1 === t.nodeType && rt.hasData(e)) {
                var n, r, i, o = rt._data(e), a = rt._data(t, o), s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s)for (r = 0, i = s[n].length; i > r; r++)rt.event.add(t, n, s[n][r])
                }
                a.data && (a.data = rt.extend({}, a.data))
            }
        }

        function T(e, t) {
            var n, r, i;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !tt.noCloneEvent && t[rt.expando]) {
                    i = rt._data(t);
                    for (r in i.events)rt.removeEvent(t, r, i.handle);
                    t.removeAttribute(rt.expando)
                }
                "script" === n && t.text !== e.text ? (y(t).text = e.text, b(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), tt.html5Clone && e.innerHTML && !rt.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Dt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        function C(t, n) {
            var r, i = rt(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : rt.css(i[0], "display");
            return i.detach(), o
        }

        function N(e) {
            var t = pt, n = Kt[e];
            return n || (n = C(e, t), "none" !== n && n || (Qt = (Qt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Qt[0].contentWindow || Qt[0].contentDocument).document, t.write(), t.close(), n = C(e, t), Qt.detach()), Kt[e] = n), n
        }

        function E(e, t) {
            return {
                get: function () {
                    var n = e();
                    if (null != n)return n ? (delete this.get, void 0) : (this.get = t).apply(this, arguments)
                }
            }
        }

        function k(e, t) {
            if (t in e)return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = fn.length; i--;)if (t = fn[i] + n, t in e)return t;
            return r
        }

        function S(e, t) {
            for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = rt._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && St(r) && (o[a] = rt._data(r, "olddisplay", N(r.nodeName)))) : (i = St(r), (n && "none" !== n || !i) && rt._data(r, "olddisplay", i ? n : rt.css(r, "display"))));
            for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function A(e, t, n) {
            var r = ln.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function D(e, t, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += rt.css(e, n + kt[o], !0, i)), r ? ("content" === n && (a -= rt.css(e, "padding" + kt[o], !0, i)), "margin" !== n && (a -= rt.css(e, "border" + kt[o] + "Width", !0, i))) : (a += rt.css(e, "padding" + kt[o], !0, i), "padding" !== n && (a += rt.css(e, "border" + kt[o] + "Width", !0, i)));
            return a
        }

        function j(e, t, n) {
            var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Zt(e), a = tt.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, o);
            if (0 >= i || null == i) {
                if (i = en(e, t, o), (0 > i || null == i) && (i = e.style[t]), nn.test(i))return i;
                r = a && (tt.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + D(e, t, n || (a ? "border" : "content"), r, o) + "px"
        }

        function L(e, t, n, r, i) {
            return new L.prototype.init(e, t, n, r, i)
        }

        function H() {
            return setTimeout(function () {
                pn = void 0
            }), pn = rt.now()
        }

        function q(e, t) {
            var n, r = {height: e}, i = 0;
            for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = kt[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function _(e, t, n) {
            for (var r, i = (bn[t] || []).concat(bn["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
        }

        function M(e, t, n) {
            var r, i, o, a, s, l, u, c, d = this, f = {}, p = e.style, h = e.nodeType && St(e), m = rt._data(e, "fxshow");
            n.queue || (s = rt._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                s.unqueued || l()
            }), s.unqueued++, d.always(function () {
                d.always(function () {
                    s.unqueued--, rt.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = rt.css(e, "display"), c = "none" === u ? rt._data(e, "olddisplay") || N(e.nodeName) : u, "inline" === c && "none" === rt.css(e, "float") && (tt.inlineBlockNeedsLayout && "inline" !== N(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", tt.shrinkWrapBlocks() || d.always(function () {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (r in t)if (i = t[r], mn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                    if ("show" !== i || !m || void 0 === m[r])continue;
                    h = !0
                }
                f[r] = m && m[r] || rt.style(e, r)
            } else u = void 0;
            if (rt.isEmptyObject(f))"inline" === ("none" === u ? N(e.nodeName) : u) && (p.display = u); else {
                m ? "hidden"in m && (h = m.hidden) : m = rt._data(e, "fxshow", {}), o && (m.hidden = !h), h ? rt(e).show() : d.done(function () {
                    rt(e).hide()
                }), d.done(function () {
                    var t;
                    rt._removeData(e, "fxshow");
                    for (t in f)rt.style(e, t, f[t])
                });
                for (r in f)a = _(h ? m[r] : 0, r, d), r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function O(e, t) {
            var n, r, i, o, a;
            for (n in e)if (r = rt.camelCase(n), i = t[r], o = e[n], rt.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = rt.cssHooks[r], a && "expand"in a) {
                o = a.expand(o), delete e[r];
                for (n in o)n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
        }

        function F(e, t, n) {
            var r, i, o = 0, a = yn.length, s = rt.Deferred().always(function () {
                delete l.elem
            }), l = function () {
                if (i)return !1;
                for (var t = pn || H(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++)u.tweens[a].run(o);
                return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
            }, u = s.promise({
                elem: e,
                props: rt.extend({}, t),
                opts: rt.extend(!0, {specialEasing: {}}, n),
                originalProperties: t,
                originalOptions: n,
                startTime: pn || H(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = rt.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0, r = t ? u.tweens.length : 0;
                    if (i)return this;
                    for (i = !0; r > n; n++)u.tweens[n].run(1);
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
                }
            }), c = u.props;
            for (O(c, u.opts.specialEasing); a > o; o++)if (r = yn[o].call(u, e, c, u.opts))return r;
            return rt.map(c, _, u), rt.isFunction(u.opts.start) && u.opts.start.call(e, u), rt.fx.timer(rt.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function B(e) {
            return function (t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0, o = t.toLowerCase().match(yt) || [];
                if (rt.isFunction(n))for (; r = o[i++];)"+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function P(e, t, n, r) {
            function i(s) {
                var l;
                return o[s] = !0, rt.each(e[s] || [], function (e, s) {
                    var u = s(t, n, r);
                    return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
                }), l
            }

            var o = {}, a = e === zn;
            return i(t.dataTypes[0]) || !o["*"] && i("*")
        }

        function R(e, t) {
            var n, r, i = rt.ajaxSettings.flatOptions || {};
            for (r in t)void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
            return n && rt.extend(!0, e, n), e
        }

        function W(e, t, n) {
            for (var r, i, o, a, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
            if (i)for (a in s)if (s[a] && s[a].test(i)) {
                l.unshift(a);
                break
            }
            if (l[0]in n)o = l[0]; else {
                for (a in n) {
                    if (!l[0] || e.converters[a + " " + l[0]]) {
                        o = a;
                        break
                    }
                    r || (r = a)
                }
                o = o || r
            }
            return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
        }

        function $(e, t, n, r) {
            var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
            if (c[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())if ("*" === o)o = l; else if ("*" !== l && l !== o) {
                if (a = u[l + " " + o] || u["* " + o], !a)for (i in u)if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                    a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                    break
                }
                if (a !== !0)if (a && e["throws"])t = a(t); else try {
                    t = a(t)
                } catch (d) {
                    return {state: "parsererror", error: a ? d : "No conversion from " + l + " to " + o}
                }
            }
            return {state: "success", data: t}
        }

        function z(e, t, n, r) {
            var i;
            if (rt.isArray(t))rt.each(t, function (t, i) {
                n || Vn.test(e) ? r(e, i) : z(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
            }); else if (n || "object" !== rt.type(t))r(e, t); else for (i in t)z(e + "[" + i + "]", t[i], n, r)
        }

        function I() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {
            }
        }

        function X() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
            }
        }

        function U(e) {
            return rt.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
        }

        var V = [], J = V.slice, Y = V.concat, G = V.push, Q = V.indexOf, K = {}, Z = K.toString, et = K.hasOwnProperty, tt = {}, nt = "1.11.1", rt = function (e, t) {
            return new rt.fn.init(e, t)
        }, it = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ot = /^-ms-/, at = /-([\da-z])/gi, st = function (e, t) {
            return t.toUpperCase()
        };
        rt.fn = rt.prototype = {
            jquery: nt, constructor: rt, selector: "", length: 0, toArray: function () {
                return J.call(this)
            }, get: function (e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
            }, pushStack: function (e) {
                var t = rt.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            }, each: function (e, t) {
                return rt.each(this, e, t)
            }, map: function (e) {
                return this.pushStack(rt.map(this, function (t, n) {
                    return e.call(t, n, t)
                }))
            }, slice: function () {
                return this.pushStack(J.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (e) {
                var t = this.length, n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: G, sort: V.sort, splice: V.splice
        }, rt.extend = rt.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
            for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || rt.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)if (null != (i = arguments[s]))for (r in i)e = a[r], n = i[r], a !== n && (u && n && (rt.isPlainObject(n) || (t = rt.isArray(n))) ? (t ? (t = !1, o = e && rt.isArray(e) ? e : []) : o = e && rt.isPlainObject(e) ? e : {}, a[r] = rt.extend(u, o, n)) : void 0 !== n && (a[r] = n));
            return a
        }, rt.extend({
            expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                throw new Error(e)
            }, noop: function () {
            }, isFunction: function (e) {
                return "function" === rt.type(e)
            }, isArray: Array.isArray || function (e) {
                return "array" === rt.type(e)
            }, isWindow: function (e) {
                return null != e && e == e.window
            }, isNumeric: function (e) {
                return !rt.isArray(e) && e - parseFloat(e) >= 0
            }, isEmptyObject: function (e) {
                var t;
                for (t in e)return !1;
                return !0
            }, isPlainObject: function (e) {
                var t;
                if (!e || "object" !== rt.type(e) || e.nodeType || rt.isWindow(e))return !1;
                try {
                    if (e.constructor && !et.call(e, "constructor") && !et.call(e.constructor.prototype, "isPrototypeOf"))return !1
                } catch (n) {
                    return !1
                }
                if (tt.ownLast)for (t in e)return et.call(e, t);
                for (t in e);
                return void 0 === t || et.call(e, t)
            }, type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? K[Z.call(e)] || "object" : typeof e
            }, globalEval: function (t) {
                t && rt.trim(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                })(t)
            }, camelCase: function (e) {
                return e.replace(ot, "ms-").replace(at, st)
            }, nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }, each: function (e, n, r) {
                var i, o = 0, a = e.length, s = t(e);
                if (r) {
                    if (s)for (; a > o && (i = n.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = n.apply(e[o], r), i === !1)break
                } else if (s)for (; a > o && (i = n.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = n.call(e[o], o, e[o]), i === !1)break;
                return e
            }, trim: function (e) {
                return null == e ? "" : (e + "").replace(it, "")
            }, makeArray: function (e, n) {
                var r = n || [];
                return null != e && (t(Object(e)) ? rt.merge(r, "string" == typeof e ? [e] : e) : G.call(r, e)), r
            }, inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (Q)return Q.call(t, e, n);
                    for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
                }
                return -1
            }, merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; n > r;)e[i++] = t[r++];
                if (n !== n)for (; void 0 !== t[r];)e[i++] = t[r++];
                return e.length = i, e
            }, grep: function (e, t, n) {
                for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)r = !t(e[o], o), r !== s && i.push(e[o]);
                return i
            }, map: function (e, n, r) {
                var i, o = 0, a = e.length, s = t(e), l = [];
                if (s)for (; a > o; o++)i = n(e[o], o, r), null != i && l.push(i); else for (o in e)i = n(e[o], o, r), null != i && l.push(i);
                return Y.apply([], l)
            }, guid: 1, proxy: function (e, t) {
                var n, r, i;
                return "string" == typeof t && (i = e[t], t = e, e = i), rt.isFunction(e) ? (n = J.call(arguments, 2), r = function () {
                    return e.apply(t || this, n.concat(J.call(arguments)))
                }, r.guid = e.guid = e.guid || rt.guid++, r) : void 0
            }, now: function () {
                return +new Date
            }, support: tt
        }), rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
            K["[object " + t + "]"] = t.toLowerCase()
        });
        var lt = function (e) {
            function t(e, t, n, r) {
                var i, o, a, s, l, u, d, p, h, m;
                if ((t ? t.ownerDocument || t : R) !== H && L(t), t = t || H, n = n || [], !e || "string" != typeof e)return n;
                if (1 !== (s = t.nodeType) && 9 !== s)return [];
                if (_ && !r) {
                    if (i = yt.exec(e))if (a = i[1]) {
                        if (9 === s) {
                            if (o = t.getElementById(a), !o || !o.parentNode)return n;
                            if (o.id === a)return n.push(o), n
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a)return n.push(o), n
                    } else {
                        if (i[2])return Z.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = i[3]) && w.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(a)), n
                    }
                    if (w.qsa && (!M || !M.test(e))) {
                        if (p = d = P, h = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (u = E(e), (d = t.getAttribute("id")) ? p = d.replace(xt, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = u.length; l--;)u[l] = p + f(u[l]);
                            h = bt.test(e) && c(t.parentNode) || t, m = u.join(",")
                        }
                        if (m)try {
                            return Z.apply(n, h.querySelectorAll(m)), n
                        } catch (g) {
                        } finally {
                            d || t.removeAttribute("id")
                        }
                    }
                }
                return S(e.replace(lt, "$1"), t, n, r)
            }

            function n() {
                function e(n, r) {
                    return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
                }

                var t = [];
                return e
            }

            function r(e) {
                return e[P] = !0, e
            }

            function i(e) {
                var t = H.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), r = e.length; r--;)T.attrHandle[n[r]] = t
            }

            function a(e, t) {
                var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
                if (r)return r;
                if (n)for (; n = n.nextSibling;)if (n === t)return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function l(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function u(e) {
                return r(function (t) {
                    return t = +t, r(function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function c(e) {
                return e && typeof e.getElementsByTagName !== V && e
            }

            function d() {
            }

            function f(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
                return r
            }

            function p(e, t, n) {
                var r = t.dir, i = n && "parentNode" === r, o = $++;
                return t.first ? function (t, n, o) {
                    for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
                } : function (t, n, a) {
                    var s, l, u = [W, o];
                    if (a) {
                        for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return !0
                    } else for (; t = t[r];)if (1 === t.nodeType || i) {
                        if (l = t[P] || (t[P] = {}), (s = l[r]) && s[0] === W && s[1] === o)return u[2] = s[2];
                        if (l[r] = u, u[2] = e(t, n, a))return !0
                    }
                }
            }

            function h(e) {
                return e.length > 1 ? function (t, n, r) {
                    for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
                    return !0
                } : e[0]
            }

            function m(e, n, r) {
                for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
                return r
            }

            function g(e, t, n, r, i) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
                return a
            }

            function v(e, t, n, i, o, a) {
                return i && !i[P] && (i = v(i)), o && !o[P] && (o = v(o, a)), r(function (r, a, s, l) {
                    var u, c, d, f = [], p = [], h = a.length, v = r || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : g(v, f, e, s, l), b = n ? o || (r ? e : h || i) ? [] : a : y;
                    if (n && n(y, b, s, l), i)for (u = g(b, p), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[p[c]] = !(y[p[c]] = d));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                                o(null, b = [], u, l)
                            }
                            for (c = b.length; c--;)(d = b[c]) && (u = o ? tt.call(r, d) : f[c]) > -1 && (r[u] = !(a[u] = d))
                        }
                    } else b = g(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, l) : Z.apply(a, b)
                })
            }

            function y(e) {
                for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = p(function (e) {
                    return e === t
                }, a, !0), u = p(function (e) {
                    return tt.call(t, e) > -1
                }, a, !0), c = [function (e, n, r) {
                    return !o && (r || n !== A) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r))
                }]; i > s; s++)if (n = T.relative[e[s].type])c = [p(h(c), n)]; else {
                    if (n = T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                        for (r = ++s; i > r && !T.relative[e[r].type]; r++);
                        return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(lt, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && f(e))
                    }
                    c.push(n)
                }
                return h(c)
            }

            function b(e, n) {
                var i = n.length > 0, o = e.length > 0, a = function (r, a, s, l, u) {
                    var c, d, f, p = 0, h = "0", m = r && [], v = [], y = A, b = r || o && T.find.TAG("*", u), x = W += null == y ? 1 : Math.random() || .1, w = b.length;
                    for (u && (A = a !== H && a); h !== w && null != (c = b[h]); h++) {
                        if (o && c) {
                            for (d = 0; f = e[d++];)if (f(c, a, s)) {
                                l.push(c);
                                break
                            }
                            u && (W = x)
                        }
                        i && ((c = !f && c) && p--, r && m.push(c))
                    }
                    if (p += h, i && h !== p) {
                        for (d = 0; f = n[d++];)f(m, v, a, s);
                        if (r) {
                            if (p > 0)for (; h--;)m[h] || v[h] || (v[h] = Q.call(l));
                            v = g(v)
                        }
                        Z.apply(l, v), u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (W = x, A = y), m
                };
                return i ? r(a) : a
            }

            var x, w, T, C, N, E, k, S, A, D, j, L, H, q, _, M, O, F, B, P = "sizzle" + -new Date, R = e.document, W = 0, $ = 0, z = n(), I = n(), X = n(), U = function (e, t) {
                return e === t && (j = !0), 0
            }, V = "undefined", J = 1 << 31, Y = {}.hasOwnProperty, G = [], Q = G.pop, K = G.push, Z = G.push, et = G.slice, tt = G.indexOf || function (e) {
                    for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                    return -1
                }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = it.replace("w", "w#"), at = "\\[" + rt + "*(" + it + ")(?:" + rt + "*([*^$|!~]?=)" + rt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + rt + "*\\]", st = ":(" + it + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|" + ".*" + ")\\)|)", lt = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"), ut = new RegExp("^" + rt + "*," + rt + "*"), ct = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"), dt = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"), ft = new RegExp(st), pt = new RegExp("^" + ot + "$"), ht = {
                ID: new RegExp("^#(" + it + ")"),
                CLASS: new RegExp("^\\.(" + it + ")"),
                TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + at),
                PSEUDO: new RegExp("^" + st),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + nt + ")$", "i"),
                needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
            }, mt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /[+~]/, xt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"), Tt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
            };
            try {
                Z.apply(G = et.call(R.childNodes), R.childNodes), G[R.childNodes.length].nodeType
            } catch (Ct) {
                Z = {
                    apply: G.length ? function (e, t) {
                        K.apply(e, et.call(t))
                    } : function (e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];);
                        e.length = n - 1
                    }
                }
            }
            w = t.support = {}, N = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, L = t.setDocument = function (e) {
                var t, n = e ? e.ownerDocument || e : R, r = n.defaultView;
                return n !== H && 9 === n.nodeType && n.documentElement ? (H = n, q = n.documentElement, _ = !N(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
                    L()
                }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
                    L()
                })), w.attributes = i(function (e) {
                    return e.className = "i", !e.getAttribute("className")
                }), w.getElementsByTagName = i(function (e) {
                    return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
                }), w.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), w.getById = i(function (e) {
                    return q.appendChild(e).id = P, !n.getElementsByName || !n.getElementsByName(P).length
                }), w.getById ? (T.find.ID = function (e, t) {
                    if (typeof t.getElementById !== V && _) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, T.filter.ID = function (e) {
                    var t = e.replace(wt, Tt);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete T.find.ID, T.filter.ID = function (e) {
                    var t = e.replace(wt, Tt);
                    return function (e) {
                        var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
                    return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
                } : function (e, t) {
                    var n, r = [], i = 0, o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];)1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== V && _ ? t.getElementsByClassName(e) : void 0
                }, O = [], M = [], (w.qsa = vt.test(n.querySelectorAll)) && (i(function (e) {
                    e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && M.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || M.push("\\[" + rt + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || M.push(":checked")
                }), i(function (e) {
                    var t = n.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && M.push("name" + rt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:")
                })), (w.matchesSelector = vt.test(F = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && i(function (e) {
                    w.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), O.push("!=", st)
                }), M = M.length && new RegExp(M.join("|")), O = O.length && new RegExp(O.join("|")), t = vt.test(q.compareDocumentPosition), B = t || vt.test(q.contains) ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e, t) {
                    if (t)for (; t = t.parentNode;)if (t === e)return !0;
                    return !1
                }, U = t ? function (e, t) {
                    if (e === t)return j = !0, 0;
                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !w.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === R && B(R, e) ? -1 : t === n || t.ownerDocument === R && B(R, t) ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0 : 4 & r ? -1 : 1)
                } : function (e, t) {
                    if (e === t)return j = !0, 0;
                    var r, i = 0, o = e.parentNode, s = t.parentNode, l = [e], u = [t];
                    if (!o || !s)return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0;
                    if (o === s)return a(e, t);
                    for (r = e; r = r.parentNode;)l.unshift(r);
                    for (r = t; r = r.parentNode;)u.unshift(r);
                    for (; l[i] === u[i];)i++;
                    return i ? a(l[i], u[i]) : l[i] === R ? -1 : u[i] === R ? 1 : 0
                }, n) : H
            }, t.matches = function (e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function (e, n) {
                if ((e.ownerDocument || e) !== H && L(e), n = n.replace(dt, "='$1']"), !(!w.matchesSelector || !_ || O && O.test(n) || M && M.test(n)))try {
                    var r = F.call(e, n);
                    if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
                } catch (i) {
                }
                return t(n, H, null, [e]).length > 0
            }, t.contains = function (e, t) {
                return (e.ownerDocument || e) !== H && L(e), B(e, t)
            }, t.attr = function (e, t) {
                (e.ownerDocument || e) !== H && L(e);
                var n = T.attrHandle[t.toLowerCase()], r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !_) : void 0;
                return void 0 !== r ? r : w.attributes || !_ ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function (e) {
                var t, n = [], r = 0, i = 0;
                if (j = !w.detectDuplicates, D = !w.sortStable && e.slice(0), e.sort(U), j) {
                    for (; t = e[i++];)t === e[i] && (r = n.push(i));
                    for (; r--;)e.splice(n[r], 1)
                }
                return D = null, e
            }, C = t.getText = function (e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)n += C(e)
                    } else if (3 === i || 4 === i)return e.nodeValue
                } else for (; t = e[r++];)n += C(t);
                return n
            }, T = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: ht,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(wt, Tt), e[3] = (e[3] || e[4] || e[5] || "").replace(wt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    }, CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    }, PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ft.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(wt, Tt).toLowerCase();
                        return "*" === e ? function () {
                            return !0
                        } : function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    }, CLASS: function (e) {
                        var t = z[e + " "];
                        return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && z(e, function (e) {
                                return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
                            })
                    }, ATTR: function (e, n, r) {
                        return function (i) {
                            var o = t.attr(i, e);
                            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                        }
                    }, CHILD: function (e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                        return 1 === r && 0 === i ? function (e) {
                            return !!e.parentNode
                        } : function (t, n, l) {
                            var u, c, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (d = t; d = d[m];)if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                    for (c = g[P] || (g[P] = {}), u = c[e] || [], p = u[0] === W && u[1], f = u[0] === W && u[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (f = p = 0) || h.pop();)if (1 === d.nodeType && ++f && d === t) {
                                        c[e] = [W, p, f];
                                        break
                                    }
                                } else if (y && (u = (t[P] || (t[P] = {}))[e]) && u[0] === W)f = u[1]; else for (; (d = ++p && d && d[m] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++f || (y && ((d[P] || (d[P] = {}))[e] = [W, f]), d !== t)););
                                return f -= i, f === r || 0 === f % r && f / r >= 0
                            }
                        }
                    }, PSEUDO: function (e, n) {
                        var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                            for (var r, i = o(e, n), a = i.length; a--;)r = tt.call(e, i[a]), e[r] = !(t[r] = i[a])
                        }) : function (e) {
                            return o(e, 0, i)
                        }) : o
                    }
                },
                pseudos: {
                    not: r(function (e) {
                        var t = [], n = [], i = k(e.replace(lt, "$1"));
                        return i[P] ? r(function (e, t, n, r) {
                            for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function (e, r, o) {
                            return t[0] = e, i(t, null, o, n), !n.pop()
                        }
                    }), has: r(function (e) {
                        return function (n) {
                            return t(e, n).length > 0
                        }
                    }), contains: r(function (e) {
                        return function (t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                    }), lang: r(function (e) {
                        return pt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, Tt).toLowerCase(), function (t) {
                            var n;
                            do if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                    }), target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    }, root: function (e) {
                        return e === q
                    }, focus: function (e) {
                        return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    }, enabled: function (e) {
                        return e.disabled === !1
                    }, disabled: function (e) {
                        return e.disabled === !0
                    }, checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    }, selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    }, empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                        return !0
                    }, parent: function (e) {
                        return !T.pseudos.empty(e)
                    }, header: function (e) {
                        return gt.test(e.nodeName)
                    }, input: function (e) {
                        return mt.test(e.nodeName)
                    }, button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    }, text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    }, first: u(function () {
                        return [0]
                    }), last: u(function (e, t) {
                        return [t - 1]
                    }), eq: u(function (e, t, n) {
                        return [0 > n ? n + t : n]
                    }), even: u(function (e, t) {
                        for (var n = 0; t > n; n += 2)e.push(n);
                        return e
                    }), odd: u(function (e, t) {
                        for (var n = 1; t > n; n += 2)e.push(n);
                        return e
                    }), lt: u(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                        return e
                    }), gt: u(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                        return e
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq;
            for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[x] = s(x);
            for (x in{submit: !0, reset: !0})T.pseudos[x] = l(x);
            return d.prototype = T.filters = T.pseudos, T.setFilters = new d, E = t.tokenize = function (e, n) {
                var r, i, o, a, s, l, u, c = I[e + " "];
                if (c)return n ? 0 : c.slice(0);
                for (s = e, l = [], u = T.preFilter; s;) {
                    (!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = ct.exec(s)) && (r = i.shift(), o.push({
                        value: r,
                        type: i[0].replace(lt, " ")
                    }), s = s.slice(r.length));
                    for (a in T.filter)!(i = ht[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                        value: r,
                        type: a,
                        matches: i
                    }), s = s.slice(r.length));
                    if (!r)break
                }
                return n ? s.length : s ? t.error(e) : I(e, l).slice(0)
            }, k = t.compile = function (e, t) {
                var n, r = [], i = [], o = X[e + " "];
                if (!o) {
                    for (t || (t = E(e)), n = t.length; n--;)o = y(t[n]), o[P] ? r.push(o) : i.push(o);
                    o = X(e, b(i, r)), o.selector = e
                }
                return o
            }, S = t.select = function (e, t, n, r) {
                var i, o, a, s, l, u = "function" == typeof e && e, d = !r && E(e = u.selector || e);
                if (n = n || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && _ && T.relative[o[1].type]) {
                        if (t = (T.find.ID(a.matches[0].replace(wt, Tt), t) || [])[0], !t)return n;
                        u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);)if ((l = T.find[s]) && (r = l(a.matches[0].replace(wt, Tt), bt.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(i, 1), e = r.length && f(o), !e)return Z.apply(n, r), n;
                        break
                    }
                }
                return (u || k(e, d))(r, t, !_, n, bt.test(e) && c(t.parentNode) || t), n
            }, w.sortStable = P.split("").sort(U).join("") === P, w.detectDuplicates = !!j, L(), w.sortDetached = i(function (e) {
                return 1 & e.compareDocumentPosition(H.createElement("div"))
            }), i(function (e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), w.attributes && i(function (e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function (e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), i(function (e) {
                return null == e.getAttribute("disabled")
            }) || o(nt, function (e, t, n) {
                var r;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), t
        }(e);
        rt.find = lt, rt.expr = lt.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = lt.uniqueSort, rt.text = lt.getText, rt.isXMLDoc = lt.isXML, rt.contains = lt.contains;
        var ut = rt.expr.match.needsContext, ct = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, dt = /^.[^:#\[\.,]*$/;
        rt.filter = function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? rt.find.matchesSelector(r, e) ? [r] : [] : rt.find.matches(e, rt.grep(t, function (e) {
                return 1 === e.nodeType
            }))
        }, rt.fn.extend({
            find: function (e) {
                var t, n = [], r = this, i = r.length;
                if ("string" != typeof e)return this.pushStack(rt(e).filter(function () {
                    for (t = 0; i > t; t++)if (rt.contains(r[t], this))return !0
                }));
                for (t = 0; i > t; t++)rt.find(e, r[t], n);
                return n = this.pushStack(i > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            }, filter: function (e) {
                return this.pushStack(n(this, e || [], !1))
            }, not: function (e) {
                return this.pushStack(n(this, e || [], !0))
            }, is: function (e) {
                return !!n(this, "string" == typeof e && ut.test(e) ? rt(e) : e || [], !1).length
            }
        });
        var ft, pt = e.document, ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, mt = rt.fn.init = function (e, t) {
            var n, r;
            if (!e)return this;
            if ("string" == typeof e) {
                if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ht.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ft).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof rt ? t[0] : t, rt.merge(this, rt.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : pt, !0)), ct.test(n[1]) && rt.isPlainObject(t))for (n in t)rt.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                if (r = pt.getElementById(n[2]), r && r.parentNode) {
                    if (r.id !== n[2])return ft.find(e);
                    this.length = 1, this[0] = r
                }
                return this.context = pt, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : rt.isFunction(e) ? "undefined" != typeof ft.ready ? ft.ready(e) : e(rt) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), rt.makeArray(e, this))
        };
        mt.prototype = rt.fn, ft = rt(pt);
        var gt = /^(?:parents|prev(?:Until|All))/, vt = {children: !0, contents: !0, next: !0, prev: !0};
        rt.extend({
            dir: function (e, t, n) {
                for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !rt(i).is(n));)1 === i.nodeType && r.push(i), i = i[t];
                return r
            }, sibling: function (e, t) {
                for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        }), rt.fn.extend({
            has: function (e) {
                var t, n = rt(e, this), r = n.length;
                return this.filter(function () {
                    for (t = 0; r > t; t++)if (rt.contains(this, n[t]))return !0
                })
            }, closest: function (e, t) {
                for (var n, r = 0, i = this.length, o = [], a = ut.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? rt.unique(o) : o)
            }, index: function (e) {
                return e ? "string" == typeof e ? rt.inArray(this[0], rt(e)) : rt.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (e, t) {
                return this.pushStack(rt.unique(rt.merge(this.get(), rt(e, t))))
            }, addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), rt.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            }, parents: function (e) {
                return rt.dir(e, "parentNode")
            }, parentsUntil: function (e, t, n) {
                return rt.dir(e, "parentNode", n)
            }, next: function (e) {
                return r(e, "nextSibling")
            }, prev: function (e) {
                return r(e, "previousSibling")
            }, nextAll: function (e) {
                return rt.dir(e, "nextSibling")
            }, prevAll: function (e) {
                return rt.dir(e, "previousSibling")
            }, nextUntil: function (e, t, n) {
                return rt.dir(e, "nextSibling", n)
            }, prevUntil: function (e, t, n) {
                return rt.dir(e, "previousSibling", n)
            }, siblings: function (e) {
                return rt.sibling((e.parentNode || {}).firstChild, e)
            }, children: function (e) {
                return rt.sibling(e.firstChild)
            }, contents: function (e) {
                return rt.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : rt.merge([], e.childNodes)
            }
        }, function (e, t) {
            rt.fn[e] = function (n, r) {
                var i = rt.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = rt.filter(r, i)), this.length > 1 && (vt[e] || (i = rt.unique(i)), gt.test(e) && (i = i.reverse())), this.pushStack(i)
            }
        });
        var yt = /\S+/g, bt = {};
        rt.Callbacks = function (e) {
            e = "string" == typeof e ? bt[e] || i(e) : rt.extend({}, e);
            var t, n, r, o, a, s, l = [], u = !e.once && [], c = function (i) {
                for (n = e.memory && i, r = !0, a = s || 0, s = 0, o = l.length, t = !0; l && o > a; a++)if (l[a].apply(i[0], i[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
                t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
            }, d = {
                add: function () {
                    if (l) {
                        var r = l.length;
                        !function i(t) {
                            rt.each(t, function (t, n) {
                                var r = rt.type(n);
                                "function" === r ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
                            })
                        }(arguments), t ? o = l.length : n && (s = r, c(n))
                    }
                    return this
                }, remove: function () {
                    return l && rt.each(arguments, function (e, n) {
                        for (var r; (r = rt.inArray(n, l, r)) > -1;)l.splice(r, 1), t && (o >= r && o--, a >= r && a--)
                    }), this
                }, has: function (e) {
                    return e ? rt.inArray(e, l) > -1 : !(!l || !l.length)
                }, empty: function () {
                    return l = [], o = 0, this
                }, disable: function () {
                    return l = u = n = void 0, this
                }, disabled: function () {
                    return !l
                }, lock: function () {
                    return u = void 0, n || d.disable(), this
                }, locked: function () {
                    return !u
                }, fireWith: function (e, n) {
                    return !l || r && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
                }, fire: function () {
                    return d.fireWith(this, arguments), this
                }, fired: function () {
                    return !!r
                }
            };
            return d
        }, rt.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", rt.Callbacks("once memory"), "resolved"], ["reject", "fail", rt.Callbacks("once memory"), "rejected"], ["notify", "progress", rt.Callbacks("memory")]], n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return rt.Deferred(function (n) {
                            rt.each(t, function (t, o) {
                                var a = rt.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = a && a.apply(this, arguments);
                                    e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? rt.extend(e, r) : r
                    }
                }, i = {};
                return r.pipe = r.then, rt.each(t, function (e, o) {
                    var a = o[2], s = o[3];
                    r[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                        return i[o[0] + "With"](this === i ? r : this, arguments), this
                    }, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), e && e.call(i, i), i
            }, when: function (e) {
                var t, n, r, i = 0, o = J.call(arguments), a = o.length, s = 1 !== a || e && rt.isFunction(e.promise) ? a : 0, l = 1 === s ? e : rt.Deferred(), u = function (e, n, r) {
                    return function (i) {
                        n[e] = this, r[e] = arguments.length > 1 ? J.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                    }
                };
                if (a > 1)for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++)o[i] && rt.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
                return s || l.resolveWith(r, o), l.promise()
            }
        });
        var xt;
        rt.fn.ready = function (e) {
            return rt.ready.promise().done(e), this
        }, rt.extend({
            isReady: !1, readyWait: 1, holdReady: function (e) {
                e ? rt.readyWait++ : rt.ready(!0)
            }, ready: function (e) {
                if (e === !0 ? !--rt.readyWait : !rt.isReady) {
                    if (!pt.body)return setTimeout(rt.ready);
                    rt.isReady = !0, e !== !0 && --rt.readyWait > 0 || (xt.resolveWith(pt, [rt]), rt.fn.triggerHandler && (rt(pt).triggerHandler("ready"), rt(pt).off("ready")))
                }
            }
        }), rt.ready.promise = function (t) {
            if (!xt)if (xt = rt.Deferred(), "complete" === pt.readyState)setTimeout(rt.ready); else if (pt.addEventListener)pt.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1); else {
                pt.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
                var n = !1;
                try {
                    n = null == e.frameElement && pt.documentElement
                } catch (r) {
                }
                n && n.doScroll && !function i() {
                    if (!rt.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(i, 50)
                        }
                        o(), rt.ready()
                    }
                }()
            }
            return xt.promise(t)
        };
        var wt, Tt = "undefined";
        for (wt in rt(tt))break;
        tt.ownLast = "0" !== wt, tt.inlineBlockNeedsLayout = !1, rt(function () {
            var e, t, n, r;
            n = pt.getElementsByTagName("body")[0], n && n.style && (t = pt.createElement("div"), r = pt.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Tt && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", tt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
        }), !function () {
            var e = pt.createElement("div");
            if (null == tt.deleteExpando) {
                tt.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    tt.deleteExpando = !1
                }
            }
            e = null
        }(), rt.acceptData = function (e) {
            var t = rt.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        };
        var Ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Nt = /([A-Z])/g;
        rt.extend({
            cache: {},
            noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
            hasData: function (e) {
                return e = e.nodeType ? rt.cache[e[rt.expando]] : e[rt.expando], !!e && !l(e)
            },
            data: function (e, t, n) {
                return u(e, t, n)
            },
            removeData: function (e, t) {
                return c(e, t)
            },
            _data: function (e, t, n) {
                return u(e, t, n, !0)
            },
            _removeData: function (e, t) {
                return c(e, t, !0)
            }
        }), rt.fn.extend({
            data: function (e, t) {
                var n, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = rt.data(o), 1 === o.nodeType && !rt._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;)a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = rt.camelCase(r.slice(5)), s(o, r, i[r])));
                        rt._data(o, "parsedAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function () {
                    rt.data(this, e)
                }) : arguments.length > 1 ? this.each(function () {
                    rt.data(this, e, t)
                }) : o ? s(o, e, rt.data(o, e)) : void 0
            }, removeData: function (e) {
                return this.each(function () {
                    rt.removeData(this, e)
                })
            }
        }), rt.extend({
            queue: function (e, t, n) {
                var r;
                return e ? (t = (t || "fx") + "queue", r = rt._data(e, t), n && (!r || rt.isArray(n) ? r = rt._data(e, t, rt.makeArray(n)) : r.push(n)), r || []) : void 0
            }, dequeue: function (e, t) {
                t = t || "fx";
                var n = rt.queue(e, t), r = n.length, i = n.shift(), o = rt._queueHooks(e, t), a = function () {
                    rt.dequeue(e, t)
                };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
            }, _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return rt._data(e, n) || rt._data(e, n, {
                        empty: rt.Callbacks("once memory").add(function () {
                            rt._removeData(e, t + "queue"), rt._removeData(e, n)
                        })
                    })
            }
        }), rt.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? rt.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                    var n = rt.queue(this, e, t);
                    rt._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && rt.dequeue(this, e)
                })
            }, dequeue: function (e) {
                return this.each(function () {
                    rt.dequeue(this, e)
                })
            }, clearQueue: function (e) {
                return this.queue(e || "fx", [])
            }, promise: function (e, t) {
                var n, r = 1, i = rt.Deferred(), o = this, a = this.length, s = function () {
                    --r || i.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = rt._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(t)
            }
        });
        var Et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, kt = ["Top", "Right", "Bottom", "Left"], St = function (e, t) {
            return e = t || e, "none" === rt.css(e, "display") || !rt.contains(e.ownerDocument, e)
        }, At = rt.access = function (e, t, n, r, i, o, a) {
            var s = 0, l = e.length, u = null == n;
            if ("object" === rt.type(n)) {
                i = !0;
                for (s in n)rt.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, rt.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function (e, t, n) {
                    return u.call(rt(e), n)
                })), t))for (; l > s; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
        }, Dt = /^(?:checkbox|radio)$/i;
        !function () {
            var e = pt.createElement("input"), t = pt.createElement("div"), n = pt.createDocumentFragment();
            if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", tt.leadingWhitespace = 3 === t.firstChild.nodeType, tt.tbody = !t.getElementsByTagName("tbody").length, tt.htmlSerialize = !!t.getElementsByTagName("link").length, tt.html5Clone = "<:nav></:nav>" !== pt.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), tt.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", tt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", tt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, tt.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                    tt.noCloneEvent = !1
                }), t.cloneNode(!0).click()), null == tt.deleteExpando) {
                tt.deleteExpando = !0;
                try {
                    delete t.test
                } catch (r) {
                    tt.deleteExpando = !1
                }
            }
        }(), !function () {
            var t, n, r = pt.createElement("div");
            for (t in{
                submit: !0,
                change: !0,
                focusin: !0
            })n = "on" + t, (tt[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), tt[t + "Bubbles"] = r.attributes[n].expando === !1);
            r = null
        }();
        var jt = /^(?:input|select|textarea)$/i, Lt = /^key/, Ht = /^(?:mouse|pointer|contextmenu)|click/, qt = /^(?:focusinfocus|focusoutblur)$/, _t = /^([^.]*)(?:\.(.+)|)$/;
        rt.event = {
            global: {},
            add: function (e, t, n, r, i) {
                var o, a, s, l, u, c, d, f, p, h, m, g = rt._data(e);
                if (g) {
                    for (n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = rt.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function (e) {
                        return typeof rt === Tt || e && rt.event.triggered === e.type ? void 0 : rt.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = e), t = (t || "").match(yt) || [""], s = t.length; s--;)o = _t.exec(t[s]) || [], p = m = o[1], h = (o[2] || "").split(".").sort(), p && (u = rt.event.special[p] || {}, p = (i ? u.delegateType : u.bindType) || p, u = rt.event.special[p] || {}, d = rt.extend({
                        type: p,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && rt.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, l), (f = a[p]) || (f = a[p] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, d) : f.push(d), rt.event.global[p] = !0);
                    e = null
                }
            },
            remove: function (e, t, n, r, i) {
                var o, a, s, l, u, c, d, f, p, h, m, g = rt.hasData(e) && rt._data(e);
                if (g && (c = g.events)) {
                    for (t = (t || "").match(yt) || [""], u = t.length; u--;)if (s = _t.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                        for (d = rt.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, f = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; o--;)a = f[o], !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                        l && !f.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || rt.removeEvent(e, p, g.handle), delete c[p])
                    } else for (p in c)rt.event.remove(e, p + t[u], n, r, !0);
                    rt.isEmptyObject(c) && (delete g.handle, rt._removeData(e, "events"))
                }
            },
            trigger: function (t, n, r, i) {
                var o, a, s, l, u, c, d, f = [r || pt], p = et.call(t, "type") ? t.type : t, h = et.call(t, "namespace") ? t.namespace.split(".") : [];
                if (s = c = r = r || pt, 3 !== r.nodeType && 8 !== r.nodeType && !qt.test(p + rt.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[rt.expando] ? t : new rt.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : rt.makeArray(n, [t]), u = rt.event.special[p] || {}, i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                    if (!i && !u.noBubble && !rt.isWindow(r)) {
                        for (l = u.delegateType || p, qt.test(l + p) || (s = s.parentNode); s; s = s.parentNode)f.push(s), c = s;
                        c === (r.ownerDocument || pt) && f.push(c.defaultView || c.parentWindow || e)
                    }
                    for (d = 0; (s = f[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? l : u.bindType || p, o = (rt._data(s, "events") || {})[t.type] && rt._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && rt.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                    if (t.type = p, !i && !t.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), n) === !1) && rt.acceptData(r) && a && r[p] && !rt.isWindow(r)) {
                        c = r[a], c && (r[a] = null), rt.event.triggered = p;
                        try {
                            r[p]()
                        } catch (m) {
                        }
                        rt.event.triggered = void 0, c && (r[a] = c)
                    }
                    return t.result
                }
            },
            dispatch: function (e) {
                e = rt.event.fix(e);
                var t, n, r, i, o, a = [], s = J.call(arguments), l = (rt._data(this, "events") || {})[e.type] || [], u = rt.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                    for (a = rt.event.handlers.call(this, e, l), t = 0; (i = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, o = 0; (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, n = ((rt.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result
                }
            },
            handlers: function (e, t) {
                var n, r, i, o, a = [], s = t.delegateCount, l = e.target;
                if (s && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                    for (i = [], o = 0; s > o; o++)r = t[o], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? rt(n, this).index(l) >= 0 : rt.find(n, this, null, [l]).length), i[n] && i.push(r);
                    i.length && a.push({elem: l, handlers: i})
                }
                return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
            },
            fix: function (e) {
                if (e[rt.expando])return e;
                var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = Ht.test(i) ? this.mouseHooks : Lt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new rt.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
                return e.target || (e.target = o.srcElement || pt), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n, r, i, o = t.button, a = t.fromElement;
                    return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || pt, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== p() && this.focus)try {
                            return this.focus(), !1
                        } catch (e) {
                        }
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        return this === p() && this.blur ? (this.blur(), !1) : void 0
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    }, _default: function (e) {
                        return rt.nodeName(e.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function (e, t, n, r) {
                var i = rt.extend(new rt.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
                r ? rt.event.trigger(i, null, t) : rt.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, rt.removeEvent = pt.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function (e, t, n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] === Tt && (e[r] = null), e.detachEvent(r, n))
        }, rt.Event = function (e, t) {
            return this instanceof rt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? d : f) : this.type = e, t && rt.extend(this, t), this.timeStamp = e && e.timeStamp || rt.now(), this[rt.expando] = !0, void 0) : new rt.Event(e, t)
        }, rt.Event.prototype = {
            isDefaultPrevented: f,
            isPropagationStopped: f,
            isImmediatePropagationStopped: f,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = d, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = d, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = d, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, rt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (e, t) {
            rt.event.special[e] = {
                delegateType: t, bindType: t, handle: function (e) {
                    var n, r = this, i = e.relatedTarget, o = e.handleObj;
                    return (!i || i !== r && !rt.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), tt.submitBubbles || (rt.event.special.submit = {
            setup: function () {
                return rt.nodeName(this, "form") ? !1 : (rt.event.add(this, "click._submit keypress._submit", function (e) {
                    var t = e.target, n = rt.nodeName(t, "input") || rt.nodeName(t, "button") ? t.form : void 0;
                    n && !rt._data(n, "submitBubbles") && (rt.event.add(n, "submit._submit", function (e) {
                        e._submit_bubble = !0
                    }), rt._data(n, "submitBubbles", !0))
                }), void 0)
            }, postDispatch: function (e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && rt.event.simulate("submit", this.parentNode, e, !0))
            }, teardown: function () {
                return rt.nodeName(this, "form") ? !1 : (rt.event.remove(this, "._submit"), void 0)
            }
        }), tt.changeBubbles || (rt.event.special.change = {
            setup: function () {
                return jt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rt.event.add(this, "propertychange._change", function (e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), rt.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), rt.event.simulate("change", this, e, !0)
                })), !1) : (rt.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    jt.test(t.nodeName) && !rt._data(t, "changeBubbles") && (rt.event.add(t, "change._change", function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || rt.event.simulate("change", this.parentNode, e, !0)
                    }), rt._data(t, "changeBubbles", !0))
                }), void 0)
            }, handle: function (e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            }, teardown: function () {
                return rt.event.remove(this, "._change"), !jt.test(this.nodeName)
            }
        }), tt.focusinBubbles || rt.each({focus: "focusin", blur: "focusout"}, function (e, t) {
            var n = function (e) {
                rt.event.simulate(t, e.target, rt.event.fix(e), !0)
            };
            rt.event.special[t] = {
                setup: function () {
                    var r = this.ownerDocument || this, i = rt._data(r, t);
                    i || r.addEventListener(e, n, !0), rt._data(r, t, (i || 0) + 1)
                }, teardown: function () {
                    var r = this.ownerDocument || this, i = rt._data(r, t) - 1;
                    i ? rt._data(r, t, i) : (r.removeEventListener(e, n, !0), rt._removeData(r, t))
                }
            }
        }), rt.fn.extend({
            on: function (e, t, n, r, i) {
                var o, a;
                if ("object" == typeof e) {
                    "string" != typeof t && (n = n || t, t = void 0);
                    for (o in e)this.on(o, t, n, e[o], i);
                    return this
                }
                if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = f; else if (!r)return this;
                return 1 === i && (a = r, r = function (e) {
                    return rt().off(e), a.apply(this, arguments)
                }, r.guid = a.guid || (a.guid = rt.guid++)), this.each(function () {
                    rt.event.add(this, e, r, n, t)
                })
            }, one: function (e, t, n, r) {
                return this.on(e, t, n, r, 1)
            }, off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)return r = e.handleObj, rt(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e)this.off(i, t, e[i]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = f), this.each(function () {
                    rt.event.remove(this, e, n, t)
                })
            }, trigger: function (e, t) {
                return this.each(function () {
                    rt.event.trigger(e, t, this)
                })
            }, triggerHandler: function (e, t) {
                var n = this[0];
                return n ? rt.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Mt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ot = / jQuery\d+="(?:null|\d+)"/g, Ft = new RegExp("<(?:" + Mt + ")[\\s/>]", "i"), Bt = /^\s+/, Pt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rt = /<([\w:]+)/, Wt = /<tbody/i, $t = /<|&#?\w+;/, zt = /<(?:script|style|link)/i, It = /checked\s*(?:[^=]|=\s*.checked.)/i, Xt = /^$|\/(?:java|ecma)script/i, Ut = /^true\/(.*)/, Vt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Jt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: tt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, Yt = h(pt), Gt = Yt.appendChild(pt.createElement("div"));
        Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td, rt.extend({
            clone: function (e, t, n) {
                var r, i, o, a, s, l = rt.contains(e.ownerDocument, e);
                if (tt.html5Clone || rt.isXMLDoc(e) || !Ft.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Gt.innerHTML = e.outerHTML, Gt.removeChild(o = Gt.firstChild)), !(tt.noCloneEvent && tt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e)))for (r = m(o), s = m(e), a = 0; null != (i = s[a]); ++a)r[a] && T(i, r[a]);
                if (t)if (n)for (s = s || m(e), r = r || m(o), a = 0; null != (i = s[a]); a++)w(i, r[a]); else w(e, o);
                return r = m(o, "script"), r.length > 0 && x(r, !l && m(e, "script")), r = s = i = null, o
            }, buildFragment: function (e, t, n, r) {
                for (var i, o, a, s, l, u, c, d = e.length, f = h(t), p = [], v = 0; d > v; v++)if (o = e[v], o || 0 === o)if ("object" === rt.type(o))rt.merge(p, o.nodeType ? [o] : o); else if ($t.test(o)) {
                    for (s = s || f.appendChild(t.createElement("div")), l = (Rt.exec(o) || ["", ""])[1].toLowerCase(), c = Jt[l] || Jt._default, s.innerHTML = c[1] + o.replace(Pt, "<$1></$2>") + c[2], i = c[0]; i--;)s = s.lastChild;
                    if (!tt.leadingWhitespace && Bt.test(o) && p.push(t.createTextNode(Bt.exec(o)[0])), !tt.tbody)for (o = "table" !== l || Wt.test(o) ? "<table>" !== c[1] || Wt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;)rt.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                    for (rt.merge(p, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
                    s = f.lastChild
                } else p.push(t.createTextNode(o));
                for (s && f.removeChild(s), tt.appendChecked || rt.grep(m(p, "input"), g), v = 0; o = p[v++];)if ((!r || -1 === rt.inArray(o, r)) && (a = rt.contains(o.ownerDocument, o), s = m(f.appendChild(o), "script"), a && x(s), n))for (i = 0; o = s[i++];)Xt.test(o.type || "") && n.push(o);
                return s = null, f
            }, cleanData: function (e, t) {
                for (var n, r, i, o, a = 0, s = rt.expando, l = rt.cache, u = tt.deleteExpando, c = rt.event.special; null != (n = e[a]); a++)if ((t || rt.acceptData(n)) && (i = n[s], o = i && l[i])) {
                    if (o.events)for (r in o.events)c[r] ? rt.event.remove(n, r) : rt.removeEvent(n, r, o.handle);
                    l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== Tt ? n.removeAttribute(s) : n[s] = null, V.push(i))
                }
            }
        }), rt.fn.extend({
            text: function (e) {
                return At(this, function (e) {
                    return void 0 === e ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pt).createTextNode(e))
                }, null, e, arguments.length)
            }, append: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.appendChild(e)
                    }
                })
            }, prepend: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            }, before: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            }, after: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            }, remove: function (e, t) {
                for (var n, r = e ? rt.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || rt.cleanData(m(n)), n.parentNode && (t && rt.contains(n.ownerDocument, n) && x(m(n, "script")), n.parentNode.removeChild(n));
                return this
            }, empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && rt.cleanData(m(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                    e.options && rt.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            }, clone: function (e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                    return rt.clone(this, e, t)
                })
            }, html: function (e) {
                return At(this, function (e) {
                    var t = this[0] || {}, n = 0, r = this.length;
                    if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Ot, "") : void 0;
                    if (!("string" != typeof e || zt.test(e) || !tt.htmlSerialize && Ft.test(e) || !tt.leadingWhitespace && Bt.test(e) || Jt[(Rt.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Pt, "<$1></$2>");
                        try {
                            for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (rt.cleanData(m(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (i) {
                        }
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            }, replaceWith: function () {
                var e = arguments[0];
                return this.domManip(arguments, function (t) {
                    e = this.parentNode, rt.cleanData(m(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            }, detach: function (e) {
                return this.remove(e, !0)
            }, domManip: function (e, t) {
                e = Y.apply([], e);
                var n, r, i, o, a, s, l = 0, u = this.length, c = this, d = u - 1, f = e[0], p = rt.isFunction(f);
                if (p || u > 1 && "string" == typeof f && !tt.checkClone && It.test(f))return this.each(function (n) {
                    var r = c.eq(n);
                    p && (e[0] = f.call(this, n, r.html())), r.domManip(e, t)
                });
                if (u && (s = rt.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                    for (o = rt.map(m(s, "script"), y), i = o.length; u > l; l++)r = s, l !== d && (r = rt.clone(r, !0, !0), i && rt.merge(o, m(r, "script"))), t.call(this[l], r, l);
                    if (i)for (a = o[o.length - 1].ownerDocument, rt.map(o, b), l = 0; i > l; l++)r = o[l], Xt.test(r.type || "") && !rt._data(r, "globalEval") && rt.contains(a, r) && (r.src ? rt._evalUrl && rt._evalUrl(r.src) : rt.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Vt, "")));
                    s = n = null
                }
                return this
            }
        }), rt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            rt.fn[e] = function (e) {
                for (var n, r = 0, i = [], o = rt(e), a = o.length - 1; a >= r; r++)n = r === a ? this : this.clone(!0), rt(o[r])[t](n), G.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var Qt, Kt = {};
        !function () {
            var e;
            tt.shrinkWrapBlocks = function () {
                if (null != e)return e;
                e = !1;
                var t, n, r;
                return n = pt.getElementsByTagName("body")[0], n && n.style ? (t = pt.createElement("div"), r = pt.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Tt && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(pt.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
            }
        }();
        var Zt, en, tn = /^margin/, nn = new RegExp("^(" + Et + ")(?!px)[a-z%]+$", "i"), rn = /^(top|right|bottom|left)$/;
        e.getComputedStyle ? (Zt = function (e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null)
        }, en = function (e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || Zt(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || rt.contains(e.ownerDocument, e) || (a = rt.style(e, t)), nn.test(a) && tn.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 === a ? a : a + ""
        }) : pt.documentElement.currentStyle && (Zt = function (e) {
            return e.currentStyle
        }, en = function (e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || Zt(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), nn.test(a) && !rn.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
        }), !function () {
            function t() {
                var t, n, r, i;
                n = pt.getElementsByTagName("body")[0], n && n.style && (t = pt.createElement("div"), r = pt.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, i = t.appendChild(pt.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === i[0].offsetHeight, s && (i[0].style.display = "", i[1].style.display = "none", s = 0 === i[0].offsetHeight), n.removeChild(r))
            }

            var n, r, i, o, a, s, l;
            n = pt.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = n.getElementsByTagName("a")[0], r = i && i.style, r && (r.cssText = "float:left;opacity:.5", tt.opacity = "0.5" === r.opacity, tt.cssFloat = !!r.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", tt.clearCloneStyle = "content-box" === n.style.backgroundClip, tt.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, rt.extend(tt, {
                reliableHiddenOffsets: function () {
                    return null == s && t(), s
                }, boxSizingReliable: function () {
                    return null == a && t(), a
                }, pixelPosition: function () {
                    return null == o && t(), o
                }, reliableMarginRight: function () {
                    return null == l && t(), l
                }
            }))
        }(), rt.swap = function (e, t, n, r) {
            var i, o, a = {};
            for (o in t)a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t)e.style[o] = a[o];
            return i
        };
        var on = /alpha\([^)]*\)/i, an = /opacity\s*=\s*([^)]*)/, sn = /^(none|table(?!-c[ea]).+)/, ln = new RegExp("^(" + Et + ")(.*)$", "i"), un = new RegExp("^([+-])=(" + Et + ")", "i"), cn = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, dn = {letterSpacing: "0", fontWeight: "400"}, fn = ["Webkit", "O", "Moz", "ms"];
        rt.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = en(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {"float": tt.cssFloat ? "cssFloat" : "styleFloat"},
            style: function (e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = rt.camelCase(t), l = e.style;
                    if (t = rt.cssProps[s] || (rt.cssProps[s] = k(l, s)), a = rt.cssHooks[t] || rt.cssHooks[s], void 0 === n)return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                    if (o = typeof n, "string" === o && (i = un.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(rt.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || rt.cssNumber[s] || (n += "px"), tt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set"in a && void 0 === (n = a.set(e, n, r)))))try {
                        l[t] = n
                    } catch (u) {
                    }
                }
            },
            css: function (e, t, n, r) {
                var i, o, a, s = rt.camelCase(t);
                return t = rt.cssProps[s] || (rt.cssProps[s] = k(e.style, s)), a = rt.cssHooks[t] || rt.cssHooks[s], a && "get"in a && (o = a.get(e, !0, n)), void 0 === o && (o = en(e, t, r)), "normal" === o && t in dn && (o = dn[t]), "" === n || n ? (i = parseFloat(o), n === !0 || rt.isNumeric(i) ? i || 0 : o) : o
            }
        }), rt.each(["height", "width"], function (e, t) {
            rt.cssHooks[t] = {
                get: function (e, n, r) {
                    return n ? sn.test(rt.css(e, "display")) && 0 === e.offsetWidth ? rt.swap(e, cn, function () {
                        return j(e, t, r)
                    }) : j(e, t, r) : void 0
                }, set: function (e, n, r) {
                    var i = r && Zt(e);
                    return A(e, n, r ? D(e, t, r, tt.boxSizing && "border-box" === rt.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }), tt.opacity || (rt.cssHooks.opacity = {
            get: function (e, t) {
                return an.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            }, set: function (e, t) {
                var n = e.style, r = e.currentStyle, i = rt.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === rt.trim(o.replace(on, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = on.test(o) ? o.replace(on, i) : o + " " + i)
            }
        }), rt.cssHooks.marginRight = E(tt.reliableMarginRight, function (e, t) {
            return t ? rt.swap(e, {display: "inline-block"}, en, [e, "marginRight"]) : void 0
        }), rt.each({margin: "", padding: "", border: "Width"}, function (e, t) {
            rt.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + kt[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, tn.test(e) || (rt.cssHooks[e + t].set = A)
        }), rt.fn.extend({
            css: function (e, t) {
                return At(this, function (e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (rt.isArray(t)) {
                        for (r = Zt(e), i = t.length; i > a; a++)o[t[a]] = rt.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? rt.style(e, t, n) : rt.css(e, t)
                }, e, t, arguments.length > 1)
            }, show: function () {
                return S(this, !0)
            }, hide: function () {
                return S(this)
            }, toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                    St(this) ? rt(this).show() : rt(this).hide()
                })
            }
        }), rt.Tween = L, L.prototype = {
            constructor: L, init: function (e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (rt.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var e = L.propHooks[this.prop];
                return e && e.get ? e.get(this) : L.propHooks._default.get(this)
            }, run: function (e) {
                var t, n = L.propHooks[this.prop];
                return this.pos = t = this.options.duration ? rt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : L.propHooks._default.set(this), this
            }
        }, L.prototype.init.prototype = L.prototype, L.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = rt.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                }, set: function (e) {
                    rt.fx.step[e.prop] ? rt.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[rt.cssProps[e.prop]] || rt.cssHooks[e.prop]) ? rt.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, L.propHooks.scrollTop = L.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, rt.easing = {
            linear: function (e) {
                return e
            }, swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, rt.fx = L.prototype.init, rt.fx.step = {};
        var pn, hn, mn = /^(?:toggle|show|hide)$/, gn = new RegExp("^(?:([+-])=|)(" + Et + ")([a-z%]*)$", "i"), vn = /queueHooks$/, yn = [M], bn = {
            "*": [function (e, t) {
                var n = this.createTween(e, t), r = n.cur(), i = gn.exec(t), o = i && i[3] || (rt.cssNumber[e] ? "" : "px"), a = (rt.cssNumber[e] || "px" !== o && +r) && gn.exec(rt.css(n.elem, e)), s = 1, l = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do s = s || ".5", a /= s, rt.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
        rt.Animation = rt.extend(F, {
            tweener: function (e, t) {
                rt.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, r = 0, i = e.length; i > r; r++)n = e[r], bn[n] = bn[n] || [], bn[n].unshift(t)
            }, prefilter: function (e, t) {
                t ? yn.unshift(e) : yn.push(e)
            }
        }), rt.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? rt.extend({}, e) : {
                complete: n || !n && t || rt.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !rt.isFunction(t) && t
            };
            return r.duration = rt.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in rt.fx.speeds ? rt.fx.speeds[r.duration] : rt.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                rt.isFunction(r.old) && r.old.call(this), r.queue && rt.dequeue(this, r.queue)
            }, r
        }, rt.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(St).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
            }, animate: function (e, t, n, r) {
                var i = rt.isEmptyObject(e), o = rt.speed(t, n, r), a = function () {
                    var t = F(this, rt.extend({}, e), o);
                    (i || rt._data(this, "finish")) && t.stop(!0)
                };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (e, t, n) {
                var r = function (e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                    var t = !0, i = null != e && e + "queueHooks", o = rt.timers, a = rt._data(this);
                    if (i)a[i] && a[i].stop && r(a[i]); else for (i in a)a[i] && a[i].stop && vn.test(i) && r(a[i]);
                    for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    (t || !n) && rt.dequeue(this, e)
                })
            }, finish: function (e) {
                return e !== !1 && (e = e || "fx"), this.each(function () {
                    var t, n = rt._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = rt.timers, a = r ? r.length : 0;
                    for (n.finish = !0, rt.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), rt.each(["toggle", "show", "hide"], function (e, t) {
            var n = rt.fn[t];
            rt.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, r, i)
            }
        }), rt.each({
            slideDown: q("show"),
            slideUp: q("hide"),
            slideToggle: q("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (e, t) {
            rt.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), rt.timers = [], rt.fx.tick = function () {
            var e, t = rt.timers, n = 0;
            for (pn = rt.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || rt.fx.stop(), pn = void 0
        }, rt.fx.timer = function (e) {
            rt.timers.push(e), e() ? rt.fx.start() : rt.timers.pop()
        }, rt.fx.interval = 13, rt.fx.start = function () {
            hn || (hn = setInterval(rt.fx.tick, rt.fx.interval))
        }, rt.fx.stop = function () {
            clearInterval(hn), hn = null
        }, rt.fx.speeds = {slow: 600, fast: 200, _default: 400}, rt.fn.delay = function (e, t) {
            return e = rt.fx ? rt.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        }, !function () {
            var e, t, n, r, i;
            t = pt.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = pt.createElement("select"), i = n.appendChild(pt.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", tt.getSetAttribute = "t" !== t.className, tt.style = /top/.test(r.getAttribute("style")), tt.hrefNormalized = "/a" === r.getAttribute("href"), tt.checkOn = !!e.value, tt.optSelected = i.selected, tt.enctype = !!pt.createElement("form").enctype, n.disabled = !0, tt.optDisabled = !i.disabled, e = pt.createElement("input"), e.setAttribute("value", ""), tt.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), tt.radioValue = "t" === e.value
        }();
        var xn = /\r/g;
        rt.fn.extend({
            val: function (e) {
                var t, n, r, i = this[0];
                {
                    if (arguments.length)return r = rt.isFunction(e), this.each(function (n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, rt(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : rt.isArray(i) && (i = rt.map(i, function (e) {
                            return null == e ? "" : e + ""
                        })), t = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                    });
                    if (i)return t = rt.valHooks[i.type] || rt.valHooks[i.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(xn, "") : null == n ? "" : n)
                }
            }
        }), rt.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = rt.find.attr(e, "value");
                        return null != t ? t : rt.trim(rt.text(e))
                    }
                }, select: {
                    get: function (e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; s > l; l++)if (n = r[l], !(!n.selected && l !== i || (tt.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
                            if (t = rt(n).val(), o)return t;
                            a.push(t)
                        }
                        return a
                    }, set: function (e, t) {
                        for (var n, r, i = e.options, o = rt.makeArray(t), a = i.length; a--;)if (r = i[a], rt.inArray(rt.valHooks.option.get(r), o) >= 0)try {
                            r.selected = n = !0
                        } catch (s) {
                            r.scrollHeight
                        } else r.selected = !1;
                        return n || (e.selectedIndex = -1), i
                    }
                }
            }
        }), rt.each(["radio", "checkbox"], function () {
            rt.valHooks[this] = {
                set: function (e, t) {
                    return rt.isArray(t) ? e.checked = rt.inArray(rt(e).val(), t) >= 0 : void 0
                }
            }, tt.checkOn || (rt.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var wn, Tn, Cn = rt.expr.attrHandle, Nn = /^(?:checked|selected)$/i, En = tt.getSetAttribute, kn = tt.input;
        rt.fn.extend({
            attr: function (e, t) {
                return At(this, rt.attr, e, t, arguments.length > 1)
            }, removeAttr: function (e) {
                return this.each(function () {
                    rt.removeAttr(this, e)
                })
            }
        }), rt.extend({
            attr: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === Tt ? rt.prop(e, t, n) : (1 === o && rt.isXMLDoc(e) || (t = t.toLowerCase(), r = rt.attrHooks[t] || (rt.expr.match.bool.test(t) ? Tn : wn)), void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = rt.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : (rt.removeAttr(e, t), void 0))
            }, removeAttr: function (e, t) {
                var n, r, i = 0, o = t && t.match(yt);
                if (o && 1 === e.nodeType)for (; n = o[i++];)r = rt.propFix[n] || n, rt.expr.match.bool.test(n) ? kn && En || !Nn.test(n) ? e[r] = !1 : e[rt.camelCase("default-" + n)] = e[r] = !1 : rt.attr(e, n, ""), e.removeAttribute(En ? n : r)
            }, attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!tt.radioValue && "radio" === t && rt.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }
        }), Tn = {
            set: function (e, t, n) {
                return t === !1 ? rt.removeAttr(e, n) : kn && En || !Nn.test(n) ? e.setAttribute(!En && rt.propFix[n] || n, n) : e[rt.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var n = Cn[t] || rt.find.attr;
            Cn[t] = kn && En || !Nn.test(t) ? function (e, t, r) {
                var i, o;
                return r || (o = Cn[t], Cn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Cn[t] = o), i
            } : function (e, t, n) {
                return n ? void 0 : e[rt.camelCase("default-" + t)] ? t.toLowerCase() : null
            }
        }), kn && En || (rt.attrHooks.value = {
            set: function (e, t, n) {
                return rt.nodeName(e, "input") ? (e.defaultValue = t, void 0) : wn && wn.set(e, t, n)
            }
        }), En || (wn = {
            set: function (e, t, n) {
                var r = e.getAttributeNode(n);
                return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
            }
        }, Cn.id = Cn.name = Cn.coords = function (e, t, n) {
            var r;
            return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
        }, rt.valHooks.button = {
            get: function (e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : void 0
            }, set: wn.set
        }, rt.attrHooks.contenteditable = {
            set: function (e, t, n) {
                wn.set(e, "" === t ? !1 : t, n)
            }
        }, rt.each(["width", "height"], function (e, t) {
            rt.attrHooks[t] = {
                set: function (e, n) {
                    return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }
            }
        })), tt.style || (rt.attrHooks.style = {
            get: function (e) {
                return e.style.cssText || void 0
            }, set: function (e, t) {
                return e.style.cssText = t + ""
            }
        });
        var Sn = /^(?:input|select|textarea|button|object)$/i, An = /^(?:a|area)$/i;
        rt.fn.extend({
            prop: function (e, t) {
                return At(this, rt.prop, e, t, arguments.length > 1)
            }, removeProp: function (e) {
                return e = rt.propFix[e] || e, this.each(function () {
                    try {
                        this[e] = void 0, delete this[e]
                    } catch (t) {
                    }
                })
            }
        }), rt.extend({
            propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
                var r, i, o, a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a)return o = 1 !== a || !rt.isXMLDoc(e), o && (t = rt.propFix[t] || t, i = rt.propHooks[t]), void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
            }, propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = rt.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Sn.test(e.nodeName) || An.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }
        }), tt.hrefNormalized || rt.each(["href", "src"], function (e, t) {
            rt.propHooks[t] = {
                get: function (e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), tt.optSelected || (rt.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        }), rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            rt.propFix[this.toLowerCase()] = this
        }), tt.enctype || (rt.propFix.enctype = "encoding");
        var Dn = /[\t\r\n\f]/g;
        rt.fn.extend({
            addClass: function (e) {
                var t, n, r, i, o, a, s = 0, l = this.length, u = "string" == typeof e && e;
                if (rt.isFunction(e))return this.each(function (t) {
                    rt(this).addClass(e.call(this, t, this.className))
                });
                if (u)for (t = (e || "").match(yt) || []; l > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Dn, " ") : " ")) {
                    for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                    a = rt.trim(r), n.className !== a && (n.className = a)
                }
                return this
            }, removeClass: function (e) {
                var t, n, r, i, o, a, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
                if (rt.isFunction(e))return this.each(function (t) {
                    rt(this).removeClass(e.call(this, t, this.className))
                });
                if (u)for (t = (e || "").match(yt) || []; l > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Dn, " ") : "")) {
                    for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
                    a = e ? rt.trim(r) : "", n.className !== a && (n.className = a)
                }
                return this
            }, toggleClass: function (e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : rt.isFunction(e) ? this.each(function (n) {
                    rt(this).toggleClass(e.call(this, n, this.className, t), t)
                }) : this.each(function () {
                    if ("string" === n)for (var t, r = 0, i = rt(this), o = e.match(yt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === Tt || "boolean" === n) && (this.className && rt._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : rt._data(this, "__className__") || "")
                })
            }, hasClass: function (e) {
                for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Dn, " ").indexOf(t) >= 0)return !0;
                return !1
            }
        }), rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
            rt.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), rt.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }, bind: function (e, t, n) {
                return this.on(e, null, t, n)
            }, unbind: function (e, t) {
                return this.off(e, null, t)
            }, delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            }, undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var jn = rt.now(), Ln = /\?/, Hn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        rt.parseJSON = function (t) {
            if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
            var n, r = null, i = rt.trim(t + "");
            return i && !rt.trim(i.replace(Hn, function (e, t, i, o) {
                return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
            })) ? Function("return " + i)() : rt.error("Invalid JSON: " + t)
        }, rt.parseXML = function (t) {
            var n, r;
            if (!t || "string" != typeof t)return null;
            try {
                e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
            } catch (i) {
                n = void 0
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + t), n
        };
        var qn, _n, Mn = /#.*$/, On = /([?&])_=[^&]*/, Fn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Bn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Pn = /^(?:GET|HEAD)$/, Rn = /^\/\//, Wn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, $n = {}, zn = {}, In = "*/".concat("*");
        try {
            _n = location.href
        } catch (Xn) {
            _n = pt.createElement("a"), _n.href = "", _n = _n.href
        }
        qn = Wn.exec(_n.toLowerCase()) || [], rt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: _n,
                type: "GET",
                isLocal: Bn.test(qn[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": In,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /xml/, html: /html/, json: /json/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": rt.parseJSON, "text xml": rt.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (e, t) {
                return t ? R(R(e, rt.ajaxSettings), t) : R(rt.ajaxSettings, e)
            },
            ajaxPrefilter: B($n),
            ajaxTransport: B(zn),
            ajax: function (e, t) {
                function n(e, t, n, r) {
                    var i, c, v, y, x, T = t;
                    2 !== b && (b = 2, s && clearTimeout(s), u = void 0, a = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (y = W(d, w, n)), y = $(d, y, w, i), i ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (rt.lastModified[o] = x), x = w.getResponseHeader("etag"), x && (rt.etag[o] = x)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, c = y.data, v = y.error, i = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", i ? h.resolveWith(f, [c, T, w]) : h.rejectWith(f, [w, T, v]), w.statusCode(g), g = void 0, l && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, d, i ? c : v]), m.fireWith(f, [w, T]), l && (p.trigger("ajaxComplete", [w, d]), --rt.active || rt.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var r, i, o, a, s, l, u, c, d = rt.ajaxSetup({}, t), f = d.context || d, p = d.context && (f.nodeType || f.jquery) ? rt(f) : rt.event, h = rt.Deferred(), m = rt.Callbacks("once memory"), g = d.statusCode || {}, v = {}, y = {}, b = 0, x = "canceled", w = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!c)for (c = {}; t = Fn.exec(a);)c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === b ? a : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, v[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return b || (d.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)if (2 > b)for (t in e)g[t] = [g[t], e[t]]; else w.always(e[w.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || x;
                        return u && u.abort(t), n(0, t), this
                    }
                };
                if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || _n) + "").replace(Mn, "").replace(Rn, qn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = rt.trim(d.dataType || "*").toLowerCase().match(yt) || [""], null == d.crossDomain && (r = Wn.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === qn[1] && r[2] === qn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (qn[3] || ("http:" === qn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = rt.param(d.data, d.traditional)), P($n, d, t, w), 2 === b)return w;
                l = d.global, l && 0 === rt.active++ && rt.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Pn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (Ln.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = On.test(o) ? o.replace(On, "$1_=" + jn++) : o + (Ln.test(o) ? "&" : "?") + "_=" + jn++)), d.ifModified && (rt.lastModified[o] && w.setRequestHeader("If-Modified-Since", rt.lastModified[o]), rt.etag[o] && w.setRequestHeader("If-None-Match", rt.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + In + "; q=0.01" : "") : d.accepts["*"]);
                for (i in d.headers)w.setRequestHeader(i, d.headers[i]);
                if (d.beforeSend && (d.beforeSend.call(f, w, d) === !1 || 2 === b))return w.abort();
                x = "abort";
                for (i in{success: 1, error: 1, complete: 1})w[i](d[i]);
                if (u = P(zn, d, t, w)) {
                    w.readyState = 1, l && p.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                        w.abort("timeout")
                    }, d.timeout));
                    try {
                        b = 1, u.send(v, n)
                    } catch (T) {
                        if (!(2 > b))throw T;
                        n(-1, T)
                    }
                } else n(-1, "No Transport");
                return w
            },
            getJSON: function (e, t, n) {
                return rt.get(e, t, n, "json")
            },
            getScript: function (e, t) {
                return rt.get(e, void 0, t, "script")
            }
        }), rt.each(["get", "post"], function (e, t) {
            rt[t] = function (e, n, r, i) {
                return rt.isFunction(n) && (i = i || r, r = n, n = void 0), rt.ajax({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                })
            }
        }), rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            rt.fn[t] = function (e) {
                return this.on(t, e)
            }
        }), rt._evalUrl = function (e) {
            return rt.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
        }, rt.fn.extend({
            wrapAll: function (e) {
                if (rt.isFunction(e))return this.each(function (t) {
                    rt(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = rt(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            }, wrapInner: function (e) {
                return rt.isFunction(e) ? this.each(function (t) {
                    rt(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = rt(this), n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            }, wrap: function (e) {
                var t = rt.isFunction(e);
                return this.each(function (n) {
                    rt(this).wrapAll(t ? e.call(this, n) : e)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
                }).end()
            }
        }), rt.expr.filters.hidden = function (e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !tt.reliableHiddenOffsets() && "none" === (e.style && e.style.display || rt.css(e, "display"))
        }, rt.expr.filters.visible = function (e) {
            return !rt.expr.filters.hidden(e)
        };
        var Un = /%20/g, Vn = /\[\]$/, Jn = /\r?\n/g, Yn = /^(?:submit|button|image|reset|file)$/i, Gn = /^(?:input|select|textarea|keygen)/i;
        rt.param = function (e, t) {
            var n, r = [], i = function (e, t) {
                t = rt.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
            if (void 0 === t && (t = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(e) || e.jquery && !rt.isPlainObject(e))rt.each(e, function () {
                i(this.name, this.value)
            }); else for (n in e)z(n, e[n], t, i);
            return r.join("&").replace(Un, "+")
        }, rt.fn.extend({
            serialize: function () {
                return rt.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var e = rt.prop(this, "elements");
                    return e ? rt.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !rt(this).is(":disabled") && Gn.test(this.nodeName) && !Yn.test(e) && (this.checked || !Dt.test(e))
                }).map(function (e, t) {
                    var n = rt(this).val();
                    return null == n ? null : rt.isArray(n) ? rt.map(n, function (e) {
                        return {name: t.name, value: e.replace(Jn, "\r\n")}
                    }) : {name: t.name, value: n.replace(Jn, "\r\n")}
                }).get()
            }
        }), rt.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && I() || X()
        } : I;
        var Qn = 0, Kn = {}, Zn = rt.ajaxSettings.xhr();
        e.ActiveXObject && rt(e).on("unload", function () {
            for (var e in Kn)Kn[e](void 0, !0)
        }), tt.cors = !!Zn && "withCredentials"in Zn, Zn = tt.ajax = !!Zn, Zn && rt.ajaxTransport(function (e) {
            if (!e.crossDomain || tt.cors) {
                var t;
                return {
                    send: function (n, r) {
                        var i, o = e.xhr(), a = ++Qn;
                        if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
                        e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (i in n)void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                        o.send(e.hasContent && e.data || null), t = function (n, i) {
                            var s, l, u;
                            if (t && (i || 4 === o.readyState))if (delete Kn[a], t = void 0, o.onreadystatechange = rt.noop, i)4 !== o.readyState && o.abort(); else {
                                u = {}, s = o.status, "string" == typeof o.responseText && (u.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (c) {
                                    l = ""
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                            }
                            u && r(s, l, u, o.getAllResponseHeaders())
                        }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Kn[a] = t : t()
                    }, abort: function () {
                        t && t(void 0, !0)
                    }
                }
            }
        }), rt.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /(?:java|ecma)script/},
            converters: {
                "text script": function (e) {
                    return rt.globalEval(e), e
                }
            }
        }), rt.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), rt.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var t, n = pt.head || rt("head")[0] || pt.documentElement;
                return {
                    send: function (r, i) {
                        t = pt.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                        }, n.insertBefore(t, n.firstChild)
                    }, abort: function () {
                        t && t.onload(void 0, !0)
                    }
                }
            }
        });
        var er = [], tr = /(=)\?(?=&|$)|\?\?/;
        rt.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var e = er.pop() || rt.expando + "_" + jn++;
                return this[e] = !0, e
            }
        }), rt.ajaxPrefilter("json jsonp", function (t, n, r) {
            var i, o, a, s = t.jsonp !== !1 && (tr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = rt.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(tr, "$1" + i) : t.jsonp !== !1 && (t.url += (Ln.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
                return a || rt.error(i + " was not called"), a[0]
            }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
                a = arguments
            }, r.always(function () {
                e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, er.push(i)), a && rt.isFunction(o) && o(a[0]), a = o = void 0
            }), "script") : void 0
        }), rt.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e)return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || pt;
            var r = ct.exec(e), i = !n && [];
            return r ? [t.createElement(r[1])] : (r = rt.buildFragment([e], t, i), i && i.length && rt(i).remove(), rt.merge([], r.childNodes))
        };
        var nr = rt.fn.load;
        rt.fn.load = function (e, t, n) {
            if ("string" != typeof e && nr)return nr.apply(this, arguments);
            var r, i, o, a = this, s = e.indexOf(" ");
            return s >= 0 && (r = rt.trim(e.slice(s, e.length)), e = e.slice(0, s)), rt.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && rt.ajax({
                url: e,
                type: o,
                dataType: "html",
                data: t
            }).done(function (e) {
                i = arguments, a.html(r ? rt("<div>").append(rt.parseHTML(e)).find(r) : e)
            }).complete(n && function (e, t) {
                a.each(n, i || [e.responseText, t, e])
            }), this
        }, rt.expr.filters.animated = function (e) {
            return rt.grep(rt.timers, function (t) {
                return e === t.elem
            }).length
        };
        var rr = e.document.documentElement;
        rt.offset = {
            setOffset: function (e, t, n) {
                var r, i, o, a, s, l, u, c = rt.css(e, "position"), d = rt(e), f = {};
                "static" === c && (e.style.position = "relative"), s = d.offset(), o = rt.css(e, "top"), l = rt.css(e, "left"), u = ("absolute" === c || "fixed" === c) && rt.inArray("auto", [o, l]) > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), rt.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using"in t ? t.using.call(e, f) : d.css(f)
            }
        }, rt.fn.extend({
            offset: function (e) {
                if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                    rt.offset.setOffset(this, e, t)
                });
                var t, n, r = {top: 0, left: 0}, i = this[0], o = i && i.ownerDocument;
                if (o)return t = o.documentElement, rt.contains(t, i) ? (typeof i.getBoundingClientRect !== Tt && (r = i.getBoundingClientRect()), n = U(o), {
                    top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : r
            }, position: function () {
                if (this[0]) {
                    var e, t, n = {top: 0, left: 0}, r = this[0];
                    return "fixed" === rt.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), rt.nodeName(e[0], "html") || (n = e.offset()), n.top += rt.css(e[0], "borderTopWidth", !0), n.left += rt.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - rt.css(r, "marginTop", !0),
                        left: t.left - n.left - rt.css(r, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent || rr; e && !rt.nodeName(e, "html") && "static" === rt.css(e, "position");)e = e.offsetParent;
                    return e || rr
                })
            }
        }), rt.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
            var n = /Y/.test(t);
            rt.fn[e] = function (r) {
                return At(this, function (e, r, i) {
                    var o = U(e);
                    return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : (o ? o.scrollTo(n ? rt(o).scrollLeft() : i, n ? i : rt(o).scrollTop()) : e[r] = i, void 0)
                }, e, r, arguments.length, null)
            }
        }), rt.each(["top", "left"], function (e, t) {
            rt.cssHooks[t] = E(tt.pixelPosition, function (e, n) {
                return n ? (n = en(e, t), nn.test(n) ? rt(e).position()[t] + "px" : n) : void 0
            })
        }), rt.each({Height: "height", Width: "width"}, function (e, t) {
            rt.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
                rt.fn[r] = function (r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
                    return At(this, function (t, n, r) {
                        var i;
                        return rt.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? rt.css(t, n, a) : rt.style(t, n, r, a)
                    }, t, o ? r : void 0, o, null)
                }
            })
        }), rt.fn.size = function () {
            return this.length
        }, rt.fn.andSelf = rt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return rt
        });
        var ir = e.jQuery, or = e.$;
        return rt.noConflict = function (t) {
            return e.$ === rt && (e.$ = or), t && e.jQuery === rt && (e.jQuery = ir), rt
        }, rt
    })
});