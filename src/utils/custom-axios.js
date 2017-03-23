import axios from 'axios'
import Bus from './evt-bus.js'
// import env from 'axios'

axios.defaults.timeout = 100
// override request
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, (error) => {
  // Do something with request error]
  return Promise.reject(error)
})
// override response
axios.interceptors.response.use((res) => {
  if (res.status === 654) { // 百度云请求超时检测
    window.alert('请求超时！')
  }
  if (res.data.code !== 200) {
    window.alert('数据返回有误')
    return Promise.reject(res)
  }
  return res
}, (error) => {
  // timeout
  if (error.code === 'ECONNABORTED') {
    // check network is working well
    Bus.$emit('error:network', error)
  }
  console.log('promise error:' + error)
  return Promise.reject(error)
})
export default axios
