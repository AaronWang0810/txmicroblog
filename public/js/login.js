String.prototype.hasString = function(a) {
    if ("object" == typeof a) {
        for (var b = 0,
        d = a.length; b < d; b++) if (!this.hasString(a[b])) return ! 1;
        return ! 0
    }
    if ( - 1 != this.indexOf(a)) return ! 0
};
String.prototype.breakWord = function(a, b) {
    b || (b = "<wbr/>");
    return this.replace(RegExp("(\\w{" + (a ? a: 0) + "})(\\w)", "g"),
    function(a, c, e) {
        return c + b + e
    })
};
window.UI &&
function() {
    var a = UI;
    window.UI_ = function() {
        for (var b in a) UI[b] || (UI[b] = a[b])
    }
} ();
UI = window.UI || {
    ajax: function(a) {
        var b = a.xhr || UI.xmlHttp(),
        d,
        c;
        a.async = UI.isUndefined(a.async) ? !0 : a.async;
        b.onreadystatechange = function() {
            b && (1 == b.readyState ? a.timeout && a.fail && (c = setTimeout(function() {
                d || (d = 1, a.fail(), b.abort(), b = null)
            },
            a.timeout), a.timeout = 0) : 2 == b.readyState ? a.send && a.send() : 4 == b.readyState && !d && (d = 1, 200 == b.status ? a.success && a.success(b.responseText) : a.fail && a.fail(), clearTimeout(c), b = null))
        };
        if (UI.isObject(a.data)) {
            var e = [],
            f;
            for (f in a.data) e.push(f + "=" + encodeURIComponent(a.data[f]));
            a.data = e.join("&")
        }
        e = function() {
            a.refer && b.setRequestHeader("rf", a.refer)
        };
        "get" == a.type ? (b.open("GET", a.url + (a.url.hasString("?") ? "&": "?") + (a.data || ""), a.async), e(), b.send(null)) : (b.open("POST", a.url, a.async), e(), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.send(a.data));
        return b
    },
    get: function(a, b, d) {
        var c = UI.xmlHttp(),
        e = a.hasString("?") ? "&": "?";
        c.onreadystatechange = function() {
            if (4 == c.readyState && 200 == c.status) try {
                d(c.responseText)
            } catch(a) {} else return c
        };
        if (void 0 != b) if (UI.isObject(b)) {
            var f = [],
            g;
            for (g in b) f.push(g + "=" + encodeURIComponent(b[g]));
            a += e + f.join("&")
        } else a += e + b;
        c.open("GET", a, !0);
        c.send(null);
        return c
    },
    xmlHttp: function() {
        var a;
        window.ActiveXObject ? a = new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest && (a = new XMLHttpRequest);
        return a
    },
    getScript: function(a, b, d) {
        var c = UI.DC("script");
        UI.B.ie ? c.onreadystatechange = function() {
            if ("loaded" == this.readyState || "complete" == this.readyState) b && b(),
            c = null
        }: c.onload = function() {
            b && b();
            c = null
        };
        d && UI.A(c, "charset", d);
        UI.A(c, "type", "text/javascript");
        UI.A(c, "src", a);
        UI.A(c, "async", "true");
        UI.GT(document, "head")[0].appendChild(c)
    },
    encode: function(a) {
        return escape(UI.utfEncode(a))
    },
    decode: function(a) {
        return UI.utfDecode(unescape(a))
    },
    utfEncode: function(a) {
        for (var a = a.replace(/\r\n/g, "\n"), b = "", d = 0; d < a.length; d++) {
            var c = a.charCodeAt(d);
            128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128))
        }
        return b
    },
    utfDecode: function(a) {
        for (var b = "",
        d = 0,
        c = c1 = c2 = c3 = 0; d < a.length;) c = a.charCodeAt(d),
        128 > c ? (b += String.fromCharCode(c), d++) : 191 < c && 224 > c ? (c2 = a.charCodeAt(d + 1), b += String.fromCharCode((c & 31) << 6 | c2 & 63), d += 2) : (c2 = a.charCodeAt(d + 1), c3 = a.charCodeAt(d + 2), b += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63), d += 3);
        return b
    },
    parseUrl: function(a) {
        var b = document.location.href,
        d = {},
        a = a || "?";
        if (!b.hasString(a)) return d;
        a = b.split(a)[1].split("&");
        for (b = 0; b < a.length; b++) {
            var c = a[b].split("=");
            d[c[0]] = c[1]
        }
        return d
    },
    cookie: function(a, b, d, c) {
        if (void 0 == b) {
            a += "=";
            b = document.cookie.split(";");
            for (d = 0; d < b.length; d++) {
                for (c = b[d];
                " " == c.charAt(0);) c = c.substring(1, c.length);
                if (0 == c.indexOf(a)) return decodeURIComponent(c.substring(a.length, c.length))
            }
            return null
        }
        var e = "";
        d && (e = new Date, e.setTime(e.getTime() + 864E5 * d), e = "; expires=" + e.toGMTString());
        document.cookie = a + "=" + b + e + "; path=/" + (c ? ";domain=" + c: "")
    },
    animate: function(a, b, d, c, e, f) {
        var e = e || 0.4,
        g = b.hasString("scroll"),
        i = "height,width,marginLeft,marginTop".hasString(b),
        j,
        h = setInterval(function() {
            var f, l, m, u = "opacity" == b;
            f = i ? a.style[b] : g ? a[b] : UI.C(a, b);
            u ? (f *= 100, d *= 100, 100 < d && (d = 100)) : g || (f = "auto" == f ? 0 : Number(f.slice(0, -2)));
            if (isNaN(d)) clearInterval(h);
            else {
                if (3 >= Math.abs(d - f) || g && j == f) f = d,
                clearInterval(h);
                m = (d - f) * e;
                u || (0 < m && 1 > m ? m = 1 : 0 > m && -1 < m && (m = -1));
                l = j = f + m;
                if (!u && (0 > m && 0 < d - l || 0 < m && 0 < l - d)) l = d;
                i ? a.style[b] = l + "px": g ? a[b] = parseInt(l) : UI.C(a, b, !u ? l + "px": l / 100 + "");
                f == d && (UI.isString(c) ? eval(c) : c && c())
            }
        },
        f || 40);
        return h
    },
    getX: function(a) {
        return (a.offsetParent ? a.offsetLeft + UI.getX(a.offsetParent) : a.offsetLeft) + ("fixed" == UI.C(a, "position") ? UI.scrollX() : 0)
    },
    getY: function(a) {
        return (a.offsetParent ? a.offsetTop + UI.getY(a.offsetParent) : a.offsetTop) + ("fixed" == UI.C(a, "position") ? UI.scrollY() : 0)
    },
    within: function(a, b) {
        var d = UI.getX(b) - UI.scrollX(),
        c = UI.width(b) + d,
        e = UI.getY(b) - UI.scrollY(),
        f = UI.height(b) + e,
        g = {};
        if (a[0] > d && a[0] < c && a[1] > e && a[1] < f) return a[0] - d < (c - d) / 2 && (g.left = !0),
        a[1] - e < (f - e) / 2 && (g.top = !0),
        g
    },
    frameX: function(a) {
        return a.frameElement ? UI.getX(a.frameElement) + UI.frameX(a.parent) : 0
    },
    frameY: function(a) {
        return a.frameElement ? UI.getY(a.frameElement) + UI.frameY(a.parent) : 0
    },
    width: function(a) {
        return a ? parseInt(a.offsetWidth) : 0
    },
    height: function(a) {
        return a ? parseInt(a.offsetHeight) : 0
    },
    pageWidth: function() {
        return document.body.scrollWidth || document.documentElement.scrollWidth
    },
    pageHeight: function() {
        return document.body.scrollHeight || document.documentElement.scrollHeight
    },
    windowWidth: function() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth
    },
    windowHeight: function() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight
    },
    scrollX: function(a) {
        var b = document.documentElement;
        if (a) {
            var d = a.parentNode,
            c = a.scrollLeft || 0;
            a == b && (c = UI.scrollX());
            return d ? c + UI.scrollX(d) : c
        }
        return self.pageXOffset || b && b.scrollLeft || document.body.scrollLeft
    },
    scrollY: function(a) {
        var b = document.documentElement;
        if (a) {
            var d = a.parentNode,
            c = a.scrollTop || 0;
            a == b && (c = UI.scrollY());
            return d ? c + UI.scrollY(d) : c
        }
        return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
    },
    scrollTo: function(a, b, d) {
        if (a == document.documentElement || a == document.body) return window.scrollTo(b, d)
    },
    hide: function(a) {
        UI.isString(a) && (a = this.G(a));
        if (a) {
            if (!a.__curDisplay) {
                var b = this.C(a, "display");
                "none" != b && (a.__curDisplay = b)
            }
            a.style.display = "none"
        }
    },
    show: function(a) {
        UI.isString(a) && (a = this.G(a));
        a && (a.style.display = a.__curDisplay || "")
    },
    toggle: function(a) {
        UI.isString(a) && (a = this.G(a));
        "none" == this.C(a, "display") ? this.show(a) : this.hide(a)
    },
    hasClass: function(a, b) {
        return ! a || !a.className ? !1 : a.className != a.className.replace(RegExp("\\b" + b + "\\b"), "")
    },
    addClass: function(a, b) {
        a && (a.className ? this.hasClass(a, b) || (a.className += " " + b) : a.className = b)
    },
    removeClass: function(a, b) {
        if (a) {
            var d = b.split(" ");
            1 < d.length ? UI.each(d,
            function(b) {
                UI.removeClass(a, b)
            }) : this.hasClass(a, b) && (a.className = a.className.replace(RegExp("\\b" + b + "\\b"), ""))
        }
    },
    toggleClass: function(a, b) {
        this.hasClass(a, b) ? this.removeClass(a, b) : this.addClass(a, b)
    },
    next: function(a) {
        a = a.nextSibling;
        return null == a ? !1 : UI.isElement(a) ? a: this.next(a)
    },
    prev: function(a) {
        a = a.previousSibling;
        return null == a ? !1 : UI.isElement(a) ? a: this.prev(a)
    },
    remove: function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    },
    append: function(a, b) {
        b.appendChild(a)
    },
    prepend: function(a, b) {
        var d = b.firstChild;
        d ? UI.before(a, d) : UI.append(a, b)
    },
    after: function(a, b) {
        var d = b.parentNode;
        d.lastChild == a ? d.appendChild(a) : d.insertBefore(a, b.nextSibling)
    },
    before: function(a, b) {
        b.parentNode.insertBefore(a, b)
    },
    replace: function(a, b) {
        b.parentNode.replaceChild(a, b)
    },
    tmpl: function() {
        var a = {};
        return function d(c, e) {
            var f = !/\W/.test(c) ? a[c] = a[c] || d(UI.G(c).innerHTML) : UI.tmplString(c);
            return e ? f(e) : f
        }
    } (),
    tmplString: function(a) {
        return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
    },
    html: function(a) {
        var b = UI.DC("div"),
        d = [];
        b.innerHTML = a;
        UI.each(b.childNodes,
        function(a) {
            UI.isElement(a) && d.push(a)
        });
        return d
    },
    css: function(a, b) {
        var d;
        b || (b = UI.DC("style"), UI.A(b, "type", "text/css"), UI.append(b, UI.GT(document, "head")[0]));
        if (b.styleSheet) try {
            b.styleSheet.cssText = a
        } catch(c) {
            d = $$("head style");
            var e = d.length;
            1 < e && (UI.remove(d[e - 1]), d[e - 2].styleSheet.cssText += a)
        } else d = document.createTextNode(a),
        UI.append(d, b)
    },
    text: function(a) {
        for (var b = [], a = a.childNodes, d, c = 0, e = a.length; c < e; c++) d = a[c].nodeName.toUpperCase(),
        "STYLE" == d || "SCRIPT" == d || b.push(1 != a[c].nodeType ? a[c].nodeValue: UI.text(a[c]));
        return b.join("")
    },
    parent: function(a, b) {
        if (UI.isArray(a)) {
            var d = [];
            UI.each(a,
            function(a) { (b && UI.hasClass(a.parentNode, b) || !b) && d.push(a.parentNode)
            });
            return d
        }
        return a && a.parentNode
    },
    parents: function(a, b) {
        if (b) {
            var d = [],
            c = UI.parents(a);
            UI.each(c,
            function(a) {
                UI.hasClass(a, b) && d.push(a)
            });
            return d
        }
        return (c = a.parentNode) ? "HTML" == c.nodeName ? [c] : [c].concat(UI.parents(c)) : []
    },
    children: function(a, b) {
        var d = [];
        b && (b = b.split("|"));
        UI.each(a.childNodes,
        function(a) {
            var e = !1;
            if (b) for (var f = 0,
            g = b.length; f < g; f++) if (UI.hasClass(a, b[f])) {
                e = !0;
                break
            }
            UI.isElement(a) && (!b || e) && d.push(a)
        });
        return d
    },
    A: function(a, b, d) {
        if (a && a.getAttribute) {
            if (void 0 == d) return a.getAttribute(b) || "";
            "" == d ? a.removeAttribute(b) : a.setAttribute(b, d)
        }
    },
    C: function() {
        var a;
        return function(b, d, c) {
            if (b) if (void 0 == c) {
                if (window.getComputedStyle) return d = d.replace(/([A-Z])/g, "-$1"),
                d = d.toLowerCase(),
                window.getComputedStyle(b, null).getPropertyValue(d);
                if (b.currentStyle) return "opacity" == d ? 0 <= b.style.filter.indexOf("opacity=") ? parseFloat(b.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1": b.currentStyle[d]
            } else ! a && "opacity" == d && (a = "opacity" in b.style ? 1 : 2),
            "opacity" == d && 2 == a ? b.style.filter = (b.style.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + 100 * c + ")": b.style[d] = c
        }
    } (),
    DC: function(a) {
        return document.createElement(a)
    },
    E: function(a) {
        if (a && a.clone) return a;
        a = window.event || a || {};
        return {
            clone: !0,
            stop: function() {
                a && a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            },
            prevent: function() {
                a && a.preventDefault ? a.preventDefault() : a.returnValue = !1
            },
            target: a.target || a.srcElement,
            relatedTarget: a.relatedTarget || (a.fromElement && a.fromElement === a.srcElement ? a.toElement: a.fromElement),
            x: a.clientX || a.pageX,
            y: a.clientY || a.pageY,
            button: a.button,
            key: a.keyCode,
            shift: a.shiftKey,
            alt: a.altKey,
            ctrl: a.ctrlKey,
            type: a.type,
            wheel: a.wheelDelta / 120 || -a.detail / 3
        }
    },
    bind: function(a, b, d) {
        d && UI.clear(function() {
            b = null
        });
        return function() {
            return a.apply(b, Array.prototype.slice.call(arguments))
        }
    },
    EA: function(a, b, d, c) {
        if (a) {
            if (UI.isString(a)) var e = d,
            d = function() {
                eval(e)
            };
            return a.addEventListener ? ("mousewheel" == b && UI.B.firefox && (b = "DOMMouseScroll"), a.addEventListener(b, d, c), !0) : a.attachEvent ? a.attachEvent("on" + b, d) : !1
        }
    },
    ER: function(a, b, d) {
        if (a) return a.removeEventListener ? (a.removeEventListener(b, d, !1), !0) : a.detachEvent ? a.detachEvent("on" + b, d) : !1
    },
    fireEvent: function() {
        return document.dispatchEvent ?
        function(a, b) {
            var d = document.createEvent("HTMLEvents");
            d.initEvent(b, !0, !0);
            return ! a.dispatchEvent(d)
        }: function(a, b) {
            var d = document.createEventObject();
            return a.fireEvent("on" + b, d)
        }
    } (),
    linkEvent: function() {
        var a = {},
        b = function(b, c) {
            var e = a[b];
            e && UI.each(e,
            function(a) {
                UI.isFunction(a) && a(c)
            })
        };
        b.event = a;
        b.add = function(b, c) {
            a[b] || (a[b] = []);
            c && a[b].push(c)
        };
        b.remove = function(b, c) {
            var e = a[b];
            UI.each(e,
            function(a, b) {
                c && a == c && e.splice(b, 1)
            })
        };
        return b
    } (),
    proxyEvent: function(a, b, d, c) {
        UI.EA(a, b,
        function(b) {
            for (var b = UI.E(b), f = b.target, g = 1; f;) {
                g++;
                for (var i = 0,
                j = d.length; i < j; i++) d[i][1](f) && d[i][0].call(f, b);
                UI.proxyEventStop || c && g >= c || f === a ? (f = null, UI.proxyEventStop = 0) : f = f.parentNode
            }
        })
    },
    G: function(a) {
        return UI.isElement(a) ? a: document.getElementById(a)
    },
    GT: function(a, b) {
        return a.getElementsByTagName(b)
    },
    GC: function() {
        function a(m, k) {
            k || (k = m, m = document);
            m = m || document;
            if (!/^[\w\-_#]+$/.test(k) && m.querySelectorAll) return b(m.querySelectorAll(k));
            if ( - 1 < k.indexOf(",")) {
                for (var h = k.split(/,/g), o = [], l = 0, n = h.length; l < n; ++l) o = o.concat(a(m, h[l]));
                return j(o)
            }
            var h = k.match(c),
            n = h.pop(),
            o = (n.match(f) || i)[1],
            q = !o && (n.match(e) || i)[1],
            l = n.split(".").slice(2),
            n = !o && (n.match(g) || i)[1];
            if (q && !n && m.getElementsByClassName) n = b(m.getElementsByClassName(q));
            else {
                n = !o && b(m.getElementsByTagName(n || "*"));
                if (q) {
                    for (var q = RegExp("(^|\\s)" + q + "(\\s|$)"), v = -1, r, s = -1, p = [], l = l || ""; r = n[++v];) q.test(r.className) && r.className.hasString(l) && (p[++s] = r);
                    n = p
                }
                if (o) return (h = m.getElementById(o)) ? [h] : []
            }
            return h[0] && n[0] ? d(h, n) : n
        }
        function b(a) {
            try {
                return Array.prototype.slice.call(a)
            } catch(b) {
                for (var c = [], d = 0, e = a.length; d < e; ++d) c[d] = a[d];
                return c
            }
        }
        function d(a, b, c) {
            var k = a.pop();
            if (">" === k) return d(a, b, !0);
            for (var h = [], j = -1, l = (k.match(f) || i)[1], v = !l && (k.match(e) || i)[1], k = !l && (k.match(g) || i)[1], r = -1, s, p, t, k = k && k.toLowerCase(); s = b[++r];) {
                p = s.parentNode;
                do
                if (t = (t = (t = !k || "*" === k || k === p.nodeName.toLowerCase()) && (!l || p.id === l)) && (!v || RegExp("(^|\\s)" + v + "(\\s|$)").test(p.className)), c || t) break;
                while (p = p.parentNode);
                t && (h[++j] = s)
            }
            return a[0] && h[0] ? d(a, h) : h
        }
        var c = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        e = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        f = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        g = /^([\w\*\-_]+)/,
        i = [null, null],
        j,
        h = +new Date,
        k,
        l = 1;
        k = function(a) {
            var b = a[h],
            c = l++;
            return ! b ? (a[h] = c, !0) : !1
        };
        j = function(a) {
            for (var b = a.length,
            c = [], d = -1, e = 0, f; e < b; ++e) f = a[e],
            k(f) && (c[++d] = f);
            h += 1;
            return c
        };
        return a
    } (),
    isMouseMove: function() {
        var a, b, d;
        UI.EA(document.body, "mousedown",
        function(a) {
            a = UI.E(a);
            b = a.x + "," + a.y
        });
        UI.EA(document.body, "mouseup",
        function(c) {
            c = UI.E(c);
            d = c.x + "," + c.y;
            a = b != d
        });
        UI.isMouseMove = function() {
            return a
        }
    },
    isDate: function(a) {
        return "Date" == this.getType(a)
    },
    formatDate: function(a, b) {
        for (var d = b.replace(/\W/g, ",").split(","), c = "yyyy MM dd hh mm ss ww".split(" "), e = {
            y: a.getFullYear(),
            M: a.getMonth() + 1,
            d: a.getDate(),
            h: a.getHours(),
            m: a.getMinutes(),
            s: a.getSeconds(),
            w: a.getDay()
        },
        f = 0, g = d.length; f < g; f++) for (var i = d[f], j = 0; 7 > j; j++) {
            var h = c[j].slice( - 1);
            i.hasString(h) && ("w" == h && 0 == e[h] && (e[h] = 7), b = i.hasString(c[j]) ? b.replace(RegExp(c[j], "g"), this.addZero(e[h])) : b.replace(RegExp(c[j].slice(c[j].length / 2), "g"), e[h]))
        }
        return b
    },
    isObject: function(a) {
        return "object" == typeof a
    },
    isElement: function(a) {
        return a && 1 == a.nodeType
    },
    isUndefined: function(a) {
        return "undefined" == typeof a
    },
    isFunction: function(a) {
        return "Function" == this.getType(a)
    },
    isNumber: function(a) {
        return "Number" == this.getType(a)
    },
    isString: function(a) {
        return "String" == this.getType(a)
    },
    isArray: function(a) {
        return "Array" == this.getType(a)
    },
    getType: function(a) {
        return Object.prototype.toString.call(a).slice(8, -1)
    },
    addZero: function(a, b) {
        b || (b = 2);
        return Array(Math.abs(("" + a).length - (b + 1))).join(0) + a
    },
    trim: function(a) {
        return a.replace(/^\s+|\s+$/g, "")
    },
    random: function(a, b) {
        void 0 == a && (a = 0);
        void 0 == b && (b = 9);
        return Math.floor(Math.random() * (b - a + 1) + a)
    },
    has: function(a, b) {
        for (var d = 0,
        c = a.length; d < c; d++) if (a[d] == b) return ! 0;
        return ! 1
    },
    hasKey: function(a, b) {
        return b in a
    },
    each: function(a, b) {
        if (a) if (UI.isUndefined(a[0]) && !UI.isArray(a)) for (var d in a) {
            if (b(a[d], d)) break
        } else {
            d = 0;
            for (var c = a.length; d < c && !b(a[d], d); d++);
        }
    },
    ready: function(a) {
        if (UI.ready.done) return a();
        UI.isReady.done ? UI.readyDo.push(a) : (UI.readyDo = [a], UI.isReady())
    },
    readyDo: [],
    isReady: function() {
        if (!UI.isReady.done) {
            UI.isReady.done = !0;
            if ("complete" == document.readyState) UI.onReady();
            else if (document.addEventListener) if ("interactive" == document.readyState && !UI.B.ie9) UI.onReady();
            else document.addEventListener("DOMContentLoaded",
            function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, !1);
                UI.onReady()
            },
            !1);
            else if (document.attachEvent) {
                var a = top != self;
                a ? document.attachEvent("onreadystatechange",
                function() {
                    "complete" === document.readyState && (document.detachEvent("onreadystatechange", arguments.callee), UI.onReady())
                }) : document.documentElement.doScroll && !a &&
                function() {
                    if (!UI.ready.done) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch(a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        UI.onReady()
                    }
                } ()
            }
            UI.EA(window, "load", UI.onReady)
        }
    },
    onReady: function() {
        if (!UI.ready.done) {
            UI.ready.done = !0;
            for (var a = 0,
            b = UI.readyDo.length; a < b; a++) try {
                UI.readyDo[a]()
            } catch(d) {}
            UI.readyDo = null
        }
    }
};
UI.B = function() {
    var a = {},
    b = navigator.userAgent;
    a.win = a.win || b.hasString("Win32");
    UI.each({
        win: "Windows",
        mac: "Mac",
        ie: "MSIE",
        ie6: "MSIE 6",
        ie7: "MSIE 7",
        ie8: "MSIE 8",
        ie9: "MSIE 9",
        safari: "WebKit",
        webkit: "WebKit",
        chrome: "Chrome",
        ipad: "iPad",
        iphone: "iPhone",
        os4: "OS 4",
        os5: "OS 5",
        os6: "OS 6",
        qq: "QQBrowser",
        firefox: "Firefox",
        tt: "TencentTraveler",
        opera: "Opera"
    },
    function(c, d) {
        a[d] = b.hasString(c)
    });
    a.ie6 = a.ie6 && !a.ie7 && !a.ie8;
    a.opera = window.opera || a.opera;
    try {
        a.maxthon = window.external && window.external.max_version
    } catch(d) {}
    return a
} ();
UI.proxyEvent.stop = function() {
    UI.proxyEventStop = 1
};
window.UI_ && UI_();
UI.B.ie && document.execCommand("BackgroundImageCache", !1, !0);
UI._clearCache = [];
UI.clear = function(a) {
    UI._clearCache.push(a)
};
UI.EA(window, "unload",
function() {
    for (var a = 0,
    b = UI._clearCache.length; a < b; a++) UI._clearCache[a]()
});
UI.isMouseMove();
String.prototype.toTitle = function() {
    return this.replace(/\r/g, "").replace(/\n/g, "").replace(/\'/g, "&#39;").replace(/\"/g, "&#34;").replace(/</g, "&#60;").replace(/>/g, "&#62;")
};
$ = UI.G;
$$ = UI.GC;
MI = {
    json: function(a) {
        var b = {};
        try {
            b = eval("(" + a + ")")
        } catch(d) {}
        return b
    },
    api: {
        host: function() {
            return "http://" + (window.MIAPIHost || "api.t.qq.com")
        } (),
        type: 0,
        version: "",
        time: "110602",
        source: null,
        boss: null
    },
    ajax: function(a, b) {
        var d = "_ajaxProxy_",
        c = "_ajax_",
        e = "_ajaxXhr_",
        f = "http://" + document.location.host,
        g = f,
        i, j = UI.isObject(a);
        if (j) {
            a.url && (i = a.url.match(/(http:\/\/)+([^\/]+)/i)) && i[0] && (g = i[0]);
            if (MI.api.type) {
                i = MI.random();
                var h = MI.api.type,
                k = MI.api.host;
                if (UI.isObject(a.data)) a.data.apiType || (a.data.apiType = h, a.data.apiHost = k),
                "get" == a.type && (a.data._r = i);
                else if (UI.isString(a.data) && (a.data.hasString("apiType") || (a.data += "&apiType=" + h, a.data += "&apiHost=" + k), "get" == a.type)) a.data += "&_r=" + i
            }
            if (g.hasString(f)) return UI.ajax(a)
        } else UI.isString(a) && (g = "http://" + a.replace(c, ""));
        f = g.replace("http://", "");
        d += f;
        e += f;
        c += f;
        UI.isString(a) && (c = a);
        MI[c] || (MI[c] = []);
        if (MI[d]) if (MI[e]) if (MI[c].length && !b) UI.each(MI[c],
        function(a) {
            MI.ajax(a, !0)
        });
        else {
            if (a) {
                MI[c] = [];
                if (a.url && a.url.hasString(g)) {
                    try {
                        a.xhr = MI[d].contentWindow.xmlHttp()
                    } catch(l) {
                        c = /api[\d].t.qq.com/g;
                        a.url.match(c) && (a.url = a.url.replace(c, "api.t.qq.com"), MI.ajax(a, !0));
                        return
                    }
                    a.refer = document.location.href
                }
                return UI.ajax(a)
            }
        } else j && MI[c].push(a);
        else j && MI[c].push(a),
        j = "ajaxProxy" + MI.random(),
        MI[d] = UI.html('<iframe id="' + j + '" name="' + j + '" src="' + g + '/proxy.html" style="display:none" onload="setTimeout(function(){MI[\'' + e + "'] = 1;MI.ajax('" + c + "');},50);\"></iframe>")[0],
        UI.ready(function() {
            UI.append(MI[d], document.body)
        })
    }
};
MI.picSrc = function() {
    return {
        hAny: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_",
        h20: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_20.png",
        h30: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_30.png",
        h40: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_40.png",
        h50: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_50.png",
        h80: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_80.png",
        h100: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_100.png",
        h120: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_120.png",
        h180: "http://mat1.gtimg.com/www/mb/img/p1/head_normal_180.png"
    }
} ();
MI.proxyEvent = function() {
    var a = function(a, b) {
        var e = b.match(/[\.]?[\w|-]+/g),
        f = 1;
        UI.each(e,
        function(b) {
            "." == b.slice(0, 1) ? UI.hasClass(a, b.slice(1)) || (f = 0) : a.nodeName.toLowerCase() != b && (f = 0)
        });
        return f
    },
    b = {};
    return function(d, c, e, f) {
        var g = 1;
        d == document.body && (g = 0, b[c] || (b[c] = [], UI.proxyEvent(document.body, c, b[c], 5)));
        var i = g ? [] : b[c];
        UI.each(f,
        function(b) {
            i.push([e(b),
            function(c) {
                var d, e = b.split("|"),
                f = [];
                e.length == 2 && (f = e[1].split("&"));
                e = e[0].split(",");
                if (!UI.proxyEventStop) {
                    UI.each(e,
                    function(b) {
                        if (b == "*") d = 1;
                        else if (b) {
                            d = 1;
                            for (var e = c,
                            b = b.split(" "), f = b.length; f > 0; f--) {
                                if (!a(e, b[f - 1])) {
                                    d = 0;
                                    break
                                }
                                e = e.parentNode
                            }
                        }
                        if (d) return 1
                    });
                    UI.each(f,
                    function(a) {
                        a = a.split("=");
                        a[1] && UI.A(c, a[0]) == a[1] || a[1] == "" && UI.A(c, a[0]) || (d = 0)
                    })
                }
                return d
            }])
        });
        g && UI.proxyEvent(d, c, i, 10)
    }
} ();
function trim(a) {
    return a.replace(/^\s*|\s*$/g, "")
}
function gcookie(a) {
    for (var a = a + "=",
    b = document.cookie.split(";"), d = 0; d < b.length; d++) {
        for (var c = b[d];
        " " == c.charAt(0);) c = c.substring(1, c.length);
        if (0 == c.indexOf(a)) return decodeURIComponent(c.substring(a.length, c.length))
    }
    return null
}
var Bos = function(a, b) {
    try {
        var d = trim(gcookie("o_cookie") || "");
        Bos.pic.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + d + "&sBiz=microblog&sOp=" + a + "&iSta=0&iTy=18&iFlow=0" + (b ? "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + b: "")
    } catch(c) {}
};
Bos.pic = new Image;
function resizeBgImg(a, b) {
    var d = document.getElementById("lg_bg"),
    c = d.getElementsByTagName("img")[0];
    a && (c = a);
    if (c) {
        var e = UI.A(c, "src");
        if ("" == e || "http://t.qq.com/" == e) c.src = UI.A(c, "crs");
        c.style.width = "auto";
        c.style.height = "auto";
        var f = document.documentElement || document.body,
        e = (c.width || 1E3) / (c.height || 1E3),
        g = d.offsetWidth || f.offsetWidth || 1024,
        d = d.offsetHeight || f.offsetHeight || 768;
        e < g / d ? (c.style.width = g + "px", c.style.height = "auto", c.style.marginLeft = "0px", c.style.marginTop = -(g / e - d) / 2 + "px") : (c.style.height = d + "px", c.style.width = "auto", c.style.marginTop = "0px", c.style.marginLeft = -(d * e - g) / 2 + "px")
    }
    b && b()
}
UI.EA(window, "resize",
function() {
    resizeBgImg()
});
UI.ready(function() {
    function a(a, b) {
        var c = $$(UI.parent(a), "label")[0];
        c && (0 == b ? UI.hide(c) : 1 == b && (a.value.length || UI.show(c)))
    }
    setTimeout(function() {
        MI.proxyEvent && MI.proxyEvent(document.body, "mousedown",
        function() {
            return function() {
                if (boss = UI.A(this, "boss")) boss.hasString("{") && (boss = MI.json(boss)),
                Bos(boss)
            }
        },
        ["*|boss="])
    },
    100);
    var b = 10,
    d = setInterval(function() {
        if (0 != b) {
            b--;
            var a = UI.G("u");
            a && "" != UI.trim(a.value) && UI.hide(UI.G("wb_tips"))
        } else clearInterval(d)
    },
    100),
    c = document.getElementById("lg_bg"),
    e = c.getElementsByTagName("img")[0];
    UI.EA(e, "load",
    function() {
        UI.show(e);
        resizeBgImg(e,
        function() {
            e.className = e.className ? e.className + " on": "on";
            var a = $("master");
            UI.C(e, "opacity", 1);
            UI.C(a, "opacity", 1);
            UI.animate(a, "opacity", 0, "", 0.2)
        })
    });
    UI.B.ie6 ? (c.style.setExpression("top", "eval((document.documentElement||document.body).scrollTop) + 'px'"), c.style.setExpression("left", "eval((document.documentElement||document.body).scrollLeft) + 'px'"), c.style.setExpression("height", "UI.windowHeight() + 'px'"), c.style.setExpression("width", "UI.windowWidth() + 'px'")) : UI.B.os5 && (UI.B.iphone && UI.B.qq) && (c.style.position = "absolute");
    UI.A(e, "src", UI.A(e, "crs"));
    var f = [],
    g = UI.html('<div style="display:none"></div>')[0];
    window.vJS && f.push('<img src="http://mat1.gtimg.com/www/mb/js/mi_' + vJS + '.js">');
    window.vCSS && f.push('<img src="http://mat1.gtimg.com/www/mb/css/style_' + vCSS + '.css">');
    UI.each(vImg,
    function(a) {
        f.push('<img src="http://mat1.gtimg.com/www/mb/images/' + a + '">')
    });
    UI.each(vImg2,
    function(a) {
        f.push('<img src="http://mat1.gtimg.com/www/mb/img/' + a + '">')
    });
    setTimeout(function() {
        g.innerHTML = f.join("");
        UI.append(g, document.body)
    },
    1E3);
    setTimeout(function() {
        var a = UI.DC("script");
        UI.A(a, "id", "l_qq_com");
        UI.A(a, "arguments", "{'extension_js_src':'http://adsrich.qq.com/web/crystal/v1.8Beta06Build060/crystal_ext-min.js','lview_time_out':10,'mo_page_ratio':0,'mo_ping_ratio':0.01,'mo_ping_script':'http://adsrich.qq.com/sc/mo_ping-min.js'}");
        a.src = "http://adsrich.qq.com/web/crystal/v1.8Beta08Build085/crystal-min.js";
        UI.append(a, document.body)
    },
    100);
    var c = $("u"),
    i = $("wb_tips"),
    j = $("p"),
    h = $("verifycode");
    c && "" != c.value && UI.hide(i);
    i = [];
    c && i.push(c);
    j && i.push(j);
    h && i.push(h);
    UI.each(i,
    function(b) {
        UI.EA(b, "focus",
        function() {
            a(b, 0)
        });
        UI.EA(b, "blur",
        function() {
            a(b, 1)
        })
    })
});
function mb_quick_reg(a, b) {
    MI.dialog.show({
        title: "微博登录",
        end: function() {},
        html: '<iframe src="http://mini.t.qq.com/mblogin_quick.htm" frameborder="0" scrolling="no" width="571" height="187" id="QuickLoginFrame"></iframe>',
        width: 620
    });
    Bos("btnPortalQuickLogin", b)
}
function mb_quick_reg_call() {
    MI.dialog.hide();
    MI.card && MI.card.account ? location.href = "http://t.qq.com/" + MI.card.account: location.reload()
}
window._ || (window._ = function(a) {
    if (1 == arguments.length) return a;
    var b = Array.prototype.slice.call(arguments, 1);
    return a.replace(/\{(\d+)\}/g,
    function(a, c) {
        return b[c]
    })
});
Speed = function(a, b, d, c, e) {
    if (a && Math.random() < b) Speed.pic.src = "http://qos.report.qq.com/collect?type=1&name=" + a + "&1=" + (d || 0) + "&2=" + (c || 0) + "&3=" + (e || 0) + "&4=0&5=0"
};
Speed.pic = new Image;
MI.random = function(a) {
    return parseInt((new Date).getTime() / (a || 1))
};
MI.string = MI.string || {};
MI.string.id = function(a) {
    return (a = a.match(/[^\/]+$/g)) && a[0] ? a[0].replace("#M", "") : ""
};
MI.string.account = function(a) {
    return (a = a.match(/@[^@]+$/g)) && a[0] ? a[0].slice(1, -1) : ""
};
MI.string.length = function(a) {
    var b = a.match(/[^\x00-\x80]/g);
    return a.length + (b ? b.length: 0)
};
MI.string.cut = function(a, b, d) {
    var d = UI.isUndefined(d) ? "...": d,
    c = [],
    e = "";
    if (MI.string.length(a) > b) {
        for (var a = a.split(""), e = 0, f = a.length; e < f; e++) if (b > 0) {
            c.push(a[e]);
            b = b - MI.string.length(a[e])
        } else break;
        e = c.join("") + d
    } else e = a;
    return e
};
MI.TalkListUpdate = function(a) {
    var b = this;
    b._body = $(a.id) || a.id;
    b.list = [];
    b.cache = {};
    for (var d in a) b[d] = a[d];
    UI.each(b._body.childNodes,
    function(a) {
        b.cache[a.id] = 1
    });
    b.hoverStop && (UI.EA(b._body, "mouseover",
    function() {
        b.stop = 1
    }), UI.EA(b._body, "mouseout",
    function() {
        b.stop = 0
    }));
    b.load()
};
MI.TalkListUpdate.prototype = {
    cache: [],
    time: 5E3,
    timer: null,
    method: "post",
    listCallBack: null,
    liCallBack: null,
    callback: function() {},
    interfaceCallBack: null,
    stop: 0,
    hoverStop: 0,
    speed: 0.2,
    num: 5,
    counter: 0,
    max: 5,
    tmpl: "",
    heightHack: null,
    show: function() {
        var a = this;
        if (!a.stop) {
            var b = a.list[0],
            d = !1;
            b && (a.list.splice(0, 1), a.cache[b.id] && (d = !0));
            if (b && !d) {
                a.cache[b.id] = 1;
                a.listCallBack && (b = a.listCallBack(b));
                var c = UI.html((new UI.tmplString(a.tmpl))(b))[0];
                UI.prepend(c, a._body);
                a.liCallBack && a.liCallBack(c);
                b = UI.height(c);
                UI.C(c, "height", 0);
                UI.C(c, "opacity", 0);
                UI.isNumber(a.heightHack) || (a.heightHack = parseInt(UI.C(c, "paddingTop")) + parseInt(UI.C(c, "paddingBottom")));
                UI.animate(c, "height", b - a.heightHack,
                function() {
                    a._body.childNodes.length > a.num && UI.remove(a._body.lastChild);
                    UI.animate(c, "opacity", 1,
                    function() {
                        c.style.cssText = ""
                    },
                    a.speed, 30);
                    UI.C(c, "height", "auto")
                },
                a.speed, 20);
                a.callback()
            }
            a.counter++;
            a.list.length < a.num && a.counter >= a.max && a.load()
        }
    },
    load: function() {
        var a = this;
        a.counter = 0;
        MI.ajax({
            url: a.url,
            type: a.method,
            data: a.param ? a.param: {},
            success: function(b) {
                b = MI.json(b);
                if (0 == b.result) {
                    var d = [],
                    c;
                    for (c in b.info.talk) a.cache[b.info.talk[c].id] || d.push(b.info.talk[c]);
                    a.list = d.concat(a.list);
                    a.timer || setTimeout(function() {
                        a.show();
                        a.timer = setInterval(function() {
                            a.show()
                        },
                        a.time)
                    },
                    1E3)
                }
                a.interfaceCallBack && a.interfaceCallBack(b)
            }
        })
    }
};
/*version:100586*/
/*  |xGv00|b0f2d4cbe84c957cce0c165bbd429eb5 */
