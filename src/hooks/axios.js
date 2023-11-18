import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API's base URL
  timeout: 50000, // Set a timeout (in milliseconds) for requests
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here
  },
})

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
}

export { axiosInstance, setAuthToken }
