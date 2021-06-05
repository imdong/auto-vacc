// 深圳预约新冠疫苗模块
import SM4 from './SM4'
import axios from 'axios'

class VaccH5 {
  constructor() {
    this.$fetch = this._initAxios()
  }

  // 初始化 axios 实例
  _initAxios() {
    const http = axios.create({
      baseURL: 'https://xgsz.szcdc.net/crmobile/'
    })
    http.defaults.headers.common['Content-Type'] = 'application/json'
    // 请求发送前 修改请求数据和请求头 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
    http.defaults.transformRequest = [(data, headers) => {
      const dataType = Object.prototype.toString.call(data)
      let result = ''
      switch (dataType) {
        case '[object FormData]':
          headers['Content-Type'] = 'application/x-www-form-urlencoded'
          result = data
          break
        case '[object Object]':
          result = JSON.stringify(data)
          break
        default:
          result = data
          break
      }
      return result
    }]

    // 请求前拦截器
    http.interceptors.request.use(config => {
      // 请求头需要额外添加加密参数的接口
      const headerEncryptApis = ['outpatient/nearby', 'reservationStock/list', 'reservationStock/timeNumber']

      const target = headerEncryptApis.find(api => {
        return config.url.includes(api)
      })
      if (target) {
        const res = this._extratHeader(config.headers.token)
        config.headers.ybm = res.ybm
        config.headers.otn = res.otn
      }
      return config
    }, error => {
      console.error(error)
      return Promise.reject(error)
    })

    // 请求响应拦截器
    http.interceptors.response.use(data => {
      // 状态码枚举
      const statusCode = {
        success: '1000' // 成功
      }
      if (data.data.ecode === statusCode.success) {
        return data.data
      } else {
        return Promise.reject(data.data)
      }
    })
    return http
  }

  // 创建 SM4 加密实例 实例的 encrypt 就是加密方法 decrypt-解密
  _createSM4Instance(t = 'di6N7eCJYFp3kB4Q,!@#$%&*', e = 'u1r8jNhz07N7Zkn0') {
    /**
     * 这个是源网站上扒下来的 用来创建 SM4 加密实例
     * function i(t, e) {
        t = t || "di6N7eCJYFp3kB4Q,!@#$%&*",
        e = e || "u1r8jNhz07N7Zkn0";
        var n = t.split(",")
          , i = r()(n, 2)
          , a = i[0]
          , o = i[1]
          , s = a.split("");
        o.split("").map(function(t, e) {
            s[e + e + 1] = t
        }),
        s = s.join("");
        var l = {
            key: s,
            mode: "cbc",
            iv: e,
            cipherType: "base64"
        };
        return new ybzl.SM4(l)
      }
     */

    function i(t, e) {
      var n = t.split(',')
      var i = n
      var a = i[0]
      var o = i[1]
      var s = a.split('')
      // eslint-disable-next-line no-unused-expressions
      o.split('').map(function(t, e) {
        s[e + e + 1] = t
      })
      s = s.join('')
      var l = {
        key: s,
        mode: 'cbc',
        iv: e,
        cipherType: 'base64'
      }
      return new SM4(l)
    }
    return i(t, e)
  }

  // 返回请求头额外的参数
  _extratHeader(token) {
    // 网站扒下来的
    function d(token, ybm) {
      var n = token.substring(0, 5)
      var i = token.substring(5, 10)
      var a = token.substring(10, 12)
      var o = token.substring(12)
      return n + ybm.substring(0, 14) + i + ybm.substring(9, 10) + a + ybm.substring(16, 17) + o
    }

    const ybm = (Date.now().toString() + (1e6 * Math.random().toFixed(6)).toString()).padEnd(19, '0')
    const otn = d(token, ybm)

    // 参数是从网站扒下来的，分析代码的时候搜索 ybm 关键字
    const SM4 = this._createSM4Instance('1EzrokKlK2pFuEIT,~@#^%&*', '4h0VXhpqwWy89xBk')
    return {
      ybm: SM4.encrypt(ybm),
      otn: SM4.encrypt(otn)
    }
  }

  // 加密请求参数
  _encryptParams(params) {
    const SM4 = this._createSM4Instance('016BhmYAk7Oi1ajM,~@#^%&*', '4h0VXhpqwWy89xBk')
    return SM4.encrypt(JSON.stringify(params))
  }

  _json2FormData(json) {
    const formData = new FormData()
    Object.keys(json).forEach((key) => {
      formData.append(key, json[key])
    })
    return formData
  }

  // 获取个人信息
  async getUserInfo(payload) {
    try {
      const res = await this.$fetch.get('registerUser/getUserInfo', {
        headers: {
          token: payload.token,
          appId: payload.appId
        }
      })
      return res.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // 请求预约
  async reqReservation(payload) {
    try {
      const res = await this.$fetch.post('reservation/saveAppointment', payload.params, {
        headers: {
          token: payload.token,
          appId: payload.appId
        }
      })
      return res.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // 获取门诊列表
  async getDepaList(payload) {
    try {
      // 加密参数
      const params = {
        params: this._encryptParams(payload.params)
      }

      const res = await this.$fetch.post('outpatient/nearby', this._json2FormData(params), {
        headers: {
          token: payload.token
        }
      })
      return res.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // 获取社康预约时间段列表
  async getOutpatientTimes(payload) {
    try {
      // 加密参数
      const params = {
        params: this._encryptParams(payload.query)
      }

      const res = await this.$fetch.get('reservationStock/timeNumber', {
        headers: {
          token: payload.token
        },
        params
      })
      return res.data
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

export default new VaccH5()
