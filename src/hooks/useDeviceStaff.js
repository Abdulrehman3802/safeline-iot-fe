import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDeviceStaffData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-admins?name=DeviceAdmin`)
  return data
}

export const addDeviceStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`user/create/deviceAdmin`, payload)
  return data
}
export const EditDeviceStaff = async (payload) => {
  // debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`user/staff/updateDeviceStaff`, payload.handler)
  return data
}
export const deleteDeviceStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(
    `user/staff/deleteDeviceStaff?userid=${payload.userid}&deviceid=${payload.deviceid}`,
  )
  return data
}

export const getAllDeviceUserData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-user-staff?name=DeviceUser`)
  return data
}
export const getAllDeviceUserbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/user-staff-by-depId/${id}?name=DeviceUser`)
  return data
}

export const getAllDeviceStaffbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/admins-by-depId/${id}?name=DeviceAdmin`)
  return data
}
