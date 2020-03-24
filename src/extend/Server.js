
import axios from 'axios'
import Config from './config'
var instance = axios.create({
  baseURL: Config.host,
  timeout: 60 * 60 * 1000,
  headers: {},
  trimNull: false, // 是否去除空值
  withCredentials: true, // default
  needLoading: true, // 是否需要加载效果
})
instance.interceptors.request.use(function (config) {
  const timeStamp = {
    _t: new Date().getTime()
  }
  
  if (config.params) {
    Object.assign(config.params, timeStamp)
  } else {
    config.params = timeStamp
  }
  config.data = config.data || {}
  if (config.trimNull) {
    let _data = Object.assign({}, config.data)
    isNull(_data)
    config.data = _data
  }
  return config
  function isNull (obj) {
    for (let [key, value] of Object.entries(obj)) {
      if (!value && typeof value != 'number') {
        obj[ key ] = null
        return
      }
      if (typeof value == 'object' && !(value instanceof Date)) isNull(value)
    }
  }
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if (response.config.needLoading) {}
  var code = response.status
  if (code === 200) {
    return {data: response.data}
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  var status = error.response && error.response.status
  return Promise.reject(error)
})

export default instance
