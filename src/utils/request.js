import axios from 'axios'
import { Message } from 'element-ui'
import gsetting from '../api/globalVariable'
axios.defaults.withCredentials = true
axios.defaults.adapter = require('axios/lib/adapters/http');
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: gsetting.servicePort + '/func/',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
