!function (e) {
    var t = e.amkit;
    t || (t = e.amkit = {});
    var n = t.entry;
    n || (n = t.entry = {}), n.getScript || (n.getScript = function () {
        var e = /loaded|complete/, t = document.getElementsByTagName("head")[0] || document.documentElement, n = t.getElementsByTagName("base")[0];
        return function (a, r, s) {
            function o() {
                i.onload = i.onerror = i.onreadystatechange = null, t.removeChild(i), i = null, r && r()
            }

            var i = document.createElement("script");
            "onload"in i ? i.onerror = i.onload = o : i.onreadystatechange = function () {
                e.test(i.readyState) && o()
            }, i.async = !0, i.src = a, s && (i.id = s), n ? t.insertBefore(i, n) : t.appendChild(i)
        }
    }()), n.run || (n.run = function () {
        function e() {
            var e, n, a, r, s = document.getElementsByTagName("script"), o = [];
            for (a = 0, r = s.length; r > a; a++)e = s[a], e.src && e.src.toLowerCase().indexOf("amkit/entry") >= 0 && (n = e.getAttribute("data-entry"), n && t.push(n.toLowerCase()), o.push(e));
            for (a = 0, r = o.length; r > a; a++)e = o[a], e.parentNode && e.parentNode.removeChild(e);
            o = e = s = null
        }

        var t = [];
        return function () {
            e();
            for (var n; n = t.shift();)seajs.use(n)
        }
    }()), e.seajs ? (!seajs.define && e.define && (seajs.define = e.define), seajs.args || n.run()) : !function () {
        function t(e) {
            return function () {
                return r.push(e, arguments), a
            }
        }

        var a, r = [];
        e.seajs = a = {
            args: r,
            define: t(0),
            config: t(1),
            use: t(2)
        }, n.getScript("http://assets.dwstatic.com/b=amkit/seajs&f=2.2.0/sea.js,2.2.0/ex.js,seajs-style/1.0.2/seajs-style.js&nm&20150507", n.run, "seajsnode")
    }()
}(this);