import Vue from 'vue'

var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd hh:mm'

function padding (s, len) {
  len = len - (s + '').length
  for (var i = 0; i < len; i++) { s = '0' + s }
  return s
}
const util = {
  // 时间格式 -> 年月日时分秒
  // 可传入  10位时间戳（秒） | 13位时间戳（毫秒） | 时间格式（object） 
  format (date, pattern) {
    if (typeof date == 'string' || typeof date == 'number') {
      date = new Date((date + '').length == 10 ? date * 1000 : date)
    }
    pattern = pattern || DEFAULT_PATTERN
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y': return padding(date.getFullYear(), $0.length)
        case 'M': return padding(date.getMonth() + 1, $0.length)
        case 'd': return padding(date.getDate(), $0.length)
        case 'w': return date.getDay() + 1
        case 'h': return padding(date.getHours(), $0.length)
        case 'm': return padding(date.getMinutes(), $0.length)
        case 's': return padding(date.getSeconds(), $0.length)
      }
    })
  },
  // loading
  loading () {
    const loading = Vue.prototype.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 10000);
    return loading
  },
  // prompt message
  show (text = '', type = 'warning', close = true) {
    if (typeof text != 'string') return
    if (text == '') return
    if (window.message && close) window.message.close()
    window.message = Vue.prototype.$message(
      {
        message: text,
        type: type,
      }
    )
  },
  // ie浏览器不支持find方法 如果遇到不支持的情况 手动重写find
  isfind () {
    if (!Array.prototype.find) {
      // eslint-disable-next-line no-extend-native
      Array.prototype.find = function (predicate) {
        'use strict'
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined')
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function')
        }
        var list = Object(this)
        var length = list.length >>> 0
        var thisArg = arguments[1]
        var value

        for (var i = 0; i < length; i++) {
          value = list[i]
          if (predicate.call(thisArg, value, i, list)) {
            return value
          }
        }
        return undefined
      }
    }
  },
  // 去除字符串首尾空格
  trim (i) {
    if (!i) return ''
    let str = String(i)
    return str.replace(/(^\s*)|(\s*$)/g, "")
  },
  // 新建并返回一个obj对象中存在的keys的object对象
  // 第一个参数是要筛选的对象
  // 第二个参数 ：需要提取 属性的键名（数组||字符串）
  only (obj, keys) {
    obj = obj || {}
    if ('string' == typeof keys) keys = keys.split(/ +/)
    return keys.reduce(function (ret, key) {
      if (null == obj[key]) return ret
      ret[key] = obj[key]
      return ret;
    }, {})
  },
  getQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  //  获取当前星期几
  getWeekDate (dataTime) {
    var now = new Date(dataTime);
    var day = now.getDay();
    var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weeks[day];
    return week;
  }
}

export default util