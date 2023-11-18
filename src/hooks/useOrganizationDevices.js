import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllOrgDevicesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`sensor/get-assign-sensors`)
  return data.data
}
export const getAllSensors = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`sensor/get-unassigned-sensors`)
  return data
}

export function useAllOrgDevicesData() {
  return useQuery(['repos'], getAllOrgDevicesData)
}

/**
 * This function is used to delete an organization sensor by its 'id'.
 * Set the authentication token from local storage.Send a PATCH
 * request to the 'OrganizationSensor/UnassignSensor?id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteOrganizationSensor = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`sensor/unAssigned/${id}`)
  return data
}
export const addOrganizationSensor = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`sensor/assign-sensor`, payload)
  return data
}
export const EditOrganizationSensor = async (payload) => {
  // debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `/sensor/update-sensor/${payload.handler.id}`,
    payload.handler,
  )
  return data
}
