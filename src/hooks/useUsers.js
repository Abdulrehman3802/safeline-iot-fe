import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllUsersData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/unassigned-users`)
  return data
}

export const getAllRolesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`roles`)
  return data
}
export const addUser = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`user/create/createUserStaff`, payload)
  return data
}

export const EditUser = async (payload) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`user/${payload.editData.userid}`, payload.handler)
  return data
}
export const deleteUsers = async (userid) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`user/${userid}`)
  return data
}
