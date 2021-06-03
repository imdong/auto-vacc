import fetch from 'axios'

// 默认配置
fetch.default.timeout = 50000
fetch.defaults.headers['Content-Type'] = 'application/json'

// 请求前拦截器
// fetch.interceptors.request.use(config => {
// })

// 请求响应拦截
// fetch.interceptors.response.use(data => {
//   if (data.data.ecode !== '1000') {
//     return Promise.reject(data.data)
//   }
//   return data.data
// })
