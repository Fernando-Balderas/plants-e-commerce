import axios from 'axios'
import { API_BASE_URL } from '../../util/secrets'
import { LOCALSTORAGE_TOKEN } from '../../util/constants'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
})

const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    console.log('req error ', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
    return Promise.reject(error)
  }
)

export default instance