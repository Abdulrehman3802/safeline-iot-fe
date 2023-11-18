import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDepartmentStaffData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-admins?name=DepartmentAdmin`)
  return data
}

export const addDepartmentStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`user/create/departmentAdmin`, payload)
  return data
}
export const EditDepartmentStaff = async (payload) => {
  // debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`user/staff/updateDepartmentStaff`, payload.handler)
  return data
}
export const deleteDepartmentStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(
    `user/staff/deleteDepartmentStaff?userid=${payload.userid}&departmentid=${payload.departmentid}`,
  )
  return data
}
export const getAllDepartmentUserData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-user-staff?name=DepartmentUser`)
  return data
}
export const getAllDepartmentUserbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/user-staff-by-facId/${id}?name=DepartmentUser`)
  return data
}

export const getAllDepartmentStaffbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/admins-by-facId/${id}?name=DepartmentAdmin`)
  return data
}
