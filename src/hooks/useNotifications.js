import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllNotificationDataByEmail = async (id) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`notificationsetup/${id}?type=email`)
  return data
}
export const getAllNotificationDataBySms = async (id) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`notificationsetup/${id}?type=phone`)
  return data
}
export const getAllSelectedUsers = async (id) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`notificationsetup/selected-users/${id}`)
  return data
}
const orgid = localStorage.getItem('OrganizationId')
export const addNotificationUsers = async (payload) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`notificationsetup/create/${orgid}`, payload)
  return data
}
export const getAllOrganizationCredits = async (id) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`organization/credit/${id}`)
  return data
}
