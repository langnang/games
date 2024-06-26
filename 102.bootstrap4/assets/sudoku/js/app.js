/*! sudoku-jso-0.2.4 (21-07-2015) */
!function (a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document)
      throw new Error("jQuery requires a window with a document");
    return b(a)
  }
    : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
  function c(a) {
    var b = a.length
      , c = aa.type(a);
    return "function" === c || aa.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  function d(a, b, c) {
    if (aa.isFunction(b))
      return aa.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c
      });
    if (b.nodeType)
      return aa.grep(a, function (a) {
        return a === b !== c
      });
    if ("string" == typeof b) {
      if (ha.test(b))
        return aa.filter(b, a, c);
      b = aa.filter(b, a)
    }
    return aa.grep(a, function (a) {
      return U.call(b, a) >= 0 !== c
    })
  }
  function e(a, b) {
    for (; (a = a[b]) && 1 !== a.nodeType;)
      ;
    return a
  }
  function f(a) {
    var b = oa[a] = {};
    return aa.each(a.match(na) || [], function (a, c) {
      b[c] = !0
    }),
      b
  }
  function g() {
    $.removeEventListener("DOMContentLoaded", g, !1),
      a.removeEventListener("load", g, !1),
      aa.ready()
  }
  function h() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {}
      }
    }),
      this.expando = aa.expando + Math.random()
  }
  function i(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType)
      if (d = "data-" + b.replace(ua, "-$1").toLowerCase(),
        c = a.getAttribute(d),
        "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ta.test(c) ? aa.parseJSON(c) : c
        } catch (e) { }
        sa.set(a, b, c)
      } else
        c = void 0;
    return c
  }
  function j() {
    return !0
  }
  function k() {
    return !1
  }
  function l() {
    try {
      return $.activeElement
    } catch (a) { }
  }
  function m(a, b) {
    return aa.nodeName(a, "table") && aa.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }
  function n(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type,
      a
  }
  function o(a) {
    var b = Ka.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"),
      a
  }
  function p(a, b) {
    for (var c = 0, d = a.length; d > c; c++)
      ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
  }
  function q(a, b) {
    var c, d, e, f, g, h, i, j;
    if (1 === b.nodeType) {
      if (ra.hasData(a) && (f = ra.access(a),
        g = ra.set(b, f),
        j = f.events)) {
        delete g.handle,
          g.events = {};
        for (e in j)
          for (c = 0,
            d = j[e].length; d > c; c++)
            aa.event.add(b, e, j[e][c])
      }
      sa.hasData(a) && (h = sa.access(a),
        i = aa.extend({}, h),
        sa.set(b, i))
    }
  }
  function r(a, b) {
    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && aa.nodeName(a, b) ? aa.merge([a], c) : c
  }
  function s(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && ya.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
  }
  function t(b, c) {
    var d = aa(c.createElement(b)).appendTo(c.body)
      , e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : aa.css(d[0], "display");
    return d.detach(),
      e
  }
  function u(a) {
    var b = $
      , c = Oa[a];
    return c || (c = t(a, b),
      "none" !== c && c || (Na = (Na || aa("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
        b = Na[0].contentDocument,
        b.write(),
        b.close(),
        c = t(a, b),
        Na.detach()),
      Oa[a] = c),
      c
  }
  function v(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ra(a),
      c && (g = c.getPropertyValue(b) || c[b]),
      c && ("" !== g || aa.contains(a.ownerDocument, a) || (g = aa.style(a, b)),
        Qa.test(g) && Pa.test(b) && (d = h.width,
          e = h.minWidth,
          f = h.maxWidth,
          h.minWidth = h.maxWidth = h.width = g,
          g = c.width,
          h.width = d,
          h.minWidth = e,
          h.maxWidth = f)),
      void 0 !== g ? g + "" : g
  }
  function w(a, b) {
    return {
      get: function () {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }
  function x(a, b) {
    if (b in a)
      return b;
    for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--;)
      if (b = Xa[e] + c,
        b in a)
        return b;
    return d
  }
  function y(a, b, c) {
    var d = Ta.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }
  function z(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
      "margin" === c && (g += aa.css(a, c + wa[f], !0, e)),
        d ? ("content" === c && (g -= aa.css(a, "padding" + wa[f], !0, e)),
          "margin" !== c && (g -= aa.css(a, "border" + wa[f] + "Width", !0, e))) : (g += aa.css(a, "padding" + wa[f], !0, e),
            "padding" !== c && (g += aa.css(a, "border" + wa[f] + "Width", !0, e)));
    return g
  }
  function A(a, b, c) {
    var d = !0
      , e = "width" === b ? a.offsetWidth : a.offsetHeight
      , f = Ra(a)
      , g = "border-box" === aa.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = v(a, b, f),
        (0 > e || null == e) && (e = a.style[b]),
        Qa.test(e))
        return e;
      d = g && (Z.boxSizingReliable() || e === a.style[b]),
        e = parseFloat(e) || 0
    }
    return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }
  function B(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
      d = a[g],
        d.style && (f[g] = ra.get(d, "olddisplay"),
          c = d.style.display,
          b ? (f[g] || "none" !== c || (d.style.display = ""),
            "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : f[g] || (e = xa(d),
              (c && "none" !== c || !e) && ra.set(d, "olddisplay", e ? c : aa.css(d, "display"))));
    for (g = 0; h > g; g++)
      d = a[g],
        d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }
  function C(a, b, c, d, e) {
    return new C.prototype.init(a, b, c, d, e)
  }
  function D() {
    return setTimeout(function () {
      Ya = void 0
    }),
      Ya = aa.now()
  }
  function E(a, b) {
    var c, d = 0, e = {
      height: a
    };
    for (b = b ? 1 : 0; 4 > d; d += 2 - b)
      c = wa[d],
        e["margin" + c] = e["padding" + c] = a;
    return b && (e.opacity = e.width = a),
      e
  }
  function F(a, b, c) {
    for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a))
        return d
  }
  function G(a, b, c) {
    var d, e, f, g, h, i, j, k = this, l = {}, m = a.style, n = a.nodeType && xa(a), o = ra.get(a, "fxshow");
    c.queue || (h = aa._queueHooks(a, "fx"),
      null == h.unqueued && (h.unqueued = 0,
        i = h.empty.fire,
        h.empty.fire = function () {
          h.unqueued || i()
        }
      ),
      h.unqueued++,
      k.always(function () {
        k.always(function () {
          h.unqueued--,
            aa.queue(a, "fx").length || h.empty.fire()
        })
      })),
      1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY],
        j = aa.css(a, "display"),
        "none" === j && (j = u(a.nodeName)),
        "inline" === j && "none" === aa.css(a, "float") && (m.display = "inline-block")),
      c.overflow && (m.overflow = "hidden",
        k.always(function () {
          m.overflow = c.overflow[0],
            m.overflowX = c.overflow[1],
            m.overflowY = c.overflow[2]
        }));
    for (d in b)
      if (e = b[d],
        $a.exec(e)) {
        if (delete b[d],
          f = f || "toggle" === e,
          e === (n ? "hide" : "show")) {
          if ("show" !== e || !o || void 0 === o[d])
            continue;
          n = !0
        }
        l[d] = o && o[d] || aa.style(a, d)
      }
    if (!aa.isEmptyObject(l)) {
      o ? "hidden" in o && (n = o.hidden) : o = ra.access(a, "fxshow", {}),
        f && (o.hidden = !n),
        n ? aa(a).show() : k.done(function () {
          aa(a).hide()
        }),
        k.done(function () {
          var b;
          ra.remove(a, "fxshow");
          for (b in l)
            aa.style(a, b, l[b])
        });
      for (d in l)
        g = F(n ? o[d] : 0, d, k),
          d in o || (o[d] = g.start,
            n && (g.end = g.start,
              g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }
  function H(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = aa.camelCase(c),
        e = b[d],
        f = a[c],
        aa.isArray(f) && (e = f[1],
          f = a[c] = f[0]),
        c !== d && (a[d] = f,
          delete a[c]),
        g = aa.cssHooks[d],
        g && "expand" in g) {
        f = g.expand(f),
          delete a[d];
        for (c in f)
          c in a || (a[c] = f[c],
            b[c] = e)
      } else
        b[d] = e
  }
  function I(a, b, c) {
    var d, e, f = 0, g = bb.length, h = aa.Deferred().always(function () {
      delete i.elem
    }), i = function () {
      if (e)
        return !1;
      for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
        j.tweens[g].run(f);
      return h.notifyWith(a, [j, f, c]),
        1 > f && i ? c : (h.resolveWith(a, [j]),
          !1)
    }, j = h.promise({
      elem: a,
      props: aa.extend({}, b),
      opts: aa.extend(!0, {
        specialEasing: {}
      }, c),
      originalProperties: b,
      originalOptions: c,
      startTime: Ya || D(),
      duration: c.duration,
      tweens: [],
      createTween: function (b, c) {
        var d = aa.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
        return j.tweens.push(d),
          d
      },
      stop: function (b) {
        var c = 0
          , d = b ? j.tweens.length : 0;
        if (e)
          return this;
        for (e = !0; d > c; c++)
          j.tweens[c].run(1);
        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
          this
      }
    }), k = j.props;
    for (H(k, j.opts.specialEasing); g > f; f++)
      if (d = bb[f].call(j, a, k, j.opts))
        return d;
    return aa.map(k, F, j),
      aa.isFunction(j.opts.start) && j.opts.start.call(a, j),
      aa.fx.timer(aa.extend(i, {
        elem: a,
        anim: j,
        queue: j.opts.queue
      })),
      j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  function J(a) {
    return function (b, c) {
      "string" != typeof b && (c = b,
        b = "*");
      var d, e = 0, f = b.toLowerCase().match(na) || [];
      if (aa.isFunction(c))
        for (; d = f[e++];)
          "+" === d[0] ? (d = d.slice(1) || "*",
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }
  function K(a, b, c, d) {
    function e(h) {
      var i;
      return f[h] = !0,
        aa.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
            e(j),
            !1)
        }),
        i
    }
    var f = {}
      , g = a === vb;
    return e(b.dataTypes[0]) || !f["*"] && e("*")
  }
  function L(a, b) {
    var c, d, e = aa.ajaxSettings.flatOptions || {};
    for (c in b)
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    return d && aa.extend(!0, a, d),
      a
  }
  function M(a, b, c) {
    for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];)
      i.shift(),
        void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    if (d)
      for (e in h)
        if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break
        }
    if (i[0] in c)
      f = i[0];
    else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break
        }
        g || (g = e)
      }
      f = f || g
    }
    return f ? (f !== i[0] && i.unshift(f),
      c[f]) : void 0
  }
  function N(a, b, c, d) {
    var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters)
        j[g.toLowerCase()] = a.converters[g];
    for (f = k.shift(); f;)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b),
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        i = f,
        f = k.shift())
        if ("*" === f)
          f = i;
        else if ("*" !== i && i !== f) {
          if (g = j[i + " " + f] || j["* " + f],
            !g)
            for (e in j)
              if (h = e.split(" "),
                h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0],
                  k.unshift(h[1]));
                break
              }
          if (g !== !0)
            if (g && a["throws"])
              b = g(b);
            else
              try {
                b = g(b)
              } catch (l) {
                return {
                  state: "parsererror",
                  error: g ? l : "No conversion from " + i + " to " + f
                }
              }
        }
    return {
      state: "success",
      data: b
    }
  }
  function O(a, b, c, d) {
    var e;
    if (aa.isArray(b))
      aa.each(b, function (b, e) {
        c || zb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
      });
    else if (c || "object" !== aa.type(b))
      d(a, b);
    else
      for (e in b)
        O(a + "[" + e + "]", b[e], c, d)
  }
  function P(a) {
    return aa.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
  }
  var Q = []
    , R = Q.slice
    , S = Q.concat
    , T = Q.push
    , U = Q.indexOf
    , V = {}
    , W = V.toString
    , X = V.hasOwnProperty
    , Y = "".trim
    , Z = {}
    , $ = a.document
    , _ = "2.1.0"
    , aa = function (a, b) {
      return new aa.fn.init(a, b)
    }
    , ba = /^-ms-/
    , ca = /-([\da-z])/gi
    , da = function (a, b) {
      return b.toUpperCase()
    };
  aa.fn = aa.prototype = {
    jquery: _,
    constructor: aa,
    selector: "",
    length: 0,
    toArray: function () {
      return R.call(this)
    },
    get: function (a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
    },
    pushStack: function (a) {
      var b = aa.merge(this.constructor(), a);
      return b.prevObject = this,
        b.context = this.context,
        b
    },
    each: function (a, b) {
      return aa.each(this, a, b)
    },
    map: function (a) {
      return this.pushStack(aa.map(this, function (b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function () {
      return this.pushStack(R.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (a) {
      var b = this.length
        , c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function () {
      return this.prevObject || this.constructor(null)
    },
    push: T,
    sort: Q.sort,
    splice: Q.splice
  },
    aa.extend = aa.fn.extend = function () {
      var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
      for ("boolean" == typeof g && (j = g,
        g = arguments[h] || {},
        h++),
        "object" == typeof g || aa.isFunction(g) || (g = {}),
        h === i && (g = this,
          h--); i > h; h++)
        if (null != (a = arguments[h]))
          for (b in a)
            c = g[b],
              d = a[b],
              g !== d && (j && d && (aa.isPlainObject(d) || (e = aa.isArray(d))) ? (e ? (e = !1,
                f = c && aa.isArray(c) ? c : []) : f = c && aa.isPlainObject(c) ? c : {},
                g[b] = aa.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      return g
    }
    ,
    aa.extend({
      expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (a) {
        throw new Error(a)
      },
      noop: function () { },
      isFunction: function (a) {
        return "function" === aa.type(a)
      },
      isArray: Array.isArray,
      isWindow: function (a) {
        return null != a && a === a.window
      },
      isNumeric: function (a) {
        return a - parseFloat(a) >= 0
      },
      isPlainObject: function (a) {
        if ("object" !== aa.type(a) || a.nodeType || aa.isWindow(a))
          return !1;
        try {
          if (a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf"))
            return !1
        } catch (b) {
          return !1
        }
        return !0
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a)
          return !1;
        return !0
      },
      type: function (a) {
        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
      },
      globalEval: function (a) {
        var b, c = eval;
        a = aa.trim(a),
          a && (1 === a.indexOf("use strict") ? (b = $.createElement("script"),
            b.text = a,
            $.head.appendChild(b).parentNode.removeChild(b)) : c(a))
      },
      camelCase: function (a) {
        return a.replace(ba, "ms-").replace(ca, da)
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
      },
      each: function (a, b, d) {
        var e, f = 0, g = a.length, h = c(a);
        if (d) {
          if (h)
            for (; g > f && (e = b.apply(a[f], d),
              e !== !1); f++)
              ;
          else
            for (f in a)
              if (e = b.apply(a[f], d),
                e === !1)
                break
        } else if (h)
          for (; g > f && (e = b.call(a[f], f, a[f]),
            e !== !1); f++)
            ;
        else
          for (f in a)
            if (e = b.call(a[f], f, a[f]),
              e === !1)
              break;
        return a
      },
      trim: function (a) {
        return null == a ? "" : Y.call(a)
      },
      makeArray: function (a, b) {
        var d = b || [];
        return null != a && (c(Object(a)) ? aa.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)),
          d
      },
      inArray: function (a, b, c) {
        return null == b ? -1 : U.call(b, a, c)
      },
      merge: function (a, b) {
        for (var c = +b.length, d = 0, e = a.length; c > d; d++)
          a[e++] = b[d];
        return a.length = e,
          a
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
          d = !b(a[f], f),
            d !== h && e.push(a[f]);
        return e
      },
      map: function (a, b, d) {
        var e, f = 0, g = a.length, h = c(a), i = [];
        if (h)
          for (; g > f; f++)
            e = b(a[f], f, d),
              null != e && i.push(e);
        else
          for (f in a)
            e = b(a[f], f, d),
              null != e && i.push(e);
        return S.apply([], i)
      },
      guid: 1,
      proxy: function (a, b) {
        var c, d, e;
        return "string" == typeof b && (c = a[b],
          b = a,
          a = c),
          aa.isFunction(a) ? (d = R.call(arguments, 2),
            e = function () {
              return a.apply(b || this, d.concat(R.call(arguments)))
            }
            ,
            e.guid = a.guid = a.guid || aa.guid++,
            e) : void 0
      },
      now: Date.now,
      support: Z
    }),
    aa.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
      V["[object " + b + "]"] = b.toLowerCase()
    });
  var ea = function (a) {
    function b(a, b, c, d) {
      var e, f, g, h, i, j, l, o, p, q;
      if ((b ? b.ownerDocument || b : O) !== G && F(b),
        b = b || G,
        c = c || [],
        !a || "string" != typeof a)
        return c;
      if (1 !== (h = b.nodeType) && 9 !== h)
        return [];
      if (I && !d) {
        if (e = sa.exec(a))
          if (g = e[1]) {
            if (9 === h) {
              if (f = b.getElementById(g),
                !f || !f.parentNode)
                return c;
              if (f.id === g)
                return c.push(f),
                  c
            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)
              return c.push(f),
                c
          } else {
            if (e[2])
              return _.apply(c, b.getElementsByTagName(a)),
                c;
            if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName)
              return _.apply(c, b.getElementsByClassName(g)),
                c
          }
        if (x.qsa && (!J || !J.test(a))) {
          if (o = l = N,
            p = b,
            q = 9 === h && a,
            1 === h && "object" !== b.nodeName.toLowerCase()) {
            for (j = m(a),
              (l = b.getAttribute("id")) ? o = l.replace(ua, "\\$&") : b.setAttribute("id", o),
              o = "[id='" + o + "'] ",
              i = j.length; i--;)
              j[i] = o + n(j[i]);
            p = ta.test(a) && k(b.parentNode) || b,
              q = j.join(",")
          }
          if (q)
            try {
              return _.apply(c, p.querySelectorAll(q)),
                c
            } catch (r) { } finally {
              l || b.removeAttribute("id")
            }
        }
      }
      return v(a.replace(ia, "$1"), b, c, d)
    }
    function c() {
      function a(c, d) {
        return b.push(c + " ") > y.cacheLength && delete a[b.shift()],
          a[c + " "] = d
      }
      var b = [];
      return a
    }
    function d(a) {
      return a[N] = !0,
        a
    }
    function e(a) {
      var b = G.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b),
          b = null
      }
    }
    function f(a, b) {
      for (var c = a.split("|"), d = a.length; d--;)
        y.attrHandle[c[d]] = b
    }
    function g(a, b) {
      var c = b && a
        , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
      if (d)
        return d;
      if (c)
        for (; c = c.nextSibling;)
          if (c === b)
            return -1;
      return a ? 1 : -1
    }
    function h(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }
    function i(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }
    function j(a) {
      return d(function (b) {
        return b = +b,
          d(function (c, d) {
            for (var e, f = a([], c.length, b), g = f.length; g--;)
              c[e = f[g]] && (c[e] = !(d[e] = c[e]))
          })
      })
    }
    function k(a) {
      return a && typeof a.getElementsByTagName !== V && a
    }
    function l() { }
    function m(a, c) {
      var d, e, f, g, h, i, j, k = S[a + " "];
      if (k)
        return c ? 0 : k.slice(0);
      for (h = a,
        i = [],
        j = y.preFilter; h;) {
        (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h),
          i.push(f = [])),
          d = !1,
          (e = ka.exec(h)) && (d = e.shift(),
            f.push({
              value: d,
              type: e[0].replace(ia, " ")
            }),
            h = h.slice(d.length));
        for (g in y.filter)
          !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(),
            f.push({
              value: d,
              type: g,
              matches: e
            }),
            h = h.slice(d.length));
        if (!d)
          break
      }
      return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
    }
    function n(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++)
        d += a[b].value;
      return d
    }
    function o(a, b, c) {
      var d = b.dir
        , e = c && "parentNode" === d
        , f = Q++;
      return b.first ? function (b, c, f) {
        for (; b = b[d];)
          if (1 === b.nodeType || e)
            return a(b, c, f)
      }
        : function (b, c, g) {
          var h, i, j = [P, f];
          if (g) {
            for (; b = b[d];)
              if ((1 === b.nodeType || e) && a(b, c, g))
                return !0
          } else
            for (; b = b[d];)
              if (1 === b.nodeType || e) {
                if (i = b[N] || (b[N] = {}),
                  (h = i[d]) && h[0] === P && h[1] === f)
                  return j[2] = h[2];
                if (i[d] = j,
                  j[2] = a(b, c, g))
                  return !0
              }
        }
    }
    function p(a) {
      return a.length > 1 ? function (b, c, d) {
        for (var e = a.length; e--;)
          if (!a[e](b, c, d))
            return !1;
        return !0
      }
        : a[0]
    }
    function q(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f),
          j && b.push(h));
      return g
    }
    function r(a, b, c, e, f, g) {
      return e && !e[N] && (e = r(e)),
        f && !f[N] && (f = r(f, g)),
        d(function (d, g, h, i) {
          var j, k, l, m = [], n = [], o = g.length, p = d || u(b || "*", h.nodeType ? [h] : h, []), r = !a || !d && b ? p : q(p, m, a, h, i), s = c ? f || (d ? a : o || e) ? [] : g : r;
          if (c && c(r, s, h, i),
            e)
            for (j = q(s, n),
              e(j, [], h, i),
              k = j.length; k--;)
              (l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
          if (d) {
            if (f || a) {
              if (f) {
                for (j = [],
                  k = s.length; k--;)
                  (l = s[k]) && j.push(r[k] = l);
                f(null, s = [], j, i)
              }
              for (k = s.length; k--;)
                (l = s[k]) && (j = f ? ba.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
            }
          } else
            s = q(s === g ? s.splice(o, s.length) : s),
              f ? f(null, g, s, i) : _.apply(g, s)
        })
    }
    function s(a) {
      for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = o(function (a) {
        return a === b
      }, g, !0), j = o(function (a) {
        return ba.call(b, a) > -1
      }, g, !0), k = [function (a, c, d) {
        return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
      }
      ]; e > h; h++)
        if (c = y.relative[a[h].type])
          k = [o(p(k), c)];
        else {
          if (c = y.filter[a[h].type].apply(null, a[h].matches),
            c[N]) {
            for (d = ++h; e > d && !y.relative[a[d].type]; d++)
              ;
            return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
              value: " " === a[h - 2].type ? "*" : ""
            })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
          }
          k.push(c)
        }
      return p(k)
    }
    function t(a, c) {
      var e = c.length > 0
        , f = a.length > 0
        , g = function (d, g, h, i, j) {
          var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && y.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
          for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
            if (f && k) {
              for (l = 0; m = a[l++];)
                if (m(k, g, h)) {
                  i.push(k);
                  break
                }
              j && (P = u)
            }
            e && ((k = !m && k) && n--,
              d && p.push(k))
          }
          if (n += o,
            e && o !== n) {
            for (l = 0; m = c[l++];)
              m(p, r, g, h);
            if (d) {
              if (n > 0)
                for (; o--;)
                  p[o] || r[o] || (r[o] = Z.call(i));
              r = q(r)
            }
            _.apply(i, r),
              j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
          }
          return j && (P = u,
            C = s),
            p
        };
      return e ? d(g) : g
    }
    function u(a, c, d) {
      for (var e = 0, f = c.length; f > e; e++)
        b(a, c[e], d);
      return d
    }
    function v(a, b, c, d) {
      var e, f, g, h, i, j = m(a);
      if (!d && 1 === j.length) {
        if (f = j[0] = j[0].slice(0),
          f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && y.relative[f[1].type]) {
          if (b = (y.find.ID(g.matches[0].replace(va, wa), b) || [])[0],
            !b)
            return c;
          a = a.slice(f.shift().value.length)
        }
        for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e],
          !y.relative[h = g.type]);)
          if ((i = y.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
            if (f.splice(e, 1),
              a = d.length && n(f),
              !a)
              return _.apply(c, d),
                c;
            break
          }
      }
      return B(a, j)(d, b, !I, c, ta.test(a) && k(b.parentNode) || b),
        c
    }
    var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date, O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function (a, b) {
      return a === b && (E = !0),
        0
    }, V = "undefined", W = 1 << 31, X = {}.hasOwnProperty, Y = [], Z = Y.pop, $ = Y.push, _ = Y.push, aa = Y.slice, ba = Y.indexOf || function (a) {
      for (var b = 0, c = this.length; c > b; b++)
        if (this[b] === a)
          return b;
      return -1
    }
      , ca = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", da = "[\\x20\\t\\r\\n\\f]", ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", fa = ea.replace("w", "w#"), ga = "\\[" + da + "*(" + ea + ")" + da + "*(?:([*^$|!~]?=)" + da + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fa + ")|)|)" + da + "*\\]", ha = ":(" + ea + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ga.replace(3, 8) + ")*)|.*)\\)|)", ia = new RegExp("^" + da + "+|((?:^|[^\\\\])(?:\\\\.)*)" + da + "+$", "g"), ja = new RegExp("^" + da + "*," + da + "*"), ka = new RegExp("^" + da + "*([>+~]|" + da + ")" + da + "*"), la = new RegExp("=" + da + "*([^\\]'\"]*?)" + da + "*\\]", "g"), ma = new RegExp(ha), na = new RegExp("^" + fa + "$"), oa = {
        ID: new RegExp("^#(" + ea + ")"),
        CLASS: new RegExp("^\\.(" + ea + ")"),
        TAG: new RegExp("^(" + ea.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + ga),
        PSEUDO: new RegExp("^" + ha),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + da + "*(even|odd|(([+-]|)(\\d*)n|)" + da + "*(?:([+-]|)" + da + "*(\\d+)|))" + da + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + ca + ")$", "i"),
        needsContext: new RegExp("^" + da + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + da + "*((?:-\\d)?\\d*)" + da + "*\\)|)(?=[^-]|$)", "i")
      }, pa = /^(?:input|select|textarea|button)$/i, qa = /^h\d$/i, ra = /^[^{]+\{\s*\[native \w/, sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ta = /[+~]/, ua = /'|\\/g, va = new RegExp("\\\\([\\da-f]{1,6}" + da + "?|(" + da + ")|.)", "ig"), wa = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      };
    try {
      _.apply(Y = aa.call(O.childNodes), O.childNodes),
        Y[O.childNodes.length].nodeType
    } catch (xa) {
      _ = {
        apply: Y.length ? function (a, b) {
          $.apply(a, aa.call(b))
        }
          : function (a, b) {
            for (var c = a.length, d = 0; a[c++] = b[d++];)
              ;
            a.length = c - 1
          }
      }
    }
    x = b.support = {},
      A = b.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? "HTML" !== b.nodeName : !1
      }
      ,
      F = b.setDocument = function (a) {
        var b, c = a ? a.ownerDocument || a : O, d = c.defaultView;
        return c !== G && 9 === c.nodeType && c.documentElement ? (G = c,
          H = c.documentElement,
          I = !A(c),
          d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
            F()
          }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
            F()
          })),
          x.attributes = e(function (a) {
            return a.className = "i",
              !a.getAttribute("className")
          }),
          x.getElementsByTagName = e(function (a) {
            return a.appendChild(c.createComment("")),
              !a.getElementsByTagName("*").length
          }),
          x.getElementsByClassName = ra.test(c.getElementsByClassName) && e(function (a) {
            return a.innerHTML = "<div class='a'></div><div class='a i'></div>",
              a.firstChild.className = "i",
              2 === a.getElementsByClassName("i").length
          }),
          x.getById = e(function (a) {
            return H.appendChild(a).id = N,
              !c.getElementsByName || !c.getElementsByName(N).length
          }),
          x.getById ? (y.find.ID = function (a, b) {
            if (typeof b.getElementById !== V && I) {
              var c = b.getElementById(a);
              return c && c.parentNode ? [c] : []
            }
          }
            ,
            y.filter.ID = function (a) {
              var b = a.replace(va, wa);
              return function (a) {
                return a.getAttribute("id") === b
              }
            }
          ) : (delete y.find.ID,
            y.filter.ID = function (a) {
              var b = a.replace(va, wa);
              return function (a) {
                var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                return c && c.value === b
              }
            }
          ),
          y.find.TAG = x.getElementsByTagName ? function (a, b) {
            return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
          }
            : function (a, b) {
              var c, d = [], e = 0, f = b.getElementsByTagName(a);
              if ("*" === a) {
                for (; c = f[e++];)
                  1 === c.nodeType && d.push(c);
                return d
              }
              return f
            }
          ,
          y.find.CLASS = x.getElementsByClassName && function (a, b) {
            return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
          }
          ,
          K = [],
          J = [],
          (x.qsa = ra.test(c.querySelectorAll)) && (e(function (a) {
            a.innerHTML = "<select t=''><option selected=''></option></select>",
              a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + da + "*(?:''|\"\")"),
              a.querySelectorAll("[selected]").length || J.push("\\[" + da + "*(?:value|" + ca + ")"),
              a.querySelectorAll(":checked").length || J.push(":checked")
          }),
            e(function (a) {
              var b = c.createElement("input");
              b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("name", "D"),
                a.querySelectorAll("[name=d]").length && J.push("name" + da + "*[*^$|!~]?="),
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                J.push(",.*:")
            })),
          (x.matchesSelector = ra.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
            x.disconnectedMatch = L.call(a, "div"),
              L.call(a, "[s!='']:x"),
              K.push("!=", ha)
          }),
          J = J.length && new RegExp(J.join("|")),
          K = K.length && new RegExp(K.join("|")),
          b = ra.test(H.compareDocumentPosition),
          M = b || ra.test(H.contains) ? function (a, b) {
            var c = 9 === a.nodeType ? a.documentElement : a
              , d = b && b.parentNode;
            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
          }
            : function (a, b) {
              if (b)
                for (; b = b.parentNode;)
                  if (b === a)
                    return !0;
              return !1
            }
          ,
          U = b ? function (a, b) {
            if (a === b)
              return E = !0,
                0;
            var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
            return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
              1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0 : 4 & d ? -1 : 1)
          }
            : function (a, b) {
              if (a === b)
                return E = !0,
                  0;
              var d, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
              if (!f || !h)
                return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0;
              if (f === h)
                return g(a, b);
              for (d = a; d = d.parentNode;)
                i.unshift(d);
              for (d = b; d = d.parentNode;)
                j.unshift(d);
              for (; i[e] === j[e];)
                e++;
              return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }
          ,
          c) : G
      }
      ,
      b.matches = function (a, c) {
        return b(a, null, null, c)
      }
      ,
      b.matchesSelector = function (a, c) {
        if ((a.ownerDocument || a) !== G && F(a),
          c = c.replace(la, "='$1']"),
          !(!x.matchesSelector || !I || K && K.test(c) || J && J.test(c)))
          try {
            var d = L.call(a, c);
            if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType)
              return d
          } catch (e) { }
        return b(c, G, null, [a]).length > 0
      }
      ,
      b.contains = function (a, b) {
        return (a.ownerDocument || a) !== G && F(a),
          M(a, b)
      }
      ,
      b.attr = function (a, b) {
        (a.ownerDocument || a) !== G && F(a);
        var c = y.attrHandle[b.toLowerCase()]
          , d = c && X.call(y.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
        return void 0 !== d ? d : x.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }
      ,
      b.error = function (a) {
        throw new Error("Syntax error, unrecognized expression: " + a)
      }
      ,
      b.uniqueSort = function (a) {
        var b, c = [], d = 0, e = 0;
        if (E = !x.detectDuplicates,
          D = !x.sortStable && a.slice(0),
          a.sort(U),
          E) {
          for (; b = a[e++];)
            b === a[e] && (d = c.push(e));
          for (; d--;)
            a.splice(c[d], 1)
        }
        return D = null,
          a
      }
      ,
      z = b.getText = function (a) {
        var b, c = "", d = 0, e = a.nodeType;
        if (e) {
          if (1 === e || 9 === e || 11 === e) {
            if ("string" == typeof a.textContent)
              return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling)
              c += z(a)
          } else if (3 === e || 4 === e)
            return a.nodeValue
        } else
          for (; b = a[d++];)
            c += z(b);
        return c
      }
      ,
      y = b.selectors = {
        cacheLength: 50,
        createPseudo: d,
        match: oa,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function (a) {
            return a[1] = a[1].replace(va, wa),
              a[3] = (a[4] || a[5] || "").replace(va, wa),
              "~=" === a[2] && (a[3] = " " + a[3] + " "),
              a.slice(0, 4)
          },
          CHILD: function (a) {
            return a[1] = a[1].toLowerCase(),
              "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
              a
          },
          PSEUDO: function (a) {
            var b, c = !a[5] && a[2];
            return oa.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && ma.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
              a[2] = c.slice(0, b)),
              a.slice(0, 3))
          }
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(va, wa).toLowerCase();
            return "*" === a ? function () {
              return !0
            }
              : function (a) {
                return a.nodeName && a.nodeName.toLowerCase() === b
              }
          },
          CLASS: function (a) {
            var b = R[a + " "];
            return b || (b = new RegExp("(^|" + da + ")" + a + "(" + da + "|$)")) && R(a, function (a) {
              return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
            })
          },
          ATTR: function (a, c, d) {
            return function (e) {
              var f = b.attr(e, a);
              return null == f ? "!=" === c : c ? (f += "",
                "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
            }
          },
          CHILD: function (a, b, c, d, e) {
            var f = "nth" !== a.slice(0, 3)
              , g = "last" !== a.slice(-4)
              , h = "of-type" === b;
            return 1 === d && 0 === e ? function (a) {
              return !!a.parentNode
            }
              : function (b, c, i) {
                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                if (q) {
                  if (f) {
                    for (; p;) {
                      for (l = b; l = l[p];)
                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                          return !1;
                      o = p = "only" === a && !o && "nextSibling"
                    }
                    return !0
                  }
                  if (o = [g ? q.firstChild : q.lastChild],
                    g && s) {
                    for (k = q[N] || (q[N] = {}),
                      j = k[a] || [],
                      n = j[0] === P && j[1],
                      m = j[0] === P && j[2],
                      l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                      if (1 === l.nodeType && ++m && l === b) {
                        k[a] = [P, n, m];
                        break
                      }
                  } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)
                    m = j[1];
                  else
                    for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]),
                      l !== b));)
                      ;
                  return m -= e,
                    m === d || m % d === 0 && m / d >= 0
                }
              }
          },
          PSEUDO: function (a, c) {
            var e, f = y.pseudos[a] || y.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
            return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c],
              y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                for (var d, e = f(a, c), g = e.length; g--;)
                  d = ba.call(a, e[g]),
                    a[d] = !(b[d] = e[g])
              }) : function (a) {
                return f(a, 0, e)
              }
            ) : f
          }
        },
        pseudos: {
          not: d(function (a) {
            var b = []
              , c = []
              , e = B(a.replace(ia, "$1"));
            return e[N] ? d(function (a, b, c, d) {
              for (var f, g = e(a, null, d, []), h = a.length; h--;)
                (f = g[h]) && (a[h] = !(b[h] = f))
            }) : function (a, d, f) {
              return b[0] = a,
                e(b, null, f, c),
                !c.pop()
            }
          }),
          has: d(function (a) {
            return function (c) {
              return b(a, c).length > 0
            }
          }),
          contains: d(function (a) {
            return function (b) {
              return (b.textContent || b.innerText || z(b)).indexOf(a) > -1
            }
          }),
          lang: d(function (a) {
            return na.test(a || "") || b.error("unsupported lang: " + a),
              a = a.replace(va, wa).toLowerCase(),
              function (b) {
                var c;
                do
                  if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                    return c = c.toLowerCase(),
                      c === a || 0 === c.indexOf(a + "-");
                while ((b = b.parentNode) && 1 === b.nodeType);
                return !1
              }
          }),
          target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id
          },
          root: function (a) {
            return a === H
          },
          focus: function (a) {
            return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
          },
          enabled: function (a) {
            return a.disabled === !1
          },
          disabled: function (a) {
            return a.disabled === !0
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && !!a.checked || "option" === b && !!a.selected
          },
          selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex,
              a.selected === !0
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)
              if (a.nodeType < 6)
                return !1;
            return !0
          },
          parent: function (a) {
            return !y.pseudos.empty(a)
          },
          header: function (a) {
            return qa.test(a.nodeName)
          },
          input: function (a) {
            return pa.test(a.nodeName)
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "button" === a.type || "button" === b
          },
          text: function (a) {
            var b;
            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
          },
          first: j(function () {
            return [0]
          }),
          last: j(function (a, b) {
            return [b - 1]
          }),
          eq: j(function (a, b, c) {
            return [0 > c ? c + b : c]
          }),
          even: j(function (a, b) {
            for (var c = 0; b > c; c += 2)
              a.push(c);
            return a
          }),
          odd: j(function (a, b) {
            for (var c = 1; b > c; c += 2)
              a.push(c);
            return a
          }),
          lt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0;)
              a.push(d);
            return a
          }),
          gt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b;)
              a.push(d);
            return a
          })
        }
      },
      y.pseudos.nth = y.pseudos.eq;
    for (w in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    })
      y.pseudos[w] = h(w);
    for (w in {
      submit: !0,
      reset: !0
    })
      y.pseudos[w] = i(w);
    return l.prototype = y.filters = y.pseudos,
      y.setFilters = new l,
      B = b.compile = function (a, b) {
        var c, d = [], e = [], f = T[a + " "];
        if (!f) {
          for (b || (b = m(a)),
            c = b.length; c--;)
            f = s(b[c]),
              f[N] ? d.push(f) : e.push(f);
          f = T(a, t(e, d))
        }
        return f
      }
      ,
      x.sortStable = N.split("").sort(U).join("") === N,
      x.detectDuplicates = !!E,
      F(),
      x.sortDetached = e(function (a) {
        return 1 & a.compareDocumentPosition(G.createElement("div"))
      }),
      e(function (a) {
        return a.innerHTML = "<a href='#'></a>",
          "#" === a.firstChild.getAttribute("href")
      }) || f("type|href|height|width", function (a, b, c) {
        return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
      }),
      x.attributes && e(function (a) {
        return a.innerHTML = "<input/>",
          a.firstChild.setAttribute("value", ""),
          "" === a.firstChild.getAttribute("value")
      }) || f("value", function (a, b, c) {
        return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
      }),
      e(function (a) {
        return null == a.getAttribute("disabled")
      }) || f(ca, function (a, b, c) {
        var d;
        return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }),
      b
  }(a);
  aa.find = ea,
    aa.expr = ea.selectors,
    aa.expr[":"] = aa.expr.pseudos,
    aa.unique = ea.uniqueSort,
    aa.text = ea.getText,
    aa.isXMLDoc = ea.isXML,
    aa.contains = ea.contains;
  var fa = aa.expr.match.needsContext
    , ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
    , ha = /^.[^:#\[\.,]*$/;
  aa.filter = function (a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"),
      1 === b.length && 1 === d.nodeType ? aa.find.matchesSelector(d, a) ? [d] : [] : aa.find.matches(a, aa.grep(b, function (a) {
        return 1 === a.nodeType
      }))
  }
    ,
    aa.fn.extend({
      find: function (a) {
        var b, c = this.length, d = [], e = this;
        if ("string" != typeof a)
          return this.pushStack(aa(a).filter(function () {
            for (b = 0; c > b; b++)
              if (aa.contains(e[b], this))
                return !0
          }));
        for (b = 0; c > b; b++)
          aa.find(a, e[b], d);
        return d = this.pushStack(c > 1 ? aa.unique(d) : d),
          d.selector = this.selector ? this.selector + " " + a : a,
          d
      },
      filter: function (a) {
        return this.pushStack(d(this, a || [], !1))
      },
      not: function (a) {
        return this.pushStack(d(this, a || [], !0))
      },
      is: function (a) {
        return !!d(this, "string" == typeof a && fa.test(a) ? aa(a) : a || [], !1).length
      }
    });
  var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ka = aa.fn.init = function (a, b) {
    var c, d;
    if (!a)
      return this;
    if ("string" == typeof a) {
      if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a),
        !c || !c[1] && b)
        return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
      if (c[1]) {
        if (b = b instanceof aa ? b[0] : b,
          aa.merge(this, aa.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : $, !0)),
          ga.test(c[1]) && aa.isPlainObject(b))
          for (c in b)
            aa.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
        return this
      }
      return d = $.getElementById(c[2]),
        d && d.parentNode && (this.length = 1,
          this[0] = d),
        this.context = $,
        this.selector = a,
        this
    }
    return a.nodeType ? (this.context = this[0] = a,
      this.length = 1,
      this) : aa.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(aa) : (void 0 !== a.selector && (this.selector = a.selector,
        this.context = a.context),
        aa.makeArray(a, this))
  }
    ;
  ka.prototype = aa.fn,
    ia = aa($);
  var la = /^(?:parents|prev(?:Until|All))/
    , ma = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  aa.extend({
    dir: function (a, b, c) {
      for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType;)
        if (1 === a.nodeType) {
          if (e && aa(a).is(c))
            break;
          d.push(a)
        }
      return d
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c
    }
  }),
    aa.fn.extend({
      has: function (a) {
        var b = aa(a, this)
          , c = b.length;
        return this.filter(function () {
          for (var a = 0; c > a; a++)
            if (aa.contains(this, b[a]))
              return !0
        })
      },
      closest: function (a, b) {
        for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? aa(a, b || this.context) : 0; e > d; d++)
          for (c = this[d]; c && c !== b; c = c.parentNode)
            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && aa.find.matchesSelector(c, a))) {
              f.push(c);
              break
            }
        return this.pushStack(f.length > 1 ? aa.unique(f) : f)
      },
      index: function (a) {
        return a ? "string" == typeof a ? U.call(aa(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      },
      add: function (a, b) {
        return this.pushStack(aa.unique(aa.merge(this.get(), aa(a, b))))
      },
      addBack: function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
      }
    }),
    aa.each({
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
      },
      parents: function (a) {
        return aa.dir(a, "parentNode")
      },
      parentsUntil: function (a, b, c) {
        return aa.dir(a, "parentNode", c)
      },
      next: function (a) {
        return e(a, "nextSibling")
      },
      prev: function (a) {
        return e(a, "previousSibling")
      },
      nextAll: function (a) {
        return aa.dir(a, "nextSibling")
      },
      prevAll: function (a) {
        return aa.dir(a, "previousSibling")
      },
      nextUntil: function (a, b, c) {
        return aa.dir(a, "nextSibling", c)
      },
      prevUntil: function (a, b, c) {
        return aa.dir(a, "previousSibling", c)
      },
      siblings: function (a) {
        return aa.sibling((a.parentNode || {}).firstChild, a)
      },
      children: function (a) {
        return aa.sibling(a.firstChild)
      },
      contents: function (a) {
        return a.contentDocument || aa.merge([], a.childNodes)
      }
    }, function (a, b) {
      aa.fn[a] = function (c, d) {
        var e = aa.map(this, b, c);
        return "Until" !== a.slice(-5) && (d = c),
          d && "string" == typeof d && (e = aa.filter(d, e)),
          this.length > 1 && (ma[a] || aa.unique(e),
            la.test(a) && e.reverse()),
          this.pushStack(e)
      }
    });
  var na = /\S+/g
    , oa = {};
  aa.Callbacks = function (a) {
    a = "string" == typeof a ? oa[a] || f(a) : aa.extend({}, a);
    var b, c, d, e, g, h, i = [], j = !a.once && [], k = function (f) {
      for (b = a.memory && f,
        c = !0,
        h = e || 0,
        e = 0,
        g = i.length,
        d = !0; i && g > h; h++)
        if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
          b = !1;
          break
        }
      d = !1,
        i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
    }, l = {
      add: function () {
        if (i) {
          var c = i.length;
          !function f(b) {
            aa.each(b, function (b, c) {
              var d = aa.type(c);
              "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
            })
          }(arguments),
            d ? g = i.length : b && (e = c,
              k(b))
        }
        return this
      },
      remove: function () {
        return i && aa.each(arguments, function (a, b) {
          for (var c; (c = aa.inArray(b, i, c)) > -1;)
            i.splice(c, 1),
              d && (g >= c && g--,
                h >= c && h--)
        }),
          this
      },
      has: function (a) {
        return a ? aa.inArray(a, i) > -1 : !(!i || !i.length)
      },
      empty: function () {
        return i = [],
          g = 0,
          this
      },
      disable: function () {
        return i = j = b = void 0,
          this
      },
      disabled: function () {
        return !i
      },
      lock: function () {
        return j = void 0,
          b || l.disable(),
          this
      },
      locked: function () {
        return !j
      },
      fireWith: function (a, b) {
        return !i || c && !j || (b = b || [],
          b = [a, b.slice ? b.slice() : b],
          d ? j.push(b) : k(b)),
          this
      },
      fire: function () {
        return l.fireWith(this, arguments),
          this
      },
      fired: function () {
        return !!c
      }
    };
    return l
  }
    ,
    aa.extend({
      Deferred: function (a) {
        var b = [["resolve", "done", aa.Callbacks("once memory"), "resolved"], ["reject", "fail", aa.Callbacks("once memory"), "rejected"], ["notify", "progress", aa.Callbacks("memory")]]
          , c = "pending"
          , d = {
            state: function () {
              return c
            },
            always: function () {
              return e.done(arguments).fail(arguments),
                this
            },
            then: function () {
              var a = arguments;
              return aa.Deferred(function (c) {
                aa.each(b, function (b, f) {
                  var g = aa.isFunction(a[b]) && a[b];
                  e[f[1]](function () {
                    var a = g && g.apply(this, arguments);
                    a && aa.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                  })
                }),
                  a = null
              }).promise()
            },
            promise: function (a) {
              return null != a ? aa.extend(a, d) : d
            }
          }
          , e = {};
        return d.pipe = d.then,
          aa.each(b, function (a, f) {
            var g = f[2]
              , h = f[3];
            d[f[1]] = g.add,
              h && g.add(function () {
                c = h
              }, b[1 ^ a][2].disable, b[2][2].lock),
              e[f[0]] = function () {
                return e[f[0] + "With"](this === e ? d : this, arguments),
                  this
              }
              ,
              e[f[0] + "With"] = g.fireWith
          }),
          d.promise(e),
          a && a.call(e, e),
          e
      },
      when: function (a) {
        var b, c, d, e = 0, f = R.call(arguments), g = f.length, h = 1 !== g || a && aa.isFunction(a.promise) ? g : 0, i = 1 === h ? a : aa.Deferred(), j = function (a, c, d) {
          return function (e) {
            c[a] = this,
              d[a] = arguments.length > 1 ? R.call(arguments) : e,
              d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
          }
        };
        if (g > 1)
          for (b = new Array(g),
            c = new Array(g),
            d = new Array(g); g > e; e++)
            f[e] && aa.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
        return h || i.resolveWith(d, f),
          i.promise()
      }
    });
  var pa;
  aa.fn.ready = function (a) {
    return aa.ready.promise().done(a),
      this
  }
    ,
    aa.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? aa.readyWait++ : aa.ready(!0)
      },
      ready: function (a) {
        (a === !0 ? --aa.readyWait : aa.isReady) || (aa.isReady = !0,
          a !== !0 && --aa.readyWait > 0 || (pa.resolveWith($, [aa]),
            aa.fn.trigger && aa($).trigger("ready").off("ready")))
      }
    }),
    aa.ready.promise = function (b) {
      return pa || (pa = aa.Deferred(),
        "complete" === $.readyState ? setTimeout(aa.ready) : ($.addEventListener("DOMContentLoaded", g, !1),
          a.addEventListener("load", g, !1))),
        pa.promise(b)
    }
    ,
    aa.ready.promise();
  var qa = aa.access = function (a, b, c, d, e, f, g) {
    var h = 0
      , i = a.length
      , j = null == c;
    if ("object" === aa.type(c)) {
      e = !0;
      for (h in c)
        aa.access(a, b, h, c[h], !0, f, g)
    } else if (void 0 !== d && (e = !0,
      aa.isFunction(d) || (g = !0),
      j && (g ? (b.call(a, d),
        b = null) : (j = b,
          b = function (a, b, c) {
            return j.call(aa(a), c)
          }
      )),
      b))
      for (; i > h; h++)
        b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
  }
    ;
  aa.acceptData = function (a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
  }
    ,
    h.uid = 1,
    h.accepts = aa.acceptData,
    h.prototype = {
      key: function (a) {
        if (!h.accepts(a))
          return 0;
        var b = {}
          , c = a[this.expando];
        if (!c) {
          c = h.uid++;
          try {
            b[this.expando] = {
              value: c
            },
              Object.defineProperties(a, b)
          } catch (d) {
            b[this.expando] = c,
              aa.extend(a, b)
          }
        }
        return this.cache[c] || (this.cache[c] = {}),
          c
      },
      set: function (a, b, c) {
        var d, e = this.key(a), f = this.cache[e];
        if ("string" == typeof b)
          f[b] = c;
        else if (aa.isEmptyObject(f))
          aa.extend(this.cache[e], b);
        else
          for (d in b)
            f[d] = b[d];
        return f
      },
      get: function (a, b) {
        var c = this.cache[this.key(a)];
        return void 0 === b ? c : c[b]
      },
      access: function (a, b, c) {
        var d;
        return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b),
          void 0 !== d ? d : this.get(a, aa.camelCase(b))) : (this.set(a, b, c),
            void 0 !== c ? c : b)
      },
      remove: function (a, b) {
        var c, d, e, f = this.key(a), g = this.cache[f];
        if (void 0 === b)
          this.cache[f] = {};
        else {
          aa.isArray(b) ? d = b.concat(b.map(aa.camelCase)) : (e = aa.camelCase(b),
            b in g ? d = [b, e] : (d = e,
              d = d in g ? [d] : d.match(na) || [])),
            c = d.length;
          for (; c--;)
            delete g[d[c]]
        }
      },
      hasData: function (a) {
        return !aa.isEmptyObject(this.cache[a[this.expando]] || {})
      },
      discard: function (a) {
        a[this.expando] && delete this.cache[a[this.expando]]
      }
    };
  var ra = new h
    , sa = new h
    , ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
    , ua = /([A-Z])/g;
  aa.extend({
    hasData: function (a) {
      return sa.hasData(a) || ra.hasData(a)
    },
    data: function (a, b, c) {
      return sa.access(a, b, c)
    },
    removeData: function (a, b) {
      sa.remove(a, b)
    },
    _data: function (a, b, c) {
      return ra.access(a, b, c)
    },
    _removeData: function (a, b) {
      ra.remove(a, b)
    }
  }),
    aa.fn.extend({
      data: function (a, b) {
        var c, d, e, f = this[0], g = f && f.attributes;
        if (void 0 === a) {
          if (this.length && (e = sa.get(f),
            1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
            for (c = g.length; c--;)
              d = g[c].name,
                0 === d.indexOf("data-") && (d = aa.camelCase(d.slice(5)),
                  i(f, d, e[d]));
            ra.set(f, "hasDataAttrs", !0)
          }
          return e
        }
        return "object" == typeof a ? this.each(function () {
          sa.set(this, a)
        }) : qa(this, function (b) {
          var c, d = aa.camelCase(a);
          if (f && void 0 === b) {
            if (c = sa.get(f, a),
              void 0 !== c)
              return c;
            if (c = sa.get(f, d),
              void 0 !== c)
              return c;
            if (c = i(f, d, void 0),
              void 0 !== c)
              return c
          } else
            this.each(function () {
              var c = sa.get(this, d);
              sa.set(this, d, b),
                -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b)
            })
        }, null, b, arguments.length > 1, null, !0)
      },
      removeData: function (a) {
        return this.each(function () {
          sa.remove(this, a)
        })
      }
    }),
    aa.extend({
      queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue",
          d = ra.get(a, b),
          c && (!d || aa.isArray(c) ? d = ra.access(a, b, aa.makeArray(c)) : d.push(c)),
          d || []) : void 0
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var c = aa.queue(a, b)
          , d = c.length
          , e = c.shift()
          , f = aa._queueHooks(a, b)
          , g = function () {
            aa.dequeue(a, b)
          };
        "inprogress" === e && (e = c.shift(),
          d--),
          e && ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
          !d && f && f.empty.fire()
      },
      _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return ra.get(a, c) || ra.access(a, c, {
          empty: aa.Callbacks("once memory").add(function () {
            ra.remove(a, [b + "queue", c])
          })
        })
      }
    }),
    aa.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return "string" != typeof a && (b = a,
          a = "fx",
          c--),
          arguments.length < c ? aa.queue(this[0], a) : void 0 === b ? this : this.each(function () {
            var c = aa.queue(this, a, b);
            aa._queueHooks(this, a),
              "fx" === a && "inprogress" !== c[0] && aa.dequeue(this, a)
          })
      },
      dequeue: function (a) {
        return this.each(function () {
          aa.dequeue(this, a)
        })
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", [])
      },
      promise: function (a, b) {
        var c, d = 1, e = aa.Deferred(), f = this, g = this.length, h = function () {
          --d || e.resolveWith(f, [f])
        };
        for ("string" != typeof a && (b = a,
          a = void 0),
          a = a || "fx"; g--;)
          c = ra.get(f[g], a + "queueHooks"),
            c && c.empty && (d++,
              c.empty.add(h));
        return h(),
          e.promise(b)
      }
    });
  var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
    , wa = ["Top", "Right", "Bottom", "Left"]
    , xa = function (a, b) {
      return a = b || a,
        "none" === aa.css(a, "display") || !aa.contains(a.ownerDocument, a)
    }
    , ya = /^(?:checkbox|radio)$/i;
  !function () {
    var a = $.createDocumentFragment()
      , b = a.appendChild($.createElement("div"));
    b.innerHTML = "<input type='radio' checked='checked' name='t'/>",
      Z.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked,
      b.innerHTML = "<textarea>x</textarea>",
      Z.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
  }();
  var za = "undefined";
  Z.focusinBubbles = "onfocusin" in a;
  var Aa = /^key/
    , Ba = /^(?:mouse|contextmenu)|click/
    , Ca = /^(?:focusinfocus|focusoutblur)$/
    , Da = /^([^.]*)(?:\.(.+)|)$/;
  aa.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
      if (q)
        for (c.handler && (f = c,
          c = f.handler,
          e = f.selector),
          c.guid || (c.guid = aa.guid++),
          (i = q.events) || (i = q.events = {}),
          (g = q.handle) || (g = q.handle = function (b) {
            return typeof aa !== za && aa.event.triggered !== b.type ? aa.event.dispatch.apply(a, arguments) : void 0
          }
          ),
          b = (b || "").match(na) || [""],
          j = b.length; j--;)
          h = Da.exec(b[j]) || [],
            n = p = h[1],
            o = (h[2] || "").split(".").sort(),
            n && (l = aa.event.special[n] || {},
              n = (e ? l.delegateType : l.bindType) || n,
              l = aa.event.special[n] || {},
              k = aa.extend({
                type: n,
                origType: p,
                data: d,
                handler: c,
                guid: c.guid,
                selector: e,
                needsContext: e && aa.expr.match.needsContext.test(e),
                namespace: o.join(".")
              }, f),
              (m = i[n]) || (m = i[n] = [],
                m.delegateCount = 0,
                l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)),
              l.add && (l.add.call(a, k),
                k.handler.guid || (k.handler.guid = c.guid)),
              e ? m.splice(m.delegateCount++, 0, k) : m.push(k),
              aa.event.global[n] = !0)
    },
    remove: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
      if (q && (i = q.events)) {
        for (b = (b || "").match(na) || [""],
          j = b.length; j--;)
          if (h = Da.exec(b[j]) || [],
            n = p = h[1],
            o = (h[2] || "").split(".").sort(),
            n) {
            for (l = aa.event.special[n] || {},
              n = (d ? l.delegateType : l.bindType) || n,
              m = i[n] || [],
              h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
              g = f = m.length; f--;)
              k = m[f],
                !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1),
                  k.selector && m.delegateCount--,
                  l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || aa.removeEvent(a, n, q.handle),
              delete i[n])
          } else
            for (n in i)
              aa.event.remove(a, n + b[j], c, d, !0);
        aa.isEmptyObject(i) && (delete q.handle,
          ra.remove(a, "events"))
      }
    },
    trigger: function (b, c, d, e) {
      var f, g, h, i, j, k, l, m = [d || $], n = X.call(b, "type") ? b.type : b, o = X.call(b, "namespace") ? b.namespace.split(".") : [];
      if (g = h = d = d || $,
        3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + aa.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."),
          n = o.shift(),
          o.sort()),
          j = n.indexOf(":") < 0 && "on" + n,
          b = b[aa.expando] ? b : new aa.Event(n, "object" == typeof b && b),
          b.isTrigger = e ? 2 : 3,
          b.namespace = o.join("."),
          b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
          b.result = void 0,
          b.target || (b.target = d),
          c = null == c ? [b] : aa.makeArray(c, [b]),
          l = aa.event.special[n] || {},
          e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
        if (!e && !l.noBubble && !aa.isWindow(d)) {
          for (i = l.delegateType || n,
            Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode)
            m.push(g),
              h = g;
          h === (d.ownerDocument || $) && m.push(h.defaultView || h.parentWindow || a)
        }
        for (f = 0; (g = m[f++]) && !b.isPropagationStopped();)
          b.type = f > 1 ? i : l.bindType || n,
            k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"),
            k && k.apply(g, c),
            k = j && g[j],
            k && k.apply && aa.acceptData(g) && (b.result = k.apply(g, c),
              b.result === !1 && b.preventDefault());
        return b.type = n,
          e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !aa.acceptData(d) || j && aa.isFunction(d[n]) && !aa.isWindow(d) && (h = d[j],
            h && (d[j] = null),
            aa.event.triggered = n,
            d[n](),
            aa.event.triggered = void 0,
            h && (d[j] = h)),
          b.result
      }
    },
    dispatch: function (a) {
      a = aa.event.fix(a);
      var b, c, d, e, f, g = [], h = R.call(arguments), i = (ra.get(this, "events") || {})[a.type] || [], j = aa.event.special[a.type] || {};
      if (h[0] = a,
        a.delegateTarget = this,
        !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
        for (g = aa.event.handlers.call(this, a, i),
          b = 0; (e = g[b++]) && !a.isPropagationStopped();)
          for (a.currentTarget = e.elem,
            c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)
            (!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f,
              a.data = f.data,
              d = ((aa.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h),
              void 0 !== d && (a.result = d) === !1 && (a.preventDefault(),
                a.stopPropagation()));
        return j.postDispatch && j.postDispatch.call(this, a),
          a.result
      }
    },
    handlers: function (a, b) {
      var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i !== this; i = i.parentNode || this)
          if (i.disabled !== !0 || "click" !== a.type) {
            for (d = [],
              c = 0; h > c; c++)
              f = b[c],
                e = f.selector + " ",
                void 0 === d[e] && (d[e] = f.needsContext ? aa(e, this).index(i) >= 0 : aa.find(e, this, null, [i]).length),
                d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            })
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }),
        g
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
          a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, b) {
        var c, d, e, f = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || $,
          d = c.documentElement,
          e = c.body,
          a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0),
          a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)),
          a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
          a
      }
    },
    fix: function (a) {
      if (a[aa.expando])
        return a;
      var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
      for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}),
        d = g.props ? this.props.concat(g.props) : this.props,
        a = new aa.Event(f),
        b = d.length; b--;)
        c = d[b],
          a[c] = f[c];
      return a.target || (a.target = $),
        3 === a.target.nodeType && (a.target = a.target.parentNode),
        g.filter ? g.filter(a, f) : a
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function () {
          return this !== l() && this.focus ? (this.focus(),
            !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function () {
          return this === l() && this.blur ? (this.blur(),
            !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function () {
          return "checkbox" === this.type && this.click && aa.nodeName(this, "input") ? (this.click(),
            !1) : void 0
        },
        _default: function (a) {
          return aa.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && (a.originalEvent.returnValue = a.result)
        }
      }
    },
    simulate: function (a, b, c, d) {
      var e = aa.extend(new aa.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? aa.event.trigger(e, null, b) : aa.event.dispatch.call(b, e),
        e.isDefaultPrevented() && c.preventDefault()
    }
  },
    aa.removeEvent = function (a, b, c) {
      a.removeEventListener && a.removeEventListener(b, c, !1)
    }
    ,
    aa.Event = function (a, b) {
      return this instanceof aa.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.getPreventDefault && a.getPreventDefault() ? j : k) : this.type = a,
        b && aa.extend(this, b),
        this.timeStamp = a && a.timeStamp || aa.now(),
        void (this[aa.expando] = !0)) : new aa.Event(a, b)
    }
    ,
    aa.Event.prototype = {
      isDefaultPrevented: k,
      isPropagationStopped: k,
      isImmediatePropagationStopped: k,
      preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = j,
          a && a.preventDefault && a.preventDefault()
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = j,
          a && a.stopPropagation && a.stopPropagation()
      },
      stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = j,
          this.stopPropagation()
      }
    },
    aa.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    }, function (a, b) {
      aa.event.special[a] = {
        delegateType: b,
        bindType: b,
        handle: function (a) {
          var c, d = this, e = a.relatedTarget, f = a.handleObj;
          return (!e || e !== d && !aa.contains(d, e)) && (a.type = f.origType,
            c = f.handler.apply(this, arguments),
            a.type = b),
            c
        }
      }
    }),
    Z.focusinBubbles || aa.each({
      focus: "focusin",
      blur: "focusout"
    }, function (a, b) {
      var c = function (a) {
        aa.event.simulate(b, a.target, aa.event.fix(a), !0)
      };
      aa.event.special[b] = {
        setup: function () {
          var d = this.ownerDocument || this
            , e = ra.access(d, b);
          e || d.addEventListener(a, c, !0),
            ra.access(d, b, (e || 0) + 1)
        },
        teardown: function () {
          var d = this.ownerDocument || this
            , e = ra.access(d, b) - 1;
          e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0),
            ra.remove(d, b))
        }
      }
    }),
    aa.fn.extend({
      on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
          "string" != typeof b && (c = c || b,
            b = void 0);
          for (g in a)
            this.on(g, b, c, a[g], e);
          return this
        }
        if (null == c && null == d ? (d = b,
          c = b = void 0) : null == d && ("string" == typeof b ? (d = c,
            c = void 0) : (d = c,
              c = b,
              b = void 0)),
          d === !1)
          d = k;
        else if (!d)
          return this;
        return 1 === e && (f = d,
          d = function (a) {
            return aa().off(a),
              f.apply(this, arguments)
          }
          ,
          d.guid = f.guid || (f.guid = aa.guid++)),
          this.each(function () {
            aa.event.add(this, a, d, c, b)
          })
      },
      one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj)
          return d = a.handleObj,
            aa(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
            this;
        if ("object" == typeof a) {
          for (e in a)
            this.off(e, b, a[e]);
          return this
        }
        return (b === !1 || "function" == typeof b) && (c = b,
          b = void 0),
          c === !1 && (c = k),
          this.each(function () {
            aa.event.remove(this, a, c, b)
          })
      },
      trigger: function (a, b) {
        return this.each(function () {
          aa.event.trigger(a, b, this)
        })
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? aa.event.trigger(a, b, c, !0) : void 0
      }
    });
  var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
    , Fa = /<([\w:]+)/
    , Ga = /<|&#?\w+;/
    , Ha = /<(?:script|style|link)/i
    , Ia = /checked\s*(?:[^=]|=\s*.checked.)/i
    , Ja = /^$|\/(?:java|ecma)script/i
    , Ka = /^true\/(.*)/
    , La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
    , Ma = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  Ma.optgroup = Ma.option,
    Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead,
    Ma.th = Ma.td,
    aa.extend({
      clone: function (a, b, c) {
        var d, e, f, g, h = a.cloneNode(!0), i = aa.contains(a.ownerDocument, a);
        if (!(Z.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || aa.isXMLDoc(a)))
          for (g = r(h),
            f = r(a),
            d = 0,
            e = f.length; e > d; d++)
            s(f[d], g[d]);
        if (b)
          if (c)
            for (f = f || r(a),
              g = g || r(h),
              d = 0,
              e = f.length; e > d; d++)
              q(f[d], g[d]);
          else
            q(a, h);
        return g = r(h, "script"),
          g.length > 0 && p(g, !i && r(a, "script")),
          h
      },
      buildFragment: function (a, b, c, d) {
        for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
          if (e = a[m],
            e || 0 === e)
            if ("object" === aa.type(e))
              aa.merge(l, e.nodeType ? [e] : e);
            else if (Ga.test(e)) {
              for (f = f || k.appendChild(b.createElement("div")),
                g = (Fa.exec(e) || ["", ""])[1].toLowerCase(),
                h = Ma[g] || Ma._default,
                f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2],
                j = h[0]; j--;)
                f = f.lastChild;
              aa.merge(l, f.childNodes),
                f = k.firstChild,
                f.textContent = ""
            } else
              l.push(b.createTextNode(e));
        for (k.textContent = "",
          m = 0; e = l[m++];)
          if ((!d || -1 === aa.inArray(e, d)) && (i = aa.contains(e.ownerDocument, e),
            f = r(k.appendChild(e), "script"),
            i && p(f),
            c))
            for (j = 0; e = f[j++];)
              Ja.test(e.type || "") && c.push(e);
        return k
      },
      cleanData: function (a) {
        for (var b, c, d, e, f, g, h = aa.event.special, i = 0; void 0 !== (c = a[i]); i++) {
          if (aa.acceptData(c) && (f = c[ra.expando],
            f && (b = ra.cache[f]))) {
            if (d = Object.keys(b.events || {}),
              d.length)
              for (g = 0; void 0 !== (e = d[g]); g++)
                h[e] ? aa.event.remove(c, e) : aa.removeEvent(c, e, b.handle);
            ra.cache[f] && delete ra.cache[f]
          }
          delete sa.cache[c[sa.expando]]
        }
      }
    }),
    aa.fn.extend({
      text: function (a) {
        return qa(this, function (a) {
          return void 0 === a ? aa.text(this) : this.empty().each(function () {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
          })
        }, null, a, arguments.length)
      },
      append: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = m(this, a);
            b.appendChild(a)
          }
        })
      },
      prepend: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = m(this, a);
            b.insertBefore(a, b.firstChild)
          }
        })
      },
      before: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this)
        })
      },
      after: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
        })
      },
      remove: function (a, b) {
        for (var c, d = a ? aa.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
          b || 1 !== c.nodeType || aa.cleanData(r(c)),
            c.parentNode && (b && aa.contains(c.ownerDocument, c) && p(r(c, "script")),
              c.parentNode.removeChild(c));
        return this
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++)
          1 === a.nodeType && (aa.cleanData(r(a, !1)),
            a.textContent = "");
        return this
      },
      clone: function (a, b) {
        return a = null == a ? !1 : a,
          b = null == b ? a : b,
          this.map(function () {
            return aa.clone(this, a, b)
          })
      },
      html: function (a) {
        return qa(this, function (a) {
          var b = this[0] || {}
            , c = 0
            , d = this.length;
          if (void 0 === a && 1 === b.nodeType)
            return b.innerHTML;
          if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
            a = a.replace(Ea, "<$1></$2>");
            try {
              for (; d > c; c++)
                b = this[c] || {},
                  1 === b.nodeType && (aa.cleanData(r(b, !1)),
                    b.innerHTML = a);
              b = 0
            } catch (e) { }
          }
          b && this.empty().append(a)
        }, null, a, arguments.length)
      },
      replaceWith: function () {
        var a = arguments[0];
        return this.domManip(arguments, function (b) {
          a = this.parentNode,
            aa.cleanData(r(this)),
            a && a.replaceChild(b, this)
        }),
          a && (a.length || a.nodeType) ? this : this.remove()
      },
      detach: function (a) {
        return this.remove(a, !0)
      },
      domManip: function (a, b) {
        a = S.apply([], a);
        var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], p = aa.isFunction(m);
        if (p || j > 1 && "string" == typeof m && !Z.checkClone && Ia.test(m))
          return this.each(function (c) {
            var d = k.eq(c);
            p && (a[0] = m.call(this, c, d.html())),
              d.domManip(a, b)
          });
        if (j && (c = aa.buildFragment(a, this[0].ownerDocument, !1, this),
          d = c.firstChild,
          1 === c.childNodes.length && (c = d),
          d)) {
          for (e = aa.map(r(c, "script"), n),
            f = e.length; j > i; i++)
            g = c,
              i !== l && (g = aa.clone(g, !0, !0),
                f && aa.merge(e, r(g, "script"))),
              b.call(this[i], g, i);
          if (f)
            for (h = e[e.length - 1].ownerDocument,
              aa.map(e, o),
              i = 0; f > i; i++)
              g = e[i],
                Ja.test(g.type || "") && !ra.access(g, "globalEval") && aa.contains(h, g) && (g.src ? aa._evalUrl && aa._evalUrl(g.src) : aa.globalEval(g.textContent.replace(La, "")))
        }
        return this
      }
    }),
    aa.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function (a, b) {
      aa.fn[a] = function (a) {
        for (var c, d = [], e = aa(a), f = e.length - 1, g = 0; f >= g; g++)
          c = g === f ? this : this.clone(!0),
            aa(e[g])[b](c),
            T.apply(d, c.get());
        return this.pushStack(d)
      }
    });
  var Na, Oa = {}, Pa = /^margin/, Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"), Ra = function (a) {
    return a.ownerDocument.defaultView.getComputedStyle(a, null)
  };
  !function () {
    function b() {
      h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",
        f.appendChild(g);
      var b = a.getComputedStyle(h, null);
      c = "1%" !== b.top,
        d = "4px" === b.width,
        f.removeChild(g)
    }
    var c, d, e = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", f = $.documentElement, g = $.createElement("div"), h = $.createElement("div");
    h.style.backgroundClip = "content-box",
      h.cloneNode(!0).style.backgroundClip = "",
      Z.clearCloneStyle = "content-box" === h.style.backgroundClip,
      g.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
      g.appendChild(h),
      a.getComputedStyle && aa.extend(Z, {
        pixelPosition: function () {
          return b(),
            c
        },
        boxSizingReliable: function () {
          return null == d && b(),
            d
        },
        reliableMarginRight: function () {
          var b, c = h.appendChild($.createElement("div"));
          return c.style.cssText = h.style.cssText = e,
            c.style.marginRight = c.style.width = "0",
            h.style.width = "1px",
            f.appendChild(g),
            b = !parseFloat(a.getComputedStyle(c, null).marginRight),
            f.removeChild(g),
            h.innerHTML = "",
            b
        }
      })
  }(),
    aa.swap = function (a, b, c, d) {
      var e, f, g = {};
      for (f in b)
        g[f] = a.style[f],
          a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b)
        a.style[f] = g[f];
      return e
    }
    ;
  var Sa = /^(none|table(?!-c[ea]).+)/
    , Ta = new RegExp("^(" + va + ")(.*)$", "i")
    , Ua = new RegExp("^([+-])=(" + va + ")", "i")
    , Va = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }
    , Wa = {
      letterSpacing: 0,
      fontWeight: 400
    }
    , Xa = ["Webkit", "O", "Moz", "ms"];
  aa.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = v(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = aa.camelCase(b), i = a.style;
        return b = aa.cssProps[h] || (aa.cssProps[h] = x(i, h)),
          g = aa.cssHooks[b] || aa.cssHooks[h],
          void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c,
            "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(aa.css(a, b)),
              f = "number"),
            void (null != c && c === c && ("number" !== f || aa.cssNumber[h] || (c += "px"),
              Z.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
              g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = "",
                i[b] = c))))
      }
    },
    css: function (a, b, c, d) {
      var e, f, g, h = aa.camelCase(b);
      return b = aa.cssProps[h] || (aa.cssProps[h] = x(a.style, h)),
        g = aa.cssHooks[b] || aa.cssHooks[h],
        g && "get" in g && (e = g.get(a, !0, c)),
        void 0 === e && (e = v(a, b, d)),
        "normal" === e && b in Wa && (e = Wa[b]),
        "" === c || c ? (f = parseFloat(e),
          c === !0 || aa.isNumeric(f) ? f || 0 : e) : e
    }
  }),
    aa.each(["height", "width"], function (a, b) {
      aa.cssHooks[b] = {
        get: function (a, c, d) {
          return c ? 0 === a.offsetWidth && Sa.test(aa.css(a, "display")) ? aa.swap(a, Va, function () {
            return A(a, b, d)
          }) : A(a, b, d) : void 0
        },
        set: function (a, c, d) {
          var e = d && Ra(a);
          return y(a, c, d ? z(a, b, d, "border-box" === aa.css(a, "boxSizing", !1, e), e) : 0)
        }
      }
    }),
    aa.cssHooks.marginRight = w(Z.reliableMarginRight, function (a, b) {
      return b ? aa.swap(a, {
        display: "inline-block"
      }, v, [a, "marginRight"]) : void 0
    }),
    aa.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function (a, b) {
      aa.cssHooks[a + b] = {
        expand: function (c) {
          for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
            e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
          return e
        }
      },
        Pa.test(a) || (aa.cssHooks[a + b].set = y)
    }),
    aa.fn.extend({
      css: function (a, b) {
        return qa(this, function (a, b, c) {
          var d, e, f = {}, g = 0;
          if (aa.isArray(b)) {
            for (d = Ra(a),
              e = b.length; e > g; g++)
              f[b[g]] = aa.css(a, b[g], !1, d);
            return f
          }
          return void 0 !== c ? aa.style(a, b, c) : aa.css(a, b)
        }, a, b, arguments.length > 1)
      },
      show: function () {
        return B(this, !0)
      },
      hide: function () {
        return B(this)
      },
      toggle: function (a) {
        return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
          xa(this) ? aa(this).show() : aa(this).hide()
        })
      }
    }),
    aa.Tween = C,
    C.prototype = {
      constructor: C,
      init: function (a, b, c, d, e, f) {
        this.elem = a,
          this.prop = c,
          this.easing = e || "swing",
          this.options = b,
          this.start = this.now = this.cur(),
          this.end = d,
          this.unit = f || (aa.cssNumber[c] ? "" : "px")
      },
      cur: function () {
        var a = C.propHooks[this.prop];
        return a && a.get ? a.get(this) : C.propHooks._default.get(this)
      },
      run: function (a) {
        var b, c = C.propHooks[this.prop];
        return this.pos = b = this.options.duration ? aa.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
          this.now = (this.end - this.start) * b + this.start,
          this.options.step && this.options.step.call(this.elem, this.now, this),
          c && c.set ? c.set(this) : C.propHooks._default.set(this),
          this
      }
    },
    C.prototype.init.prototype = C.prototype,
    C.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = aa.css(a.elem, a.prop, ""),
            b && "auto" !== b ? b : 0) : a.elem[a.prop]
        },
        set: function (a) {
          aa.fx.step[a.prop] ? aa.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[aa.cssProps[a.prop]] || aa.cssHooks[a.prop]) ? aa.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
        }
      }
    },
    C.propHooks.scrollTop = C.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
      }
    },
    aa.easing = {
      linear: function (a) {
        return a
      },
      swing: function (a) {
        return .5 - Math.cos(a * Math.PI) / 2
      }
    },
    aa.fx = C.prototype.init,
    aa.fx.step = {};
  var Ya, Za, $a = /^(?:toggle|show|hide)$/, _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"), ab = /queueHooks$/, bb = [G], cb = {
    "*": [function (a, b) {
      var c = this.createTween(a, b)
        , d = c.cur()
        , e = _a.exec(b)
        , f = e && e[3] || (aa.cssNumber[a] ? "" : "px")
        , g = (aa.cssNumber[a] || "px" !== f && +d) && _a.exec(aa.css(c.elem, a))
        , h = 1
        , i = 20;
      if (g && g[3] !== f) {
        f = f || g[3],
          e = e || [],
          g = +d || 1;
        do
          h = h || ".5",
            g /= h,
            aa.style(c.elem, a, g + f);
        while (h !== (h = c.cur() / d) && 1 !== h && --i)
      }
      return e && (g = c.start = +g || +d || 0,
        c.unit = f,
        c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]),
        c
    }
    ]
  };
  aa.Animation = aa.extend(I, {
    tweener: function (a, b) {
      aa.isFunction(a) ? (b = a,
        a = ["*"]) : a = a.split(" ");
      for (var c, d = 0, e = a.length; e > d; d++)
        c = a[d],
          cb[c] = cb[c] || [],
          cb[c].unshift(b)
    },
    prefilter: function (a, b) {
      b ? bb.unshift(a) : bb.push(a)
    }
  }),
    aa.speed = function (a, b, c) {
      var d = a && "object" == typeof a ? aa.extend({}, a) : {
        complete: c || !c && b || aa.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !aa.isFunction(b) && b
      };
      return d.duration = aa.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in aa.fx.speeds ? aa.fx.speeds[d.duration] : aa.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function () {
          aa.isFunction(d.old) && d.old.call(this),
            d.queue && aa.dequeue(this, d.queue)
        }
        ,
        d
    }
    ,
    aa.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(xa).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function (a, b, c, d) {
        var e = aa.isEmptyObject(a)
          , f = aa.speed(b, c, d)
          , g = function () {
            var b = I(this, aa.extend({}, a), f);
            (e || ra.get(this, "finish")) && b.stop(!0)
          };
        return g.finish = g,
          e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop,
            b(c)
        };
        return "string" != typeof a && (c = b,
          b = a,
          a = void 0),
          b && a !== !1 && this.queue(a || "fx", []),
          this.each(function () {
            var b = !0
              , e = null != a && a + "queueHooks"
              , f = aa.timers
              , g = ra.get(this);
            if (e)
              g[e] && g[e].stop && d(g[e]);
            else
              for (e in g)
                g[e] && g[e].stop && ab.test(e) && d(g[e]);
            for (e = f.length; e--;)
              f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c),
                b = !1,
                f.splice(e, 1));
            (b || !c) && aa.dequeue(this, a)
          })
      },
      finish: function (a) {
        return a !== !1 && (a = a || "fx"),
          this.each(function () {
            var b, c = ra.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = aa.timers, g = d ? d.length : 0;
            for (c.finish = !0,
              aa.queue(this, a, []),
              e && e.stop && e.stop.call(this, !0),
              b = f.length; b--;)
              f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                f.splice(b, 1));
            for (b = 0; g > b; b++)
              d[b] && d[b].finish && d[b].finish.call(this);
            delete c.finish
          })
      }
    }),
    aa.each(["toggle", "show", "hide"], function (a, b) {
      var c = aa.fn[b];
      aa.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e);
      }
    }),
    aa.each({
      slideDown: E("show"),
      slideUp: E("hide"),
      slideToggle: E("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function (a, b) {
      aa.fn[a] = function (a, c, d) {
        return this.animate(b, a, c, d)
      }
    }),
    aa.timers = [],
    aa.fx.tick = function () {
      var a, b = 0, c = aa.timers;
      for (Ya = aa.now(); b < c.length; b++)
        a = c[b],
          a() || c[b] !== a || c.splice(b--, 1);
      c.length || aa.fx.stop(),
        Ya = void 0
    }
    ,
    aa.fx.timer = function (a) {
      aa.timers.push(a),
        a() ? aa.fx.start() : aa.timers.pop()
    }
    ,
    aa.fx.interval = 13,
    aa.fx.start = function () {
      Za || (Za = setInterval(aa.fx.tick, aa.fx.interval))
    }
    ,
    aa.fx.stop = function () {
      clearInterval(Za),
        Za = null
    }
    ,
    aa.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    },
    aa.fn.delay = function (a, b) {
      return a = aa.fx ? aa.fx.speeds[a] || a : a,
        b = b || "fx",
        this.queue(b, function (b, c) {
          var d = setTimeout(b, a);
          c.stop = function () {
            clearTimeout(d)
          }
        })
    }
    ,
    function () {
      var a = $.createElement("input")
        , b = $.createElement("select")
        , c = b.appendChild($.createElement("option"));
      a.type = "checkbox",
        Z.checkOn = "" !== a.value,
        Z.optSelected = c.selected,
        b.disabled = !0,
        Z.optDisabled = !c.disabled,
        a = $.createElement("input"),
        a.value = "t",
        a.type = "radio",
        Z.radioValue = "t" === a.value
    }();
  var db, eb, fb = aa.expr.attrHandle;
  aa.fn.extend({
    attr: function (a, b) {
      return qa(this, aa.attr, a, b, arguments.length > 1)
    },
    removeAttr: function (a) {
      return this.each(function () {
        aa.removeAttr(this, a)
      })
    }
  }),
    aa.extend({
      attr: function (a, b, c) {
        var d, e, f = a.nodeType;
        return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === za ? aa.prop(a, b, c) : (1 === f && aa.isXMLDoc(a) || (b = b.toLowerCase(),
          d = aa.attrHooks[b] || (aa.expr.match.bool.test(b) ? eb : db)),
          void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = aa.find.attr(a, b),
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""),
              c) : void aa.removeAttr(a, b)) : void 0
      },
      removeAttr: function (a, b) {
        var c, d, e = 0, f = b && b.match(na);
        if (f && 1 === a.nodeType)
          for (; c = f[e++];)
            d = aa.propFix[c] || c,
              aa.expr.match.bool.test(c) && (a[d] = !1),
              a.removeAttribute(c)
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!Z.radioValue && "radio" === b && aa.nodeName(a, "input")) {
              var c = a.value;
              return a.setAttribute("type", b),
                c && (a.value = c),
                b
            }
          }
        }
      }
    }),
    eb = {
      set: function (a, b, c) {
        return b === !1 ? aa.removeAttr(a, c) : a.setAttribute(c, c),
          c
      }
    },
    aa.each(aa.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = fb[b] || aa.find.attr;
      fb[b] = function (a, b, d) {
        var e, f;
        return d || (f = fb[b],
          fb[b] = e,
          e = null != c(a, b, d) ? b.toLowerCase() : null,
          fb[b] = f),
          e
      }
    });
  var gb = /^(?:input|select|textarea|button)$/i;
  aa.fn.extend({
    prop: function (a, b) {
      return qa(this, aa.prop, a, b, arguments.length > 1)
    },
    removeProp: function (a) {
      return this.each(function () {
        delete this[aa.propFix[a] || a]
      })
    }
  }),
    aa.extend({
      propFix: {
        "for": "htmlFor",
        "class": "className"
      },
      prop: function (a, b, c) {
        var d, e, f, g = a.nodeType;
        return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !aa.isXMLDoc(a),
          f && (b = aa.propFix[b] || b,
            e = aa.propHooks[b]),
          void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1
          }
        }
      }
    }),
    Z.optSelected || (aa.propHooks.selected = {
      get: function (a) {
        var b = a.parentNode;
        return b && b.parentNode && b.parentNode.selectedIndex,
          null
      }
    }),
    aa.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
      aa.propFix[this.toLowerCase()] = this
    });
  var hb = /[\t\r\n\f]/g;
  aa.fn.extend({
    addClass: function (a) {
      var b, c, d, e, f, g, h = "string" == typeof a && a, i = 0, j = this.length;
      if (aa.isFunction(a))
        return this.each(function (b) {
          aa(this).addClass(a.call(this, b, this.className))
        });
      if (h)
        for (b = (a || "").match(na) || []; j > i; i++)
          if (c = this[i],
            d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
            for (f = 0; e = b[f++];)
              d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = aa.trim(d),
              c.className !== g && (c.className = g)
          }
      return this
    },
    removeClass: function (a) {
      var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a, i = 0, j = this.length;
      if (aa.isFunction(a))
        return this.each(function (b) {
          aa(this).removeClass(a.call(this, b, this.className))
        });
      if (h)
        for (b = (a || "").match(na) || []; j > i; i++)
          if (c = this[i],
            d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
            for (f = 0; e = b[f++];)
              for (; d.indexOf(" " + e + " ") >= 0;)
                d = d.replace(" " + e + " ", " ");
            g = a ? aa.trim(d) : "",
              c.className !== g && (c.className = g)
          }
      return this
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(aa.isFunction(a) ? function (c) {
        aa(this).toggleClass(a.call(this, c, this.className, b), b)
      }
        : function () {
          if ("string" === c)
            for (var b, d = 0, e = aa(this), f = a.match(na) || []; b = f[d++];)
              e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          else
            (c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className),
              this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "")
        }
      )
    },
    hasClass: function (a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0)
          return !0;
      return !1
    }
  });
  var ib = /\r/g;
  aa.fn.extend({
    val: function (a) {
      var b, c, d, e = this[0];
      return arguments.length ? (d = aa.isFunction(a),
        this.each(function (c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, aa(this).val()) : a,
            null == e ? e = "" : "number" == typeof e ? e += "" : aa.isArray(e) && (e = aa.map(e, function (a) {
              return null == a ? "" : a + ""
            })),
            b = aa.valHooks[this.type] || aa.valHooks[this.nodeName.toLowerCase()],
            b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        })) : e ? (b = aa.valHooks[e.type] || aa.valHooks[e.nodeName.toLowerCase()],
          b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
            "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)) : void 0
    }
  }),
    aa.extend({
      valHooks: {
        select: {
          get: function (a) {
            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
              if (c = d[i],
                !(!c.selected && i !== e || (Z.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && aa.nodeName(c.parentNode, "optgroup"))) {
                if (b = aa(c).val(),
                  f)
                  return b;
                g.push(b)
              }
            return g
          },
          set: function (a, b) {
            for (var c, d, e = a.options, f = aa.makeArray(b), g = e.length; g--;)
              d = e[g],
                (d.selected = aa.inArray(aa(d).val(), f) >= 0) && (c = !0);
            return c || (a.selectedIndex = -1),
              f
          }
        }
      }
    }),
    aa.each(["radio", "checkbox"], function () {
      aa.valHooks[this] = {
        set: function (a, b) {
          return aa.isArray(b) ? a.checked = aa.inArray(aa(a).val(), b) >= 0 : void 0
        }
      },
        Z.checkOn || (aa.valHooks[this].get = function (a) {
          return null === a.getAttribute("value") ? "on" : a.value
        }
        )
    }),
    aa.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
      aa.fn[b] = function (a, c) {
        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
      }
    }),
    aa.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
      },
      bind: function (a, b, c) {
        return this.on(a, null, b, c)
      },
      unbind: function (a, b) {
        return this.off(a, null, b)
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
      }
    });
  var jb = aa.now()
    , kb = /\?/;
  aa.parseJSON = function (a) {
    return JSON.parse(a + "")
  }
    ,
    aa.parseXML = function (a) {
      var b, c;
      if (!a || "string" != typeof a)
        return null;
      try {
        c = new DOMParser,
          b = c.parseFromString(a, "text/xml")
      } catch (d) {
        b = void 0
      }
      return (!b || b.getElementsByTagName("parsererror").length) && aa.error("Invalid XML: " + a),
        b
    }
    ;
  var lb, mb, nb = /#.*$/, ob = /([?&])_=[^&]*/, pb = /^(.*?):[ \t]*([^\r\n]*)$/gm, qb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rb = /^(?:GET|HEAD)$/, sb = /^\/\//, tb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, ub = {}, vb = {}, wb = "*/".concat("*");
  try {
    mb = location.href
  } catch (xb) {
    mb = $.createElement("a"),
      mb.href = "",
      mb = mb.href
  }
  lb = tb.exec(mb.toLowerCase()) || [],
    aa.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: mb,
        type: "GET",
        isLocal: qb.test(lb[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": wb,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": aa.parseJSON,
          "text xml": aa.parseXML
        },
        flatOptions: {
          url: !0,
          context: !0
        }
      },
      ajaxSetup: function (a, b) {
        return b ? L(L(a, aa.ajaxSettings), b) : L(aa.ajaxSettings, a)
      },
      ajaxPrefilter: J(ub),
      ajaxTransport: J(vb),
      ajax: function (a, b) {
        function c(a, b, c, g) {
          var i, k, r, s, u, w = b;
          2 !== t && (t = 2,
            h && clearTimeout(h),
            d = void 0,
            f = g || "",
            v.readyState = a > 0 ? 4 : 0,
            i = a >= 200 && 300 > a || 304 === a,
            c && (s = M(l, v, c)),
            s = N(l, s, v, i),
            i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"),
              u && (aa.lastModified[e] = u),
              u = v.getResponseHeader("etag"),
              u && (aa.etag[e] = u)),
              204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state,
                k = s.data,
                r = s.error,
                i = !r)) : (r = w,
                  (a || !w) && (w = "error",
                    0 > a && (a = 0))),
            v.status = a,
            v.statusText = (b || w) + "",
            i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
            v.statusCode(q),
            q = void 0,
            j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]),
            p.fireWith(m, [v, w]),
            j && (n.trigger("ajaxComplete", [v, l]),
              --aa.active || aa.event.trigger("ajaxStop")))
        }
        "object" == typeof a && (b = a,
          a = void 0),
          b = b || {};
        var d, e, f, g, h, i, j, k, l = aa.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? aa(m) : aa.event, o = aa.Deferred(), p = aa.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === t) {
              if (!g)
                for (g = {}; b = pb.exec(f);)
                  g[b[1].toLowerCase()] = b[2];
              b = g[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function () {
            return 2 === t ? f : null
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a,
              r[a] = b),
              this
          },
          overrideMimeType: function (a) {
            return t || (l.mimeType = a),
              this
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > t)
                for (b in a)
                  q[b] = [q[b], a[b]];
              else
                v.always(a[v.status]);
            return this
          },
          abort: function (a) {
            var b = a || u;
            return d && d.abort(b),
              c(0, b),
              this
          }
        };
        if (o.promise(v).complete = p.add,
          v.success = v.done,
          v.error = v.fail,
          l.url = ((a || l.url || mb) + "").replace(nb, "").replace(sb, lb[1] + "//"),
          l.type = b.method || b.type || l.method || l.type,
          l.dataTypes = aa.trim(l.dataType || "*").toLowerCase().match(na) || [""],
          null == l.crossDomain && (i = tb.exec(l.url.toLowerCase()),
            l.crossDomain = !(!i || i[1] === lb[1] && i[2] === lb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (lb[3] || ("http:" === lb[1] ? "80" : "443")))),
          l.data && l.processData && "string" != typeof l.data && (l.data = aa.param(l.data, l.traditional)),
          K(ub, l, b, v),
          2 === t)
          return v;
        j = l.global,
          j && 0 === aa.active++ && aa.event.trigger("ajaxStart"),
          l.type = l.type.toUpperCase(),
          l.hasContent = !rb.test(l.type),
          e = l.url,
          l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data,
            delete l.data),
            l.cache === !1 && (l.url = ob.test(e) ? e.replace(ob, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)),
          l.ifModified && (aa.lastModified[e] && v.setRequestHeader("If-Modified-Since", aa.lastModified[e]),
            aa.etag[e] && v.setRequestHeader("If-None-Match", aa.etag[e])),
          (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
          v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + wb + "; q=0.01" : "") : l.accepts["*"]);
        for (k in l.headers)
          v.setRequestHeader(k, l.headers[k]);
        if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))
          return v.abort();
        u = "abort";
        for (k in {
          success: 1,
          error: 1,
          complete: 1
        })
          v[k](l[k]);
        if (d = K(vb, l, b, v)) {
          v.readyState = 1,
            j && n.trigger("ajaxSend", [v, l]),
            l.async && l.timeout > 0 && (h = setTimeout(function () {
              v.abort("timeout")
            }, l.timeout));
          try {
            t = 1,
              d.send(r, c)
          } catch (w) {
            if (!(2 > t))
              throw w;
            c(-1, w)
          }
        } else
          c(-1, "No Transport");
        return v
      },
      getJSON: function (a, b, c) {
        return aa.get(a, b, c, "json")
      },
      getScript: function (a, b) {
        return aa.get(a, void 0, b, "script")
      }
    }),
    aa.each(["get", "post"], function (a, b) {
      aa[b] = function (a, c, d, e) {
        return aa.isFunction(c) && (e = e || d,
          d = c,
          c = void 0),
          aa.ajax({
            url: a,
            type: b,
            dataType: e,
            data: c,
            success: d
          })
      }
    }),
    aa.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
      aa.fn[b] = function (a) {
        return this.on(b, a)
      }
    }),
    aa._evalUrl = function (a) {
      return aa.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }
    ,
    aa.fn.extend({
      wrapAll: function (a) {
        var b;
        return aa.isFunction(a) ? this.each(function (b) {
          aa(this).wrapAll(a.call(this, b))
        }) : (this[0] && (b = aa(a, this[0].ownerDocument).eq(0).clone(!0),
          this[0].parentNode && b.insertBefore(this[0]),
          b.map(function () {
            for (var a = this; a.firstElementChild;)
              a = a.firstElementChild;
            return a
          }).append(this)),
          this)
      },
      wrapInner: function (a) {
        return this.each(aa.isFunction(a) ? function (b) {
          aa(this).wrapInner(a.call(this, b))
        }
          : function () {
            var b = aa(this)
              , c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
          }
        )
      },
      wrap: function (a) {
        var b = aa.isFunction(a);
        return this.each(function (c) {
          aa(this).wrapAll(b ? a.call(this, c) : a)
        })
      },
      unwrap: function () {
        return this.parent().each(function () {
          aa.nodeName(this, "body") || aa(this).replaceWith(this.childNodes)
        }).end()
      }
    }),
    aa.expr.filters.hidden = function (a) {
      return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }
    ,
    aa.expr.filters.visible = function (a) {
      return !aa.expr.filters.hidden(a)
    }
    ;
  var yb = /%20/g
    , zb = /\[\]$/
    , Ab = /\r?\n/g
    , Bb = /^(?:submit|button|image|reset|file)$/i
    , Cb = /^(?:input|select|textarea|keygen)/i;
  aa.param = function (a, b) {
    var c, d = [], e = function (a, b) {
      b = aa.isFunction(b) ? b() : null == b ? "" : b,
        d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
    };
    if (void 0 === b && (b = aa.ajaxSettings && aa.ajaxSettings.traditional),
      aa.isArray(a) || a.jquery && !aa.isPlainObject(a))
      aa.each(a, function () {
        e(this.name, this.value)
      });
    else
      for (c in a)
        O(c, a[c], b, e);
    return d.join("&").replace(yb, "+")
  }
    ,
    aa.fn.extend({
      serialize: function () {
        return aa.param(this.serializeArray())
      },
      serializeArray: function () {
        return this.map(function () {
          var a = aa.prop(this, "elements");
          return a ? aa.makeArray(a) : this
        }).filter(function () {
          var a = this.type;
          return this.name && !aa(this).is(":disabled") && Cb.test(this.nodeName) && !Bb.test(a) && (this.checked || !ya.test(a))
        }).map(function (a, b) {
          var c = aa(this).val();
          return null == c ? null : aa.isArray(c) ? aa.map(c, function (a) {
            return {
              name: b.name,
              value: a.replace(Ab, "\r\n")
            }
          }) : {
            name: b.name,
            value: c.replace(Ab, "\r\n")
          }
        }).get()
      }
    }),
    aa.ajaxSettings.xhr = function () {
      try {
        return new XMLHttpRequest
      } catch (a) { }
    }
    ;
  var Db = 0
    , Eb = {}
    , Fb = {
      0: 200,
      1223: 204
    }
    , Gb = aa.ajaxSettings.xhr();
  a.ActiveXObject && aa(a).on("unload", function () {
    for (var a in Eb)
      Eb[a]()
  }),
    Z.cors = !!Gb && "withCredentials" in Gb,
    Z.ajax = Gb = !!Gb,
    aa.ajaxTransport(function (a) {
      var b;
      return Z.cors || Gb && !a.crossDomain ? {
        send: function (c, d) {
          var e, f = a.xhr(), g = ++Db;
          if (f.open(a.type, a.url, a.async, a.username, a.password),
            a.xhrFields)
            for (e in a.xhrFields)
              f[e] = a.xhrFields[e];
          a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
            a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
          for (e in c)
            f.setRequestHeader(e, c[e]);
          b = function (a) {
            return function () {
              b && (delete Eb[g],
                b = f.onload = f.onerror = null,
                "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Fb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                  text: f.responseText
                } : void 0, f.getAllResponseHeaders()))
            }
          }
            ,
            f.onload = b(),
            f.onerror = b("error"),
            b = Eb[g] = b("abort"),
            f.send(a.hasContent && a.data || null)
        },
        abort: function () {
          b && b()
        }
      } : void 0
    }),
    aa.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /(?:java|ecma)script/
      },
      converters: {
        "text script": function (a) {
          return aa.globalEval(a),
            a
        }
      }
    }),
    aa.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1),
        a.crossDomain && (a.type = "GET")
    }),
    aa.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b, c;
        return {
          send: function (d, e) {
            b = aa("<script>").prop({
              async: !0,
              charset: a.scriptCharset,
              src: a.url
            }).on("load error", c = function (a) {
              b.remove(),
                c = null,
                a && e("error" === a.type ? 404 : 200, a.type)
            }
            ),
              $.head.appendChild(b[0])
          },
          abort: function () {
            c && c()
          }
        }
      }
    });
  var Hb = []
    , Ib = /(=)\?(?=&|$)|\?\?/;
  aa.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = Hb.pop() || aa.expando + "_" + jb++;
      return this[a] = !0,
        a
    }
  }),
    aa.ajaxPrefilter("json jsonp", function (b, c, d) {
      var e, f, g, h = b.jsonp !== !1 && (Ib.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ib.test(b.data) && "data");
      return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = aa.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
        h ? b[h] = b[h].replace(Ib, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
        b.converters["script json"] = function () {
          return g || aa.error(e + " was not called"),
            g[0]
        }
        ,
        b.dataTypes[0] = "json",
        f = a[e],
        a[e] = function () {
          g = arguments
        }
        ,
        d.always(function () {
          a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback,
              Hb.push(e)),
            g && aa.isFunction(f) && f(g[0]),
            g = f = void 0
        }),
        "script") : void 0
    }),
    aa.parseHTML = function (a, b, c) {
      if (!a || "string" != typeof a)
        return null;
      "boolean" == typeof b && (c = b,
        b = !1),
        b = b || $;
      var d = ga.exec(a)
        , e = !c && [];
      return d ? [b.createElement(d[1])] : (d = aa.buildFragment([a], b, e),
        e && e.length && aa(e).remove(),
        aa.merge([], d.childNodes))
    }
    ;
  var Jb = aa.fn.load;
  aa.fn.load = function (a, b, c) {
    if ("string" != typeof a && Jb)
      return Jb.apply(this, arguments);
    var d, e, f, g = this, h = a.indexOf(" ");
    return h >= 0 && (d = a.slice(h),
      a = a.slice(0, h)),
      aa.isFunction(b) ? (c = b,
        b = void 0) : b && "object" == typeof b && (e = "POST"),
      g.length > 0 && aa.ajax({
        url: a,
        type: e,
        dataType: "html",
        data: b
      }).done(function (a) {
        f = arguments,
          g.html(d ? aa("<div>").append(aa.parseHTML(a)).find(d) : a)
      }).complete(c && function (a, b) {
        g.each(c, f || [a.responseText, b, a])
      }
      ),
      this
  }
    ,
    aa.expr.filters.animated = function (a) {
      return aa.grep(aa.timers, function (b) {
        return a === b.elem
      }).length
    }
    ;
  var Kb = a.document.documentElement;
  aa.offset = {
    setOffset: function (a, b, c) {
      var d, e, f, g, h, i, j, k = aa.css(a, "position"), l = aa(a), m = {};
      "static" === k && (a.style.position = "relative"),
        h = l.offset(),
        f = aa.css(a, "top"),
        i = aa.css(a, "left"),
        j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1,
        j ? (d = l.position(),
          g = d.top,
          e = d.left) : (g = parseFloat(f) || 0,
            e = parseFloat(i) || 0),
        aa.isFunction(b) && (b = b.call(a, c, h)),
        null != b.top && (m.top = b.top - h.top + g),
        null != b.left && (m.left = b.left - h.left + e),
        "using" in b ? b.using.call(a, m) : l.css(m)
    }
  },
    aa.fn.extend({
      offset: function (a) {
        if (arguments.length)
          return void 0 === a ? this : this.each(function (b) {
            aa.offset.setOffset(this, a, b)
          });
        var b, c, d = this[0], e = {
          top: 0,
          left: 0
        }, f = d && d.ownerDocument;
        return f ? (b = f.documentElement,
          aa.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()),
            c = P(f),
          {
            top: e.top + c.pageYOffset - b.clientTop,
            left: e.left + c.pageXOffset - b.clientLeft
          }) : e) : void 0
      },
      position: function () {
        if (this[0]) {
          var a, b, c = this[0], d = {
            top: 0,
            left: 0
          };
          return "fixed" === aa.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(),
            b = this.offset(),
            aa.nodeName(a[0], "html") || (d = a.offset()),
            d.top += aa.css(a[0], "borderTopWidth", !0),
            d.left += aa.css(a[0], "borderLeftWidth", !0)),
          {
            top: b.top - d.top - aa.css(c, "marginTop", !0),
            left: b.left - d.left - aa.css(c, "marginLeft", !0)
          }
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (var a = this.offsetParent || Kb; a && !aa.nodeName(a, "html") && "static" === aa.css(a, "position");)
            a = a.offsetParent;
          return a || Kb
        })
      }
    }),
    aa.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function (b, c) {
      var d = "pageYOffset" === c;
      aa.fn[b] = function (e) {
        return qa(this, function (b, e, f) {
          var g = P(b);
          return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
        }, b, e, arguments.length, null)
      }
    }),
    aa.each(["top", "left"], function (a, b) {
      aa.cssHooks[b] = w(Z.pixelPosition, function (a, c) {
        return c ? (c = v(a, b),
          Qa.test(c) ? aa(a).position()[b] + "px" : c) : void 0
      })
    }),
    aa.each({
      Height: "height",
      Width: "width"
    }, function (a, b) {
      aa.each({
        padding: "inner" + a,
        content: b,
        "": "outer" + a
      }, function (c, d) {
        aa.fn[d] = function (d, e) {
          var f = arguments.length && (c || "boolean" != typeof d)
            , g = c || (d === !0 || e === !0 ? "margin" : "border");
          return qa(this, function (b, c, d) {
            var e;
            return aa.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
              Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? aa.css(b, c, g) : aa.style(b, c, d, g)
          }, b, f ? d : void 0, f, null)
        }
      })
    }),
    aa.fn.size = function () {
      return this.length
    }
    ,
    aa.fn.andSelf = aa.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function () {
      return aa
    });
  var Lb = a.jQuery
    , Mb = a.$;
  return aa.noConflict = function (b) {
    return a.$ === aa && (a.$ = Mb),
      b && a.jQuery === aa && (a.jQuery = Lb),
      aa
  }
    ,
    typeof b === za && (a.jQuery = a.$ = aa),
    aa
}),
  function (a, b, c) {
    "use strict";
    b.fn.sudokuJS = function (c) {
      function d(b) {
        a.console && console.log && console.log(b)
      }
      function e() {
        for (var a = P.length, b = 0; a > b; b++)
          for (var c = 0, d = 0; y > d; d++) {
            for (var e = [], f = 0; y > f; f++) {
              var g = P[b][d][f];
              if (null === N[g].val && (e.push({
                house: P[b][d],
                cell: g
              }),
                e.length > 1))
                break
            }
            if (1 === e.length) {
              var h = e[0]
                , i = ma(h.house);
              return i.length > 1 ? (G = !0,
                -1) : (ja(h.cell, i[0]),
                  B === v && ba(h.cell, i[0]),
                  [h.cell])
            }
            if (0 === e.length && (c++,
              c === y))
              return F = !0,
                -1
          }
        return !1
      }
      function f() {
        for (var a = P.length, b = 0; a > b; b++)
          for (var c = 0; y > c; c++)
            for (var d = P[b][c], e = na(d), f = 0; y > f; f++) {
              var g = d[f];
              N[g].candidates;
              ca(g, e)
            }
        return !1
      }
      function g() {
        for (var a = P.length, b = 0; a > b; b++)
          for (var c = 0; y > c; c++)
            for (var d = P[b][c], e = ma(d), f = 0; f < e.length; f++) {
              for (var g = e[f], h = [], i = 0; y > i; i++) {
                var j = d[i]
                  , k = N[j];
                if (R(k.candidates, g) && (h.push(j),
                  h.length > 1))
                  break
              }
              if (1 === h.length) {
                var l = h[0];
                return ja(l, g),
                  B === v && ba(l, g),
                  H = !1,
                  [l]
              }
            }
        return !1
      }
      function h() {
        f();
        for (var a = 0; a < N.length; a++) {
          for (var b = N[a], c = b.candidates, d = [], e = 0; e < c.length && (null !== c[e] && d.push(c[e]),
            !(d.length > 1)); e++)
            ;
          if (1 === d.length) {
            var g = d[0];
            return ja(a, g),
              B === v && ba(a, g),
              H = !1,
              [a]
          }
        }
        return !1
      }
      function i() {
        for (var a = P.length, b = 0; a > b; b++)
          for (var c = b, d = 0; y > d; d++)
            for (var e = P[c][d], f = ma(e), g = 0; g < f.length; g++) {
              for (var h = f[g], i = !0, j = -1, k = -1, l = !0, m = [], n = 0; n < e.length; n++) {
                var o = e[n];
                if (R(N[o].candidates, h)) {
                  var p = la(o)
                    , q = 2 === c ? p[0] : p[2]
                    , r = 2 === c ? p[1] : p[2];
                  if (m.length > 0 && (q !== j && (i = !1),
                    k !== r && (l = !1),
                    i === !1 && l === !1))
                    break;
                  j = q,
                    k = r,
                    m.push(o)
                }
              }
              if ((i === !0 || l === !0) && m.length > 0) {
                var s = la(m[0])
                  , t = 2;
                2 === c && (t = i ? 0 : 1);
                for (var u = P[t][s[t]], w = [], x = 0; x < u.length; x++)
                  R(m, u[x]) || w.push(u[x]);
                var z = da(w, [h]);
                if (z.length > 0)
                  return B === v && ea([h], m),
                    H = !0,
                    z
              }
            }
        return !1
      }
      function j(a) {
        function b(c, d) {
          for (var e = Math.max(d, h[d]); y - a + d > e; e++) {
            h[d] = e + 1,
              h[d + 1] = e + 1;
            var f = c[e]
              , i = oa(f);
            if (!(0 === i.length || i.length > a)) {
              if (g.length > 0) {
                for (var j = i.slice(), k = 0; k < g.length; k++)
                  for (var l = g[k].candidates, m = 0; m < l.length; m++)
                    R(j, l[m]) || j.push(l[m]);
                if (j.length > a)
                  continue
              }
              if (g.push({
                cell: f,
                candidates: i
              }),
                a - 1 > d) {
                var n = b(c, d + 1);
                if (n !== !1)
                  return n
              }
              if (g.length === a) {
                for (var o = [], p = [], q = 0; q < g.length; q++)
                  o.push(g[q].cell),
                    p = p.concat(g[q].candidates);
                for (var r = [], s = 0; y > s; s++)
                  R(o, c[s]) || r.push(c[s]);
                var t = da(r, p);
                if (t.length > 0)
                  return B === v && ea(p, o),
                    H = !0,
                    S(t)
              }
            }
          }
          return d > 0 && g.length > d - 1 && g.pop(),
            !1
        }
        for (var c = P.length, d = 0; c > d; d++)
          for (var e = 0; y > e; e++) {
            var f = P[d][e];
            if (!(ma(f).length <= a)) {
              var g = []
                , h = [-1]
                , i = b(f, 0);
              if (i !== !1)
                return i
            }
          }
        return !1
      }
      function k() {
        return j(2)
      }
      function l() {
        return j(3)
      }
      function m() {
        return j(4)
      }
      function n(a) {
        function b(c, d) {
          for (var e = Math.max(d, h[d]); y - a + d >= e; e++) {
            h[d] = e + 1,
              h[d + 1] = e + 1;
            var f = e + 1
              , i = pa(f, c);
            if (!(0 === i.length || i.length > a)) {
              if (g.length > 0) {
                for (var j = i.slice(), k = 0; k < g.length; k++)
                  for (var l = g[k].cells, m = 0; m < l.length; m++)
                    R(j, l[m]) || j.push(l[m]);
                if (j.length > a)
                  continue
              }
              if (g.push({
                candidate: f,
                cells: i
              }),
                a - 1 > d) {
                var n = b(c, d + 1);
                if (n !== !1)
                  return n
              }
              if (g.length === a) {
                for (var o = [], p = [], q = 0; q < g.length; q++)
                  o.push(g[q].candidate),
                    p = p.concat(g[q].cells);
                for (var r = [], s = 0; y > s; s++)
                  R(o, s + 1) || r.push(s + 1);
                var t = da(p, r);
                if (t.length > 0)
                  return B === v && ea(o, p),
                    H = !0,
                    S(p)
              }
            }
          }
          return d > 0 && g.length > d - 1 && g.pop(),
            !1
        }
        for (var c = P.length, d = 0; c > d; d++)
          for (var e = 0; y > e; e++) {
            var f = P[d][e];
            if (!(ma(f).length <= a)) {
              var g = []
                , h = [-1]
                , i = b(f, 0);
              if (i !== !1)
                return i
            }
          }
        return !1
      }
      function o() {
        return n(2)
      }
      function p() {
        return n(3)
      }
      function q() {
        return n(4)
      }
      var r = "easy"
        , s = "medium"
        , t = "hard"
        , u = "very hard"
        , v = "step"
        , w = "all"
        , x = [r, s, t, u];
      c = c || {};
      var y, z, A, B = v, C = "unknown", D = !1, E = !1, F = !1, G = !1, H = !1, I = !1, J = !1, K = [], L = [{
        title: "openSingles",
        fn: e,
        score: .1
      }, {
        title: "singleCandidate",
        fn: h,
        score: 9
      }, {
        title: "visualElimination",
        fn: g,
        score: 8
      }, {
        title: "nakedPair",
        fn: k,
        score: 50
      }, {
        title: "pointingElimination",
        fn: i,
        score: 80
      }, {
        title: "hiddenPair",
        fn: o,
        score: 90
      }, {
        title: "nakedTriplet",
        fn: l,
        score: 100
      }, {
        title: "hiddenTriplet",
        fn: p,
        score: 140
      }, {
        title: "nakedQuad",
        fn: m,
        score: 150
      }, {
        title: "hiddenQuad",
        fn: q,
        score: 280
      }], M = [], N = [], O = [], P = [[], [], []], Q = b(this), R = function (a, b) {
        for (var c = 0; c < a.length; c++)
          if (a[c] === b)
            return !0;
        return !1
      }, S = function (a) {
        for (var b = {}, c = 0; c < a.length; c++)
          b[a[c]] = !0;
        var d = [];
        for (var e in b)
          d.push(e);
        return d
      }, T = function (a) {
        var b = {};
        a.length < 3 ? b.level = r : a.length < 4 ? b.level = s : b.level = t;
        for (var c = 0, d = 0; d < L.length; d++) {
          var e = a[d];
          if (e) {
            var f = L[d];
            c += e * f.score
          }
        }
        return b.score = c,
          c > 750 && (b.level = u),
          b
      }, U = function () {
        for (var a = 0; y * y > a; a++)
          if (null === N[a].val)
            return !1;
        return !0
      }, V = function () {
        for (var a = Math.sqrt(y), b = 0; y > b; b++) {
          for (var c = [], d = [], e = [], f = 0; y > f; f++)
            if (c.push(y * b + f),
              d.push(y * f + b),
              a > f)
              for (var g = 0; a > g; g++) {
                var h = Math.floor(b / a) * y * a
                  , i = b % a * a
                  , j = h + i;
                e.push(j + y * f + g)
              }
          P[0].push(c),
            P[1].push(d),
            P[2].push(e)
        }
      }, W = function () {
        var a = null !== N[0] && "object" == typeof N[0]
          , b = [];
        if (y = Math.sqrt(N.length) || 9,
          Q.attr("data-board-size", y),
          y % 1 !== 0 || Math.sqrt(y) % 1 !== 0)
          return d("invalid boardSize: " + y),
            void ("function" == typeof c.boardErrorFn && c.boardErrorFn({
              msg: "invalid board size"
            }));
        for (var e = 0; y > e; e++)
          O.push(e + 1),
            b.push(null);
        if (V(),
          !a)
          for (var f = 0; y * y > f; f++) {
            var g = "undefined" == typeof N[f] ? null : N[f]
              , h = null === g ? O.slice() : b.slice();
            N[f] = {
              val: g,
              candidates: h
            }
          }
      }, X = function () {
        for (var a = "", b = 0; y * y > b; b++)
          a += Y(N[b], b),
            (b + 1) % y === 0 && (a += "<br>");
        Q.append(a),
          z = Q.find("input"),
          A = Q.find(".candidates")
      }, Y = function (a, b) {
        var c = null === a.val ? "" : a.val
          , d = a.candidates || []
          , e = Z(d)
          , f = 10 > y ? " maxlength='1'" : "";
        return "<div class='sudoku-board-cell'><input type='text' pattern='\\d*' novalidate id='input-" + b + "' value='" + c + "'" + f + "><div id='input-" + b + "-candidates' class='candidates'>" + e + "</div></div>"
      }, Z = function (a) {
        for (var b = "", c = 1; y + 1 > c; c++)
          b += R(a, c) ? "<div>" + c + "</div> " : "<div>&nbsp;</div> ";
        return b
      }, $ = function (a) {
        z.removeClass("highlight-val").each(function (c, d) {
          var e = b(this)
            , f = N[c].val;
          e.val(f),
            a && e.addClass("highlight-val");
          var g = e.siblings(".candidates");
          g.html(Z(N[c].candidates))
        })
      }, _ = function (a, c) {
        c = c || {};
        var d = N[a].val;
        b("#input-" + a).val(d).addClass("highlight-val"),
          b("#input-" + a + "-candidates").html(Z(N[a].candidates))
      }, aa = function (a, c) {
        b("#input-" + a + "-candidates div:nth-of-type(" + c + ")").addClass("candidate--to-remove")
      }, ba = function (a, c) {
        b("#input-" + a + "-candidates div:nth-of-type(" + c + ")").addClass("candidate--highlight")
      }, ca = function (a, b) {
        for (var c = N[a], d = c.candidates, e = !1, f = 0; f < b.length; f++)
          null !== d[b[f] - 1] && (d[b[f] - 1] = null,
            e = !0);
        e && B === v && _(a, {
          mode: "only-candidates"
        })
      }, da = function (a, b) {
        for (var c = [], d = 0; d < a.length; d++)
          for (var e = N[a[d]].candidates, f = 0; f < b.length; f++) {
            var g = b[f];
            null !== e[g - 1] && (e[g - 1] = null,
              c.push(a[d]),
              B === v && aa(a[d], g))
          }
        return c
      }, ea = function (a, b) {
        for (var c = 0; c < b.length; c++)
          for (var d = N[b[c]].candidates, e = 0; e < d.length; e++)
            R(a, d[e]) && ba(b[c], d[e])
      }, fa = function () {
        F = !1,
          G = !1,
          H = !1,
          M = [],
          I = !1
      }, ga = function () {
        fa();
        for (var a = O.slice(0), b = 0; y * y > b; b++)
          N[b] = {
            val: null,
            candidates: a.slice()
          };
        z.removeClass("highlight-val").val(""),
          $(!1)
      }, ha = function () {
        for (var a = [], b = 0; y > b; b++)
          a.push(null);
        return a
      }, ia = function (a) {
        for (var c = O.slice(0), d = 0; y * y > d; d++)
          null === N[d].val ? (N[d].candidates = c.slice(),
            a !== !1 && b("#input-" + d + "-candidates").html(Z(c))) : a !== !1 && b("#input-" + d + "-candidates").html("")
      }, ja = function (a, b) {
        var c = N[a];
        c.val = b,
          null !== b && (c.candidates = ha())
      }, ka = function (a, b) {
        for (var c = 0; y > c; c++)
          if (N[b[c]].val === a)
            return c;
        return !1
      }, la = function (a) {
        var b = Math.sqrt(y)
          , c = []
          , d = Math.floor(a / y);
        c.push(d);
        var e = Math.floor(a % y);
        c.push(e);
        var f = Math.floor(d / b) * b + Math.floor(e / b);
        return c.push(f),
          c
      }, ma = function (a) {
        for (var b = O.slice(), c = 0; c < a.length; c++)
          for (var d = 0; d < b.length; d++)
            b[d] === N[a[c]].val && b.splice(d, 1);
        return b
      }, na = function (a) {
        for (var b = [], c = 0; c < a.length; c++) {
          var d = N[a[c]].val;
          null !== d && b.push(d)
        }
        return b
      }, oa = function (a) {
        for (var b = [], c = N[a].candidates, d = 0; d < c.length; d++)
          null !== c[d] && b.push(c[d]);
        return b
      }, pa = function (a, b) {
        for (var c = [], d = 0; d < b.length; d++) {
          var e = N[b[d]]
            , f = e.candidates;
          R(f, a) && c.push(b[d])
        }
        return c
      }, qa = 0, ra = !1, sa = function (a) {
        if (F)
          return I || ($(!1),
            "function" == typeof c.boardFinishedFn && c.boardFinishedFn({
              difficultyInfo: T(M)
            })),
            !1;
        if (B === v && ra && -1 !== ra) {
          z.removeClass("highlight-val"),
            b(".candidate--highlight").removeClass("candidate--highlight");
          for (var d = 0; d < ra.length; d++)
            _(ra[d])
        }
        qa++;
        var e = L[a].fn;
        if (ra = e(),
          ra === !1)
          return L.length > a + 1 ? sa(a + 1) : ("function" != typeof c.boardErrorFn || J || c.boardErrorFn({
            msg: "no more strategies"
          }),
            I || J || B !== w || $(!1),
            !1);
        if (G)
          return "function" == typeof c.boardErrorFn && c.boardErrorFn({
            msg: "Board incorrect"
          }),
            B === w && $(!1),
            !1;
        if (B === v && ("function" == typeof c.boardUpdatedFn && c.boardUpdatedFn({
          cause: L[a].title,
          cellsUpdated: ra
        }),
          U() && (F = !0,
            "function" == typeof c.boardFinishedFn && c.boardFinishedFn({
              difficultyInfo: T(M)
            }),
            D && $(!1)),
          !D && !H && ra && -1 !== ra)) {
          z.removeClass("highlight-val"),
            b(".candidate--highlight").removeClass("candidate--highlight");
          for (var f = 0; f < ra.length; f++)
            _(ra[f])
        }
        return "undefined" == typeof M[a] && (M[a] = 0),
          M[a] = M[a] + 1,
          I || D || !H || (Ia(),
            "function" == typeof c.candidateShowToggleFn && c.candidateShowToggleFn(!0)),
          !0
      }, ta = function (a, c) {
        var d = a;
        39 === c ? d++ : 37 === c ? d-- : 40 === c ? d += y : 38 === c && (d -= y),
          0 > d || d > y * y || b("#input-" + d).focus()
      }, ua = function (a, b) {
        var c = N[b];
        if (!c.val) {
          var d = c.candidates;
          d[a - 1] = null === d[a - 1] ? a : null,
            B === v && _(b, {
              mode: "only-candidates"
            })
        }
      }, va = function (a, e) {
        var g = parseInt(a.val());
        if (E)
          return ua(g, e),
            void a.val(N[e].val);
        var h = ha();
        if (g > 0) {
          for (var i = la(e), j = 0; j < P.length; j++)
            if (ka(g, P[j][i[j]])) {
              d("board incorrect!");
              var k = P[j][i[j]][ka(g, P[j][i[j]])];
              if (k === e)
                continue;
              return void b("#input-" + k + ", #input-" + e).addClass("board-cell--error")
            }
          a.siblings(".candidates").html(Z(h)),
            N[e].candidates = h,
            N[e].val = g,
            U() && (F = !0,
              d("user finished board!"),
              "function" == typeof c.boardFinishedFn && c.boardFinishedFn({}))
        } else
          G = !1,
            g = null,
            h = O.slice(),
            a.siblings(".candidates").html(Z(h)),
            N[e].val = g,
            ia(),
            f();
        b("#input-" + e).hasClass("board-cell--error") && z.removeClass("board-cell--error"),
          "function" == typeof c.boardUpdatedFn && c.boardUpdatedFn({
            cause: "user input",
            cellsUpdated: [e]
          }),
          H = !1
      }, wa = function () {
        I = !0,
          B = w;
        for (var a = JSON.parse(JSON.stringify(M)), b = JSON.parse(JSON.stringify(N)), c = !0; c;) {
          var d = H ? 2 : 0;
          c = sa(d)
        }
        var e = {};
        if (G)
          e.error = "Board incorrect";
        else {
          e.finished = F,
            e.usedStrategies = [];
          for (var f = 0; f < M.length; f++) {
            var g = L[f];
            "undefined" != typeof M[f] && (e.usedStrategies[f] = {
              title: g.title,
              freq: M[f]
            })
          }
          if (F) {
            var h = T(M);
            e.level = h.level,
              e.score = h.score
          }
        }
        return fa(),
          M = a,
          N = b,
          e
      }, xa = function (a, b) {
        f();
        var c = K && K[a]
          , d = N[a].candidates.filter(function (a) {
            return !a || c && R(c, a) ? !1 : a
          });
        if (0 === d.length)
          return !1;
        var e = Math.round(Math.random() * (d.length - 1))
          , g = d[e];
        return ja(a, g),
          !0
      }, ya = function (a) {
        if (a + 1 > y * y)
          return K = [],
            !0;
        if (!xa(a)) {
          if (0 >= a)
            return !1;
          var b = a - 1;
          return K[b] = K[b] || [],
            K[b].push(N[b].val),
            ja(b, null),
            ia(!1),
            K[a] = [],
            ya(b),
            !1
        }
        ya(a + 1)
      }, za = function (a) {
        return a.level === r ? !0 : a.level === s ? C !== r : a.level === t ? C !== r && C !== s : a.level === u ? C !== r && C !== s && C !== t : void 0
      }, Aa = function (a) {
        return C === r ? !0 : C === s ? a.level !== r : C === t ? a.level !== r && a.level !== s : C === u ? a.level !== r && a.level !== s && a.level !== t : void 0
      }, Ba = function () {
        var a = []
          , b = y * y
          , c = 17;
        C === r ? c = 40 : C === s && (c = 30);
        for (var d = 0; y * y > d; d++)
          a.push(d);
        for (; a.length > 0 && b > c;) {
          var e = Math.round(Math.random() * (a.length - 1))
            , f = a.splice(e, 1)
            , g = N[f].val;
          ja(f, null),
            ia(!1);
          var h = wa();
          h.finished !== !1 && za(h) ? b-- : ja(f, g)
        }
      }, Ca = function (a, b) {
        z && ga(),
          C = R(x, a) ? a : s,
          J = !0,
          B = w,
          ya(0);
        for (var c = N.slice(), d = !0; d;) {
          Ba();
          var e = wa();
          Aa(e) ? d = !1 : N = c
        }
        B = v,
          z && $(),
          f(),
          "function" == typeof b && b()
      };
      c.board ? (N = c.board,
        W(),
        X(),
        f()) : (W(),
          Ca(c.difficulty),
          X()),
        z.on("keyup", function (a) {
          var c = b(this)
            , d = parseInt(c.attr("id").replace("input-", ""));
          a.keyCode >= 37 && a.keyCode <= 40 && ta(d, a.keyCode)
        }),
        z.on("change", function () {
          var a = b(this)
            , c = parseInt(a.attr("id").replace("input-", ""));
          va(a, c)
        });
      var Da = function () {
        B = w;
        for (var a = !0; a;) {
          var b = H ? 2 : 0;
          a = sa(b)
        }
      }
        , Ea = function () {
          B = v;
          var a = H ? 2 : 0;
          sa(a)
        }
        , Fa = function () {
          return N
        }
        , Ga = function (a) {
          N = a,
            W(),
            f(),
            $(!1)
        }
        , Ha = function () {
          Q.removeClass("showCandidates"),
            D = !1
        }
        , Ia = function () {
          Q.addClass("showCandidates"),
            D = !0
        }
        , Ja = function (a) {
          E = a
        };
      return {
        solveAll: Da,
        solveStep: Ea,
        analyzeBoard: wa,
        clearBoard: ga,
        getBoard: Fa,
        setBoard: Ga,
        hideCandidates: Ha,
        showCandidates: Ia,
        setEditingCandidates: Ja,
        generateBoard: Ca
      }
    }
  }(window, jQuery);
var hasNativePromise = "Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise;
"localhost:8000" !== window.location.host && hasNativePromise && "serviceWorker" in navigator && navigator.serviceWorker.register("sw.js");
var CONGRAT_TEXTS = ["Good job!", "Nice one", "Got another one", "Sweet", "Awesome", "You're good at this"];
$(document).ready(function () {
  var a, b = null, c = $("html"), d = $(".js-sudoku-board"), e = $(".js-generate-board-btn--easy"), f = $(".js-generate-board-btn--medium"), g = $(".js-generate-board-btn--hard"), h = $(".js-generate-board-btn--very-hard"), i = $(".js-analyze-board-btn"), j = $(".js-solve-step-btn"), k = $(".js-solve-all-btn"), l = $(".js-solve-log"), m = ($(".js-clear-board-btn"),
    $(".js-digit-button")), n = $(".js-toggle-candidate-mode-button"), o = $(".js-menu-open-btn"), p = $(".js-difficulty-label"), q = $(".js-modal"), r = $(".js-modal-content"), s = function (a) {
      l.html(a.cause + "\n" + l.html())
    }, t = function () {
      var a = CONGRAT_TEXTS[Math.floor(Math.random() * CONGRAT_TEXTS.length)];
      r.html('<div class="modal__title">' + a + '</div><button type="button" class="button--primary js-play-again-btn">Play again?</button> <button type="button" class="button--plain js-close-modal-btn">Cancel</button>'),
        $(".js-close-modal-btn").on("click", function () {
          q.removeClass("active")
        }),
        $(".js-play-again-btn").on("click", function () {
          x(p.html())
        }),
        q.addClass("active")
    }, u = function (a) {
      var b = a.difficultyInfo;
      b || t()
    }, v = function (a) {
      l.html(a.msg + "\n\n\n" + l.html())
    }, w = function (a) {
      var b = "";
      if (a.error)
        b = "This board can not be solved because it is incorrect.";
      else if (a.finished === !1)
        b = "Woah! \nTough board you got there!\n\nThis board requires very advanced strategies to solve, more advanced than the ones this solver uses. Or possibly, it can't even be solved.\n\nRank: Evil";
      else {
        b = "Rank: " + a.level + "\n\nThis board requires use of the following strategies: \n\n";
        for (var c = 0; c < a.usedStrategies.length; c++)
          "undefined" != typeof a.usedStrategies[c] && (b += "	-" + a.usedStrategies[c].title + "\n")
      }
      window.alert(b)
    }, x = function (a) {
      r.html("<p>Generating new board for you..</p>"),
        q.addClass("active"),
        setTimeout(function () {
          p.html(a),
            A.generateBoard(a.toLowerCase(), function () {
              q.removeClass("active")
            })
        }, 0)
    }, y = $(".js-digit-button.active:visible");
  y && (b = y.attr("data-digit-button-value")),
    dev && c.addClass("dev"),
    "16" === boardSize ? a = board16 : "4" === boardSize && (a = board4);
  var z = {
    board: a,
    boardUpdatedFn: s,
    boardFinishedFn: u,
    boardErrorFn: v,
    candidateShowToggleFn: function (a) {
      a ? n.addClass("active") : n.removeClass("active")
    }
  }
    , A = d.sudokuJS(z);
  j.on("click", function () {
    A.solveStep()
  }),
    k.on("click", function () {
      A.solveAll()
    }),
    i.on("click", function () {
      w(A.analyzeBoard())
    }),
    e.on("click", function () {
      x("Easy")
    }),
    f.on("click", function () {
      x("Medium")
    }),
    g.on("click", function () {
      x("Hard")
    }),
    h.on("click", function () {
      x("Very hard")
    }),
    n.on("click", function () {
      $this = $(this),
        $this.toggleClass("active"),
        $this.hasClass("active") ? (A.showCandidates(),
          A.setEditingCandidates(!0)) : A.setEditingCandidates(!1)
    }),
    b && (m.on("click", function () {
      m.removeClass("active");
      var a = $(this);
      a.addClass("active"),
        b = a.attr("data-digit-button-value")
    }),
      $(".sudoku-board-cell input").on("click", function (a) {
        a.preventDefault();
        var c = "C" === b ? "" : b;
        $(this).val(c).blur().trigger("change"),
          setTimeout(function () {
            window.focus()
          }, 200)
      })),
    o.on("click", function () {
      $(this).siblings(".menu").toggleClass("active");
      var a = $(".menu.active");
      a.on("click", function () {
        a.off("click"),
          a.removeClass("active")
      })
    })
});
