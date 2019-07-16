import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('heima73ll')).token
  //   }
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})

instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('heima73ll')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.request.use(response => {
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
