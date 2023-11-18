import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllSensorData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`sensor/get-assign-sensors-widget/2`)
  return data
}

export const FindDashboard = async (payload) => {
  // debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`dashboard/find`, {
    customerid: Number(payload),
  })
  return data
}
