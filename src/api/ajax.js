import axios from 'axios'

axios.defaults.baseURL = 'https://free-api.heweather.net/s6/weather'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// 添加请求 拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let key = `e82fb3f88fdf41898b945fda077cffbc`
  config.url += `&key=${key}`
  console.log(config)
  //config.url = `now?location=${area},${city}&key=${key}`
  return config;
}, error => {
  // 对请求错误做些什么

  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
  // 对响应数据做点什么
  return res

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




//export default axios
export function _getNowWeather(area, city) {
  let url = `now?location=${area},${city}`
  return axios.get(url).then(res => {
    return res
  })
}

export function _getForecastWeather(area, city) {
    let url = `forecast?location=${area},${city}`
    return axios.get(url).then(res => {
      return res
    })
  }


