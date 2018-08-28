var Ployfill = require('./ployfill')
var Util = {
    //输出日志
    log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    formatDate: function (formatStr, dateObj, addDays) {
        var date = dateObj;
        var dateMaps = {
            d: function (str, date, key) {
                var d = date.getDate().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            m: function (str, date, key) {
                var d = (date.getMonth() + 1).toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            Y: function (str, date, key) {
                return str.replace(new RegExp(key, "mg"), date.getFullYear())
            },
            H: function (str, date, key) {
                var d = date.getHours().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            i: function (str, date, key) {
                var d = date.getMinutes().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            },
            s: function (str, date, key) {
                var d = date.getSeconds().toString();
                if (d.length < 2) {
                    d = "0" + d
                }
                return str.replace(new RegExp(key, "mg"), d)
            }
        };

        function addDay(n) {
            n = n || 0;
            date.setDate(date.getDate() + n);
            return date
        }

        function format(format) {
            if (typeof format !== "string") {
                format = ""
            }
            for (var key in dateMaps) {
                format = dateMaps[key].call(this, format, date, key)
            }
            return format
        }

        if (addDays) {
            date = addDay(addDays);
            return format(formatStr)
        }
        return format(formatStr)
    },
    /** 
     * 字符串转时间（yyyy-MM-dd HH:mm:ss） 
     * result （分钟） 
     */
    stringToDate: function (fDate) {
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
    },
    isWeChat: function () {
        if (window.navigator.userAgent.toLowerCase().match("micromessenger") || !!window.navigator.userAgent.match("MicroMessenger")) {
            return true
        }
        return false
    },
    getHostName: function (url) {
        var e = new RegExp("^(?:(?:https?|ftp):)?\/\/(?:[^@]+@)?([^:/#]+)", 'i'),
            matches = e.exec(url);
        return matches ? matches[1] : url;
    },

    getAbsUrl: function (url) {
        var a = document.createElement('a');
        a.href = url;

        var _result = /^(?:https?|ftp):\/\//i.test(a.href) ? a.href : a.getAttribute('href', 4);

        return _result ? _result : '';
    },

    parseURI: function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        // authority = '//' + user + ':' + pass '@' + hostname + ':' port
        return (m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null);
    },
    base64: function () {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else {
                    if (isNaN(chr3)) {
                        enc4 = 64
                    }
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
            }
            return output
        };
        var decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }
            output = _utf8_decode(output);
            return output
        };

        function _utf8_encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else {
                    if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128)
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128)
                    }
                }
            }
            return utftext
        }

        function _utf8_decode(utftext) {
            var string = "";
            var i = 0;
            var c = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++
                } else {
                    if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3
                    }
                }
            }
            return string
        }

        return {
            encode: encode,
            decode: decode
        }
    },
    //删除url参数
    delURIParam: function (url, paramKey) {

        if (!url) return '';

        var hashMatch = url.match(/\!?\#[\s\S]*$/);
        var hashUrl = '';

        if (hashMatch && hashMatch.length > 0) {
            hashUrl = hashMatch[0];
            url = url.replace(hashUrl, '');
        }

        var urlParam = (url.indexOf("?") <= -1) ? '' : url.substr(url.indexOf('?') + 1);
        var beforeUrl = (url.indexOf("?") <= -1) ? url : url.substr(0, url.indexOf('?'));
        var nextUrl = '';

        var arr = new Array();
        var tempParamArr;

        if (urlParam != '') {
            var urlParamArr = urlParam.split('&');

            for (var i = 0; i < urlParamArr.length; i++) {
                tempParamArr = urlParamArr[i].split('=');
                if (tempParamArr[0] != paramKey) {
                    arr.push(urlParamArr[i]);
                }
            }
        }

        if (arr.length > 0) {
            nextUrl = "?" + arr.join("&");
        }
        url = beforeUrl + nextUrl + hashUrl;
        return url;
    },
    //增加URL参数
    addURIParam: function (url, paramKey, paramVal) {

        if (!url) return '';

        var hashMatch = url.match(/\!?\#[\s\S]*$/);
        var hashUrl = '';

        if (hashMatch && hashMatch.length > 0) {
            hashUrl = hashMatch[0];
            url = url.replace(hashUrl, '');
        }

        var andStr = "?";
        var beforeparam = url.indexOf("?");
        if (beforeparam != -1) {
            andStr = "&";
        }
        return url + andStr + paramKey + "=" + encodeURIComponent(paramVal) + hashUrl;
    },

    editUrlParam: function (url, paramKey, paramVal) {

        if (!url) return '';

        var _current_url = this.delURIParam(url, paramKey);

        return this.addURIParam(_current_url, paramKey, paramVal);

    },
    queryUrlParam: function (name) {
        return window.location.href.query(name);
    },
    setCookie: function (name, value, expiredays, domain, path) {
        var Days = (parseInt(expiredays) && parseInt(expiredays) > 0) ? parseInt(expiredays) : 30,
            exp = new Date();

        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

        var _str = name + '=' + encodeURIComponent(value) + ';expires= ' + exp.toGMTString();

        if (domain) {
            _str += '; domain=' + domain;
        }

        if (path) {
            _str += '; path=' + path;
        } else {
            _str += '; path=/';
        }

        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + _str;
    },
    //读取cookies
    getCookie: function (name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg)) {
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    },
    //删除cookies
    delCookie: function (name) {
        var self = this,
            exp = new Date();

        exp.setTime(exp.getTime() - 1);

        var cval = self.getCookie(name);

        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },

    lStorage: {
        setItem: function (_key, _val) {
            "object" == typeof localStorage ? localStorage.setItem(_key, _val) : Util.setCookie(_key, _val, 366, "", "/");
        },
        getItem: function (_key) {
            return "object" == typeof localStorage ? localStorage.getItem(_key) : Util.getCookie(_key);
        },
        removeItem: function (_key) {
            "object" == typeof localStorage ? localStorage.removeItem(_key) : Util.delCookie(_key);
        }
    },
    sStorage: {
        setItem: function (_key, _val) {
            "object" == typeof sessionStorage ? sessionStorage.setItem(_key, _val) : Util.setCookie(_key, _val, 0, "", "/");
        },
        getItem: function (_key) {
            return "object" == typeof sessionStorage ? sessionStorage.getItem(_key) : Util.getCookie(_key);
        },
        removeItem: function (_key) {
            "object" == typeof sessionStorage ? sessionStorage.removeItem(_key) : Util.delCookie(_key);
        }
    },

    delay: function (func, wait) {
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    },
    REG: {
        //数字类型日期  20170707
        NumDate: /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/
    },
    openView: function (url) {
        if (url) {
            location.href = url
        } else {
            history.go(1);
        }
    },
    isInApp: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return (!!ua.match(/Ahaschool\/Android/i) || !!ua.match(/Ahaschool\/ios/i));
    },
    isInAppios: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return !!ua.match(/Ahaschool\/ios/i);
    },
    isInAppandroid: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return !!ua.match(/Ahaschool\/Android/i);
    },
    isInWeiBo: function () {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return !!ua.match(/WeiBo/i);
    },
    callAppMethod: function (methodStr) {
        if (!Util.isInApp()) return; //不是内嵌在APP内或viewload还未结束时 APP方法不可用
        var _param = [];
        if (arguments.length > 1) _param = Array.prototype.slice.call(arguments, 1);
        if (window['AHASCHOOL'] && typeof window['AHASCHOOL'][methodStr] == "function") {
            return window['AHASCHOOL'][methodStr].apply(window['AHASCHOOL'], _param);
        }
    },
    /**
     * 秒数格式化为时分秒
     * 
     */
    secondsFormat: function (seconds, templet) {
        var _day = parseInt(seconds / (60 * 60 * 24)),
            _hours = parseInt(seconds % (60 * 60 * 24) / (60 * 60)),
            _minutes = parseInt(seconds % (60 * 60) / 60),
            _seconds = seconds % 60;

        _hours = _hours < 10 ? "" + _hours : _hours;
        _minutes = _minutes < 10 ? "" + _minutes : _minutes;
        _seconds = _seconds < 10 ? "" + _seconds : _seconds;

        var _html_str = (((templet.replace('{{day}}', _day)).replace('{{hour}}', _hours)).replace('{{minutes}}', _minutes)).replace('{{seconds}}', _seconds);
        return _html_str;
    },
    secondsToMinutes: function (seconds) {
        var _minutes = parseInt(seconds / 60);
        return _minutes;
    },
    isMobileBrowser: function () {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
            return true;
        } else {
            return false;
        }
    },
    isiOSBrowser: function () {
        if (navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)) {
            return true;
        } else {
            return false;
        }
    },
    checkFlash: function () {
        var flag = false;
        if (window.ActiveXObject) {
            try {
                var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (swf) {
                    flag = true;
                }
            } catch (e) { }
        } else {
            try {
                var swf = navigator.plugins['Shockwave Flash'];
                if (swf) {
                    flag = true;
                }
            } catch (e) { }
        }
        return flag;
    },
    generateID: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
}
module.exports = Util;