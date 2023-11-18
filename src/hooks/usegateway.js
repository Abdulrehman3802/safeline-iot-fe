import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllGatewayData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`gateway/get-all-gateways/${id}`)
  return data
}

export const addGateWay = async (payload) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`gateway/assign-to-organization`, payload)
  return data
}

export const EditGateWay = async (payload) => {
  debugger
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `/gateway/update-gateway/${payload.editData.gatewayid}`,
    payload.handler,
  )
  return data
}
export const deleteGateway = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`gateway/delete-gateway/${id}`)
  return data
}
