import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllFacilitiesStaffData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-admins?name=FacilityAdmin`)
  return data
}
export const getAllFacilitiesStaffbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/admins-by-orgId/${id}?name=FacilityAdmin`)
  return data
}

export const addFacilityStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`user/create/facilityAdmin`, payload)
  return data
}

export const EditFacilityStaff = async (payload) => {
  // debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`user/staff/updateFacilityStaff`, payload.handler)
  return data
}

export const deleteFacilityStaff = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(
    `user/staff/deleteFacilityStaff?userid=${payload.userid}&facilityid=${payload.facilityid}`,
  )
  return data
}

export const getAllFacilitiesUserData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/find-user-staff?name=FacilityUser`)
  return data
}

export const getAllFacilitiesUserbyOrgID = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`user/user-staff-by-orgId/${id}?name=FacilityUser`)
  return data
}
