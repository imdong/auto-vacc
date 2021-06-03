// 深圳预约新冠疫苗模块
import fetch from '@/core/fetch'
import Qs from 'qs'

class VaccH5 {
  constructor(payload) {
    this.$fetch = payload.fetch
    this.successCode = payload.successCode
    this.Qs = payload.Qs
  }

  // 获取个人信息
  async getUserInfo(payload) {
    const { successCode } = this
    const res = await this.$fetch.get('https://xgsz.szcdc.net/crmobile/registerUser/getUserInfo', {
      headers: {
        token: payload.token,
        appId: payload.appId
      }
    })
    if (res.data.ecode === successCode) {
      return res.data.data
    }
    return Promise.reject(res.data)
  }

  // 请求预约
  async reqReservation(payload) {
    const { successCode } = this
    const res = await this.$fetch.post('https://xgsz.szcdc.net/crmobile/reservation/saveAppointment', payload.params, {
      headers: {
        token: payload.token,
        appId: payload.appId
      }
    })
    if (res.data.ecode === successCode) {
      return res.data.data
    }
    return Promise.reject(res.data)
  }

  // 获取门诊列表
  async getDepaList(payload) {
    const { successCode } = this
    const res = await this.$fetch.post('https://xgsz.szcdc.net/crmobile/outpatient/nearby', this.Qs.stringify(payload.params), {
      headers: {
        token: payload.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (res.data.ecode === successCode) {
      return res.data.data
    }
    return Promise.reject(res.data)
  }

  // 获取社康预约时间段列表
  async getOutpatientTimes(payload) {
    const { successCode } = this
    const res = await this.$fetch.get('https://xgsz.szcdc.net/crmobile/reservationStock/timeNumber', {
      headers: {
        token: payload.token
      },
      params: payload.query
    })
    if (res.data.ecode === successCode) {
      return res.data.data
    }
    return Promise.reject(res.data)
  }

  // 获取验证码
  async getCaptcha(payload) {
    const { successCode } = this
    const res = await this.$fetch.get('https://xgsz.szcdc.net/crmobile/outpatient/getCaptchaBase64', {
      headers: {
        token: payload.token,
        appId: payload.appId
      },
      params: {
        ts: new Date().getTime()
      }
    })
    if (res.data.ecode === successCode) {
      return res.data.data
    }
    return Promise.reject(res.data)
  }
}

export default new VaccH5({
  fetch,
  Qs,
  successCode: '1000'
})
