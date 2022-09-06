import axios from 'axios'
import { API_BASE_URL } from '../../util/secrets'
import { LOCALSTORAGE_TOKEN } from '../../util/constants'

type Config = {
  headers?: {
      Authorization?: string
  }
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
})

instance.interceptors.request.use(
  (config: Config) => {
    // Do something before request is sent
    if (!config.headers?.['Authorization'] ) {
      if (config.headers === undefined)
        config.headers = {}
      const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
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
