import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDevicesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`device`)
  return data
}
export function useAllDevicesData() {
  return useQuery(['repos'], getAllDevicesData)
}

export const getAllDevicesById = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`device/by-depId/${id}`)
  return data
}
/**
 * This function is used to delete a Device by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'Device/DeleteDevice?Id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteDevice = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`device/${id}`)
  return data
}
export const addDevice = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`device`, payload)
  return data
}
export const EditDevice = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`device/${payload.editData.deviceid}`, payload.handler)
  return data
}
