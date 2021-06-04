/* eslint-disable */
!(function(e) {
  if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = e() } else if (typeof define === 'function' && define.amd) { define([], e) } else {
    var t;
    ((t = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this).ybzl || (t.ybzl = {})).SM4 = e()
  }
}(function() {
  return (function o(u, a, s) {
    function f(t, e) {
      if (!a[t]) {
        if (!u[t]) {
          var r = typeof require === 'function' && require
          if (!e && r) { return r(t, !0) }
          if (c) { return c(t, !0) }
          var n = new Error("Cannot find module '" + t + "'")
          throw n.code = 'MODULE_NOT_FOUND',
          n
        }
        var i = a[t] = {
          exports: {}
        }
        u[t][0].call(i.exports, function(e) {
          return f(u[t][1][e] || e)
        }, i, i.exports, o, u, a, s)
      }
      return a[t].exports
    }
    for (var c = typeof require === 'function' && require, e = 0; e < s.length; e++) { f(s[e]) }
    return f
  }({
    1: [function(e, t, r) {
      'use strict'
      r.byteLength = function(e) {
        var t = p(e)
        var r = t[0]
        var n = t[1]
        return 3 * (r + n) / 4 - n
      }
      ,
      r.toByteArray = function(e) {
        var t; var r; var n = p(e); var i = n[0]; var o = n[1]; var u = new y((f = i,
        c = o,
        3 * (f + c) / 4 - c)); var a = 0; var s = o > 0 ? i - 4 : i
        var f, c
        for (r = 0; r < s; r += 4) {
          t = l[e.charCodeAt(r)] << 18 | l[e.charCodeAt(r + 1)] << 12 | l[e.charCodeAt(r + 2)] << 6 | l[e.charCodeAt(r + 3)],
          u[a++] = t >> 16 & 255,
          u[a++] = t >> 8 & 255,
          u[a++] = 255 & t
        }
        o === 2 && (t = l[e.charCodeAt(r)] << 2 | l[e.charCodeAt(r + 1)] >> 4,
        u[a++] = 255 & t)
        o === 1 && (t = l[e.charCodeAt(r)] << 10 | l[e.charCodeAt(r + 1)] << 4 | l[e.charCodeAt(r + 2)] >> 2,
        u[a++] = t >> 8 & 255,
        u[a++] = 255 & t)
        return u
      }
      ,
      r.fromByteArray = function(e) {
        for (var t, r = e.length, n = r % 3, i = [], o = 0, u = r - n; o < u; o += 16383) { i.push(s(e, o, u < o + 16383 ? u : o + 16383)) }
        n === 1 ? (t = e[r - 1],
        i.push(a[t >> 2] + a[t << 4 & 63] + '==')) : n === 2 && (t = (e[r - 2] << 8) + e[r - 1],
        i.push(a[t >> 10] + a[t >> 4 & 63] + a[t << 2 & 63] + '='))
        return i.join('')
      }

      for (var a = [], l = [], y = typeof Uint8Array !== 'undefined' ? Uint8Array : Array, n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', i = 0, o = n.length; i < o; ++i) {
        a[i] = n[i],
        l[n.charCodeAt(i)] = i
      }
      function p(e) {
        var t = e.length
        if (t % 4 > 0) { throw new Error('Invalid string. Length must be a multiple of 4') }
        var r = e.indexOf('=')
        return r === -1 && (r = t),
        [r, r === t ? 0 : 4 - r % 4]
      }
      function s(e, t, r) {
        for (var n, i, o = [], u = t; u < r; u += 3) {
          n = (e[u] << 16 & 16711680) + (e[u + 1] << 8 & 65280) + (255 & e[u + 2]),
          o.push(a[(i = n) >> 18 & 63] + a[i >> 12 & 63] + a[i >> 6 & 63] + a[63 & i])
        }
        return o.join('')
      }
      l['-'.charCodeAt(0)] = 62,
      l['_'.charCodeAt(0)] = 63
    },
    {}],
    2: [function(e, t, r) {
      typeof Object.create === 'function' ? t.exports = function(e, t) {
        e.super_ = t,
        e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
      }
        : t.exports = function(e, t) {
          e.super_ = t
          var r = function() {}
          r.prototype = t.prototype,
          e.prototype = new r(),
          e.prototype.constructor = e
        }
    },
    {}],
    3: [function(e, t, r) {
      var n; var i; var o = t.exports = {}
      function u() {
        throw new Error('setTimeout has not been defined')
      }
      function a() {
        throw new Error('clearTimeout has not been defined')
      }
      function s(t) {
        if (n === setTimeout) { return setTimeout(t, 0) }
        if ((n === u || !n) && setTimeout) {
          return n = setTimeout,
          setTimeout(t, 0)
        }
        try {
          return n(t, 0)
        } catch (e) {
          try {
            return n.call(null, t, 0)
          } catch (e) {
            return n.call(this, t, 0)
          }
        }
      }
      !(function() {
        try {
          n = typeof setTimeout === 'function' ? setTimeout : u
        } catch (e) {
          n = u
        }
        try {
          i = typeof clearTimeout === 'function' ? clearTimeout : a
        } catch (e) {
          i = a
        }
      }())
      var f; var c = []; var l = !1; var y = -1
      function p() {
        l && f && (l = !1,
        f.length ? c = f.concat(c) : y = -1,
        c.length && h())
      }
      function h() {
        if (!l) {
          var e = s(p)
          l = !0
          for (var t = c.length; t;) {
            for (f = c,
            c = []; ++y < t;) { f && f[y].run() }
            y = -1,
            t = c.length
          }
          f = null,
          l = !1,
          (function(t) {
            if (i === clearTimeout) { return clearTimeout(t) }
            if ((i === a || !i) && clearTimeout) {
              return i = clearTimeout,
              clearTimeout(t)
            }
            try {
              i(t)
            } catch (e) {
              try {
                return i.call(null, t)
              } catch (e) {
                return i.call(this, t)
              }
            }
          }(e))
        }
      }
      function d(e, t) {
        this.fun = e,
        this.array = t
      }
      function v() {}
      o.nextTick = function(e) {
        var t = new Array(arguments.length - 1)
        if (arguments.length > 1) {
          for (var r = 1; r < arguments.length; r++) { t[r - 1] = arguments[r] }
        }
        c.push(new d(e, t)),
        c.length !== 1 || l || s(h)
      }
      ,
      d.prototype.run = function() {
        this.fun.apply(null, this.array)
      }
      ,
      o.title = 'browser',
      o.browser = !0,
      o.env = {},
      o.argv = [],
      o.version = '',
      o.versions = {},
      o.on = v,
      o.addListener = v,
      o.once = v,
      o.off = v,
      o.removeListener = v,
      o.removeAllListeners = v,
      o.emit = v,
      o.prependListener = v,
      o.prependOnceListener = v,
      o.listeners = function(e) {
        return []
      }
      ,
      o.binding = function(e) {
        throw new Error('process.binding is not supported')
      }
      ,
      o.cwd = function() {
        return '/'
      }
      ,
      o.chdir = function(e) {
        throw new Error('process.chdir is not supported')
      }
      ,
      o.umask = function() {
        return 0
      }
    },
    {}],
    4: [function(e, t, r) {
      t.exports = function(e) {
        return e && typeof e === 'object' && typeof e.copy === 'function' && typeof e.fill === 'function' && typeof e.readUInt8 === 'function'
      }
    },
    {}],
    5: [function(y, e, O) {
      (function(n, i) {
        var a = /%[sdj%]/g
        O.format = function(e) {
          if (!b(e)) {
            for (var t = [], r = 0; r < arguments.length; r++) { t.push(s(arguments[r])) }
            return t.join(' ')
          }
          r = 1
          for (var n = arguments, i = n.length, o = String(e).replace(a, function(e) {
              if (e === '%%') { return '%' }
              if (i <= r) { return e }
              switch (e) {
                case '%s':
                  return String(n[r++])
                case '%d':
                  return Number(n[r++])
                case '%j':
                  try {
                    return JSON.stringify(n[r++])
                  } catch (e) {
                    return '[Circular]'
                  }
                default:
                  return e
              }
            }), u = n[r]; r < i; u = n[++r]) { m(u) || !c(u) ? o += ' ' + u : o += ' ' + s(u) }
          return o
        }
        ,
        O.deprecate = function(e, t) {
          if (T(i.process)) {
            return function() {
              return O.deprecate(e, t).apply(this, arguments)
            }
          }
          if (!0 === n.noDeprecation) { return e }
          var r = !1
          return function() {
            if (!r) {
              if (n.throwDeprecation) { throw new Error(t) }
              n.traceDeprecation ? console.trace(t) : console.error(t),
              r = !0
            }
            return e.apply(this, arguments)
          }
        }

        var e; var o = {}
        function s(e, t) {
          var r = {
            seen: [],
            stylize: f
          }
          return arguments.length >= 3 && (r.depth = arguments[2]),
          arguments.length >= 4 && (r.colors = arguments[3]),
          g(t) ? r.showHidden = t : t && O._extend(r, t),
          T(r.showHidden) && (r.showHidden = !1),
          T(r.depth) && (r.depth = 2),
          T(r.colors) && (r.colors = !1),
          T(r.customInspect) && (r.customInspect = !0),
          r.colors && (r.stylize = u),
          p(r, e, r.depth)
        }
        function u(e, t) {
          var r = s.styles[t]
          return r ? '[' + s.colors[r][0] + 'm' + e + '[' + s.colors[r][1] + 'm' : e
        }
        function f(e, t) {
          return e
        }
        function p(t, r, n) {
          if (t.customInspect && r && x(r.inspect) && r.inspect !== O.inspect && (!r.constructor || r.constructor.prototype !== r)) {
            var e = r.inspect(n, t)
            return b(e) || (e = p(t, e, n)),
            e
          }
          var i = (function(e, t) {
            if (T(t)) { return e.stylize('undefined', 'undefined') }
            if (b(t)) {
              var r = "'" + JSON.stringify(t).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'"
              return e.stylize(r, 'string')
            }
            if (w(t)) { return e.stylize('' + t, 'number') }
            if (g(t)) { return e.stylize('' + t, 'boolean') }
            if (m(t)) { return e.stylize('null', 'null') }
          }(t, r))
          if (i) { return i }
          var o; var u = Object.keys(r); var a = (o = {},
          u.forEach(function(e, t) {
            o[e] = !0
          }),
          o)
          if (t.showHidden && (u = Object.getOwnPropertyNames(r)),
          U(r) && (u.indexOf('message') >= 0 || u.indexOf('description') >= 0)) { return h(r) }
          if (u.length === 0) {
            if (x(r)) {
              var s = r.name ? ': ' + r.name : ''
              return t.stylize('[Function' + s + ']', 'special')
            }
            if (k(r)) { return t.stylize(RegExp.prototype.toString.call(r), 'regexp') }
            if (A(r)) { return t.stylize(Date.prototype.toString.call(r), 'date') }
            if (U(r)) { return h(r) }
          }
          var f; var c = ''; var l = !1; var y = ['{', '}'];
          (v(r) && (l = !0,
          y = ['[', ']']),
          x(r)) && (c = ' [Function' + (r.name ? ': ' + r.name : '') + ']')
          return k(r) && (c = ' ' + RegExp.prototype.toString.call(r)),
          A(r) && (c = ' ' + Date.prototype.toUTCString.call(r)),
          U(r) && (c = ' ' + h(r)),
          u.length !== 0 || l && r.length != 0 ? n < 0 ? k(r) ? t.stylize(RegExp.prototype.toString.call(r), 'regexp') : t.stylize('[Object]', 'special') : (t.seen.push(r),
          f = l ? (function(t, r, n, i, e) {
            for (var o = [], u = 0, a = r.length; u < a; ++u) { B(r, String(u)) ? o.push(d(t, r, n, i, String(u), !0)) : o.push('') }
            return e.forEach(function(e) {
              e.match(/^\d+$/) || o.push(d(t, r, n, i, e, !0))
            }),
            o
          }(t, r, n, a, u)) : u.map(function(e) {
            return d(t, r, n, a, e, l)
          }),
          t.seen.pop(),
          (function(e, t, r) {
            if (e.reduce(function(e, t) {
              return 0,
              t.indexOf('\n') >= 0 && 0,
              e + t.replace(/\u001b\[\d\d?m/g, '').length + 1
            }, 0) > 60) { return r[0] + (t === '' ? '' : t + '\n ') + ' ' + e.join(',\n  ') + ' ' + r[1] }
            return r[0] + t + ' ' + e.join(', ') + ' ' + r[1]
          }(f, c, y))) : y[0] + c + y[1]
        }
        function h(e) {
          return '[' + Error.prototype.toString.call(e) + ']'
        }
        function d(e, t, r, n, i, o) {
          var u, a, s
          if ((s = Object.getOwnPropertyDescriptor(t, i) || {
            value: t[i]
          }).get ? a = s.set ? e.stylize('[Getter/Setter]', 'special') : e.stylize('[Getter]', 'special') : s.set && (a = e.stylize('[Setter]', 'special')),
          B(n, i) || (u = '[' + i + ']'),
          a || (e.seen.indexOf(s.value) < 0 ? (a = m(r) ? p(e, s.value, null) : p(e, s.value, r - 1)).indexOf('\n') > -1 && (a = o ? a.split('\n').map(function(e) {
            return '  ' + e
          }).join('\n').substr(2) : '\n' + a.split('\n').map(function(e) {
            return '   ' + e
          }).join('\n')) : a = e.stylize('[Circular]', 'special')),
          T(u)) {
            if (o && i.match(/^\d+$/)) { return a }
            u = (u = JSON.stringify('' + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (u = u.substr(1, u.length - 2),
            e.stylize(u, 'name')) : (u = u.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
            e.stylize(u, 'string'))
          }
          return u + ': ' + a
        }
        function v(e) {
          return Array.isArray(e)
        }
        function g(e) {
          return typeof e === 'boolean'
        }
        function m(e) {
          return e === null
        }
        function w(e) {
          return typeof e === 'number'
        }
        function b(e) {
          return typeof e === 'string'
        }
        function T(e) {
          return void 0 === e
        }
        function k(e) {
          return c(e) && t(e) === '[object RegExp]'
        }
        function c(e) {
          return typeof e === 'object' && e !== null
        }
        function A(e) {
          return c(e) && t(e) === '[object Date]'
        }
        function U(e) {
          return c(e) && (t(e) === '[object Error]' || e instanceof Error)
        }
        function x(e) {
          return typeof e === 'function'
        }
        function t(e) {
          return Object.prototype.toString.call(e)
        }
        function r(e) {
          return e < 10 ? '0' + e.toString(10) : e.toString(10)
        }
        O.debuglog = function(t) {
          if (T(e) && (e = n.env.NODE_DEBUG || ''),
          t = t.toUpperCase(),
          !o[t]) {
            if (new RegExp('\\b' + t + '\\b', 'i').test(e)) {
              var r = n.pid
              o[t] = function() {
                var e = O.format.apply(O, arguments)
                console.error('%s %d: %s', t, r, e)
              }
            } else { o[t] = function() {} }
          }

          return o[t]
        }
        ,
        (O.inspect = s).colors = {
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          white: [37, 39],
          grey: [90, 39],
          black: [30, 39],
          blue: [34, 39],
          cyan: [36, 39],
          green: [32, 39],
          magenta: [35, 39],
          red: [31, 39],
          yellow: [33, 39]
        },
        s.styles = {
          special: 'cyan',
          number: 'yellow',
          boolean: 'yellow',
          undefined: 'grey',
          null: 'bold',
          string: 'green',
          date: 'magenta',
          regexp: 'red'
        },
        O.isArray = v,
        O.isBoolean = g,
        O.isNull = m,
        O.isNullOrUndefined = function(e) {
          return e == null
        }
        ,
        O.isNumber = w,
        O.isString = b,
        O.isSymbol = function(e) {
          return typeof e === 'symbol'
        }
        ,
        O.isUndefined = T,
        O.isRegExp = k,
        O.isObject = c,
        O.isDate = A,
        O.isError = U,
        O.isFunction = x,
        O.isPrimitive = function(e) {
          return e === null || typeof e === 'boolean' || typeof e === 'number' || typeof e === 'string' || typeof e === 'symbol' || void 0 === e
        }
        ,
        O.isBuffer = y('./support/isBuffer')
        var l = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        function B(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }
        O.log = function() {
          var e, t
          console.log('%s - %s', (e = new Date(),
          t = [r(e.getHours()), r(e.getMinutes()), r(e.getSeconds())].join(':'),
          [e.getDate(), l[e.getMonth()], t].join(' ')), O.format.apply(O, arguments))
        }
        ,
        O.inherits = y('inherits'),
        O._extend = function(e, t) {
          if (!t || !c(t)) { return e }
          for (var r = Object.keys(t), n = r.length; n--;) { e[r[n]] = t[r[n]] }
          return e
        }
      }
      ).call(this, y('_process'), typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
    },
    {
      './support/isBuffer': 4,
      _process: 3,
      inherits: 2
    }],
    6: [function(t, e, r) {
      'use strict'
      var n = (function() {
        function n(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r]
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            'value' in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
          }
        }
        return function(e, t, r) {
          return t && n(e.prototype, t),
          r && n(e, r),
          e
        }
      }())
      var i = t('base64-js')
      var o = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) { throw new TypeError('Cannot call a class as a function') }
          }(this, e))
        }
        return n(e, null, [{
          key: 'stringToArrayBufferInUtf8',
          value: function(e) {
            return (new (typeof window === 'undefined' ? t('util').TextEncoder : window.TextEncoder)()).encode(e)
          }
        }, {
          key: 'utf8ArrayBufferToString',
          value: function(e) {
            return new (typeof window === 'undefined' ? t('util').TextDecoder : window.TextDecoder)('utf-8').decode(e)
          }
        }, {
          key: 'arrayBufferToBase64',
          value: function(e) {
            return i.fromByteArray(e)
          }
        }, {
          key: 'base64ToArrayBuffer',
          value: function(e) {
            return i.toByteArray(e)
          }
        }]),
        e
      }())
      e.exports = o
    },
    {
      'base64-js': 1,
      util: 5
    }],
    7: [function(e, t, r) {
      'use strict'
      var i = (function() {
        function n(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r]
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            'value' in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
          }
        }
        return function(e, t, r) {
          return t && n(e.prototype, t),
          r && n(e, r),
          e
        }
      }())
      var g = e('./crypt')
      var o = Uint8Array.from([214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72])
      var u = Uint32Array.from([462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257])
      var a = Uint32Array.from([2746333894, 1453994832, 1736282519, 2993693404])
      var n = (function() {
        // use
        function n(e) {
          !(function(e, t) {
            if (!(e instanceof t)) { throw new TypeError('Cannot call a class as a function') }
          }(this, n))
          var t = g.stringToArrayBufferInUtf8(e.key)
          if (t.length !== 16) { throw new Error('key should be a 16 bytes string') }
          this.key = t
          var r = new Uint8Array(0)
          if (void 0 !== e.iv && e.iv !== null && (r = g.stringToArrayBufferInUtf8(e.iv)).length !== 16) { throw new Error('iv should be a 16 bytes string') }
          this.iv = r,
          [this.mode = 'cbc', 'ecb'].indexOf(e.mode) >= 0 && (this.mode = e.mode),
          [this.cipherType = 'base64', 'text'].indexOf(e.outType) >= 0 && (this.cipherType = e.outType),
          this.encryptRoundKeys = new Uint32Array(32),
          this.spawnEncryptRoundKeys(),
          this.decryptRoundKeys = Uint32Array.from(this.encryptRoundKeys),
          this.decryptRoundKeys.reverse()
        }
        return i(n, [{
          key: 'doBlockCrypt',
          value: function(e, t) {
            var r = new Uint32Array(36)
            r.set(e, 0)
            for (var n = 0; n < 32; n++) { r[n + 4] = r[n] ^ this.tTransform1(r[n + 1] ^ r[n + 2] ^ r[n + 3] ^ t[n]) }
            var i = new Uint32Array(4)
            return i[0] = r[35],
            i[1] = r[34],
            i[2] = r[33],
            i[3] = r[32],
            i
          }
        }, {
          key: 'spawnEncryptRoundKeys',
          value: function() {
            var e = new Uint32Array(4)
            e[0] = this.key[0] << 24 | this.key[1] << 16 | this.key[2] << 8 | this.key[3],
            e[1] = this.key[4] << 24 | this.key[5] << 16 | this.key[6] << 8 | this.key[7],
            e[2] = this.key[8] << 24 | this.key[9] << 16 | this.key[10] << 8 | this.key[11],
            e[3] = this.key[12] << 24 | this.key[13] << 16 | this.key[14] << 8 | this.key[15]
            var t = new Uint32Array(36)
            t[0] = e[0] ^ a[0],
            t[1] = e[1] ^ a[1],
            t[2] = e[2] ^ a[2],
            t[3] = e[3] ^ a[3]
            for (var r = 0; r < 32; r++) {
              t[r + 4] = t[r] ^ this.tTransform2(t[r + 1] ^ t[r + 2] ^ t[r + 3] ^ u[r]),
              this.encryptRoundKeys[r] = t[r + 4]
            }
          }
        }, {
          key: 'rotateLeft',
          value: function(e, t) {
            return e << t | e >>> 32 - t
          }
        }, {
          key: 'linearTransform1',
          value: function(e) {
            return e ^ this.rotateLeft(e, 2) ^ this.rotateLeft(e, 10) ^ this.rotateLeft(e, 18) ^ this.rotateLeft(e, 24)
          }
        }, {
          key: 'linearTransform2',
          value: function(e) {
            return e ^ this.rotateLeft(e, 13) ^ this.rotateLeft(e, 23)
          }
        }, {
          key: 'tauTransform',
          value: function(e) {
            return o[e >>> 24 & 255] << 24 | o[e >>> 16 & 255] << 16 | o[e >>> 8 & 255] << 8 | o[255 & e]
          }
        }, {
          key: 'tTransform1',
          value: function(e) {
            var t = this.tauTransform(e)
            return this.linearTransform1(t)
          }
        }, {
          key: 'tTransform2',
          value: function(e) {
            var t = this.tauTransform(e)
            return this.linearTransform2(t)
          }
        }, {
          key: 'padding',
          value: function(e) {
            if (e === null) { return null }
            var t = 16 - e.length % 16
            var r = new Uint8Array(e.length + t)
            return r.set(e, 0),
            r.fill(t, e.length),
            r
          }
        }, {
          key: 'dePadding',
          value: function(e) {
            if (e === null) { return null }
            var t = e[e.length - 1]
            return e.slice(0, e.length - t)
          }
        }, {
          key: 'uint8ToUint32Block',
          value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
            var r = new Uint32Array(4)
            return r[0] = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3],
            r[1] = e[t + 4] << 24 | e[t + 5] << 16 | e[t + 6] << 8 | e[t + 7],
            r[2] = e[t + 8] << 24 | e[t + 9] << 16 | e[t + 10] << 8 | e[t + 11],
            r[3] = e[t + 12] << 24 | e[t + 13] << 16 | e[t + 14] << 8 | e[t + 15],
            r
          }
        }, {
          key: 'encrypt',
          value: function(e) {
            var t = g.stringToArrayBufferInUtf8(e)
            var r = this.padding(t)
            var n = r.length / 16
            var i = new Uint8Array(r.length)
            if (this.mode === 'cbc') {
              if (this.iv === null || this.iv.length !== 16) { throw new Error('iv error') }
              for (var o = this.uint8ToUint32Block(this.iv), u = 0; u < n; u++) {
                var a = 16 * u
                var s = this.uint8ToUint32Block(r, a)
                o[0] = o[0] ^ s[0],
                o[1] = o[1] ^ s[1],
                o[2] = o[2] ^ s[2],
                o[3] = o[3] ^ s[3]
                var f = this.doBlockCrypt(o, this.encryptRoundKeys)
                o = f
                for (var c = 0; c < 16; c++) { i[a + c] = f[parseInt(c / 4)] >> (3 - c) % 4 * 8 & 255 }
              }
            } else {
              for (var l = 0; l < n; l++) {
                for (var y = 16 * l, p = this.uint8ToUint32Block(r, y), h = this.doBlockCrypt(p, this.encryptRoundKeys), d = 0; d < 16; d++) { i[y + d] = h[parseInt(d / 4)] >> (3 - d) % 4 * 8 & 255 }
              }
            }
            return this.cipherType === 'base64' ? g.arrayBufferToBase64(i) : g.utf8ArrayBufferToString(i)
          }
        }, {
          key: 'decrypt',
          value: function(e) {
            var t = new Uint8Array()
            var r = (t = this.cipherType === 'base64' ? g.base64ToArrayBuffer(e) : g.stringToArrayBufferInUtf8(e)).length / 16
            var n = new Uint8Array(t.length)
            if (this.mode === 'cbc') {
              if (this.iv === null || this.iv.length !== 16) { throw new Error('iv error') }
              for (var i = this.uint8ToUint32Block(this.iv), o = 0; o < r; o++) {
                var u = 16 * o
                var a = this.uint8ToUint32Block(t, u)
                var s = this.doBlockCrypt(a, this.decryptRoundKeys)
                var f = new Uint32Array(4)
                f[0] = i[0] ^ s[0],
                f[1] = i[1] ^ s[1],
                f[2] = i[2] ^ s[2],
                f[3] = i[3] ^ s[3],
                i = a
                for (var c = 0; c < 16; c++) { n[u + c] = f[parseInt(c / 4)] >> (3 - c) % 4 * 8 & 255 }
              }
            } else {
              for (var l = 0; l < r; l++) {
                for (var y = 16 * l, p = this.uint8ToUint32Block(t, y), h = this.doBlockCrypt(p, this.decryptRoundKeys), d = 0; d < 16; d++) { n[y + d] = h[parseInt(d / 4)] >> (3 - d) % 4 * 8 & 255 }
              }
            }
            var v = this.dePadding(n)
            return g.utf8ArrayBufferToString(v)
          }
        }]),
        n
      }())
      t.exports = n
    },
    {
      './crypt': 6
    }]
  }, {}, [7]))(7)
}))
