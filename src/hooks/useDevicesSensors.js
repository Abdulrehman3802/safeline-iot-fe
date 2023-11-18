import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDevicesSensorsData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`/sensor/get-sensors-by-deviceId/${id}`)
  return data
}
export const getAllSensorsDataofOrg = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`sensor/get-sensors-by-orgId/${id}`)
  return data
}

/**
 * This function is used to delete a device sensor by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'SensorSetup/DeleteSensor?Id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteDeviceSensor = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`SensorSetup/DeleteSensor?Id=${id}`)
  return data
}

// export function useAllDevicesSensorsData(id) {
//   return useQuery(['repos', id], getAllDevicesSensorsData)
// }
export const addDeviceSensor = async (payload) => {
  const { data } = await axiosInstance.post(`sensor/assign-sensor`, payload)
  return data
}
export const EditDeviceSensor = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `/SensorSetup/UpdateSensor?Id=${payload.editData.id}`,
    payload.handler,
  )
  return data
}

export const addSensorConfiguration = async (payload) => {
  const { data } = await axiosInstance.post(
    `SensorDeviceConfiguration/CreateSensorDeviceConfiguration`,
    payload,
  )
  return data
}

export const getSensorConfigurationData = async (id) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`sensor/get-sensors-configuration/${id}`)
  return data
}

export const EditSensorConfigurationData = async ({ handler, id }) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`sensor/update-sensors-configuration`, handler)
  return data
}
