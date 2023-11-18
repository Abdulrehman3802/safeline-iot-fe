import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'
// import { useQuery } from 'react-query'
export const loginPost = async (payload) => {
  const { data } = await axiosInstance.post(`auth/login`, {
    email: payload.email,
    password: payload.password,
  })
  return data.data
}
export const generalPermissions = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`general`)
  return data
}
export const addOrganization = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`organization`, payload)
  return data
}
export const getOrganizationData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`organization`)
  return data
}

export const getFacilitiesData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`facility/by-orgId/${id}`)
  return data
}
export const EditOrganization = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `organization/${payload.editData.customerid}`,
    payload.handler,
  )
  return data
}

export const getDepartmentsData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`department/by-facId/${id}`)
  return data
}

/**
 * This function is used to delete an organization by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'Organization' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteOrganization = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`organization/${id}`)
  return data
}
export const resetpassword = async (payload) => {
  debugger
  const { data } = await axiosInstance.post(`auth/get-reset-token`, payload)
  return data
}

export const SetNewPassword = async (payload) => {
  const { data } = await axiosInstance.post(`/auth/reset-password`, payload)
  return data
}
