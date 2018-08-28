var Ployfill = {
    /**
     *扩展方法，以及兼容的垫片
     */
    init: function () {
        /**
         * 日期格式化
         */
        Date.prototype.normByFormat = function () {
            return {
                'yyyy': this.getFullYear(),
                'yy': this.getFullYear().toString().slice(-2),
                'MM': this.getMonth() + 1,
                'dd': this.getDate(),
                'hh': this.getHours(),
                'mm': this.getMinutes(),
                'ss': this.getSeconds()
            }
        }
        /**
         * 查询字符串参数
         */
        String.prototype.query = function (name) {
            var reg = new RegExp('(?:\\?|&)' + name + '=([^&#!/]+)'),
                res = this.match(reg);
            return res ? res[1] : '';
        }
        /**
         * 获取中英文长度
         */
        String.prototype.gblen = function () {
            var len = 0;
            for (var i = 0; i < this.length; i++) {
                if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            return len;
        }
        //Array的ECMA-262新标准扩展方法,兼容旧环境
        Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
            var c, d, e, f;
            if (null == this) throw new TypeError('"this" is null or not defined');
            if (d = Object(this), e = d.length >>> 0, 0 === e) return -1;
            if (f = +b || 0, 1 / 0 === Math.abs(f) && (f = 0), f >= e) return -1;
            for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); e > c;) {
                if (c in d && d[c] === a) return c;
                c++
            }
            return -1
        }), Array.prototype.filter || (Array.prototype.filter = function (a) {
            "use strict";
            var b, c, d, e, f, g;
            if (void 0 === this || null === this) throw new TypeError;
            if (b = Object(this), c = b.length >>> 0, "function" != typeof a) throw new TypeError;
            for (d = [], e = arguments.length >= 2 ? arguments[1] : void 0, f = 0; c > f; f++) f in b && (g = b[f], a.call(e, g, f, b) && d.push(g));
            return d
        }), Array.prototype.map || (Array.prototype.map = function (a, b) {
            var c, d, e, f, g, h, i;
            if (null == this) throw new TypeError(" this is null or not defined");
            if (f = Object(this), g = f.length >>> 0, "[object Function]" != Object.prototype.toString.call(a)) throw new TypeError(a + " is not a function");
            for (b && (c = b), d = new Array(g), e = 0; g > e;) e in f && (h = f[e], i = a.call(c, h, e, f), d[e] = i), e++;
            return d
        }), "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (a, b) {
            "use strict";
            if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof a) throw new TypeError(a + " is not a function");
            var c, d, e = this.length >>> 0,
                f = !1;
            for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
            if (!f) throw new TypeError("Reduce of empty array with no initial value");
            return d
        }), Array.prototype.every || (Array.prototype.every = function (a) {
            "use strict";
            var b, c, d, e;
            if (void 0 === this || null === this) throw new TypeError;
            if (b = Object(this), c = b.length >>> 0, "function" != typeof a) throw new TypeError;
            for (d = arguments.length >= 2 ? arguments[1] : void 0, e = 0; c > e; e++)
                if (e in b && !a.call(d, b[e], e, b)) return !1;
            return !0
        }), Array.prototype.find || (Array.prototype.find = function (a) {
            "use strict";
            var b, c, d, e, f;
            if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
            if ("function" != typeof a) throw new TypeError("predicate must be a function");
            for (b = Object(this), c = b.length >>> 0, d = arguments[1], f = 0; c > f; f++)
                if (e = b[f], a.call(d, e, f, b)) return e;
            return void 0
        }), Array.prototype.findIndex || (Array.prototype.findIndex = function (a) {
            var b, c, d, e, f;
            if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
            if ("function" != typeof a) throw new TypeError("predicate must be a function");
            for (b = Object(this), c = b.length >>> 0, d = arguments[1], f = 0; c > f; f++)
                if (e = b[f], a.call(d, e, f, b)) return f;
            return -1
        }), Array.prototype.includes || (Array.prototype.includes = function (a) {
            "use strict";
            var b, c, d, e, f;
            if (null == this) throw new TypeError("Array.prototype.includes called on null or undefined");
            if (b = Object(this), c = parseInt(b.length, 10) || 0, 0 === c) return !1;
            for (d = parseInt(arguments[1], 10) || 0, d >= 0 ? e = d : (e = c + d, 0 > e && (e = 0)); c > e;) {
                if (f = b[e], a === f || a !== a && f !== f) return !0;
                e++
            }
            return !1
        }), Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
            var c, d, e, f, g;
            if (null == this) throw new TypeError(" this is null or not defined");
            if (e = Object(this), f = e.length >>> 0, "function" != typeof a) throw new TypeError(a + " is not a function");
            for (arguments.length > 1 && (c = b), d = 0; f > d;) d in e && (g = e[d], a.call(c, g, d, e)), d++
        });

        //数组交集
        Array.intersection = function (array) {
            if (array == null) return [];
            var result = [];
            var argsLength = arguments.length;
            for (var i = 0, length = array.length; i < length; i++) {
                var item = array[i];
                if (result.indexOf(item) > -1) continue;
                for (var j = 1; j < argsLength; j++) {
                    if (arguments[j].indexOf(item) < 0) break;
                }
                if (j === argsLength) result.push(item);
            }
            return result;
        };
        Array.prototype.removeEmptyEle = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == undefined) {
                    arr.splice(i, 1);
                    i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                    // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
                }
            }
            return arr;
        };
    }
}
Ployfill.init();
module.exports = Ployfill;