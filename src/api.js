import axios from 'axios'

const apiUrl = 'https://firevuechat-a28fa-default-rtdb.firebaseio.com';

const api = axios.create({
    baseURL: apiUrl
})
api.defaults.headers.common['x-api-key'] = '80a46f46-eecb-40e7-9204-79df523aa354'

api.interceptors.request.use(function (request) {
    if (!request.baseURL.indexOf(apiUrl)) {
      console.log('owner site')
    } else {
      console.log('other site')
    }
    return request
  }, function (error) {
    return error
  })
  
  api.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    return Promise.reject(error.response ||
      { response: { status: error.statusCode, message: error.message } })
  })
  
export default {
    api,
    apiUrl
}