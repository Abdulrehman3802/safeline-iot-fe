import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllFacilitiesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`facility`)
  return data
}

/**
 * This function is used to delete a facility by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'System' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteFacility = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`facility/${id}`)
  return data
}
export const addFacility = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.post(`facility`, {
    facilityType: payload.facilityType,
    name: payload.name,
    customerid: Number(payload.customerid),
    email: payload.email,
    contactphonenumber: payload.contactphonenumber,
    contactname: payload.contactname,
    timezone: payload.timezone,
    currency: payload.currency,
    address: payload.address,
    street: payload.street,
    city: payload.city,
    postcode: +payload.postCode,
    latitude: +payload.latitude,
    longitude: +payload.longitude,
    isfacilityadmin: true,
  })
  return data
}
export const EditFacility = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `facility/${payload.editData.facilityid}`,
    payload.handler,
    // {
    //   facilityType: payload.handler.facilityType,
    //   name: payload.name,
    //   customerid: Number(payload.customerid),
    //   email: payload.email,
    //   contactphonenumber: payload.contactphonenumber,
    //   contactname: payload.handler.contactname,
    //   timezone: payload.handler.timezone,
    //   currency: payload.handler.currency,
    //   address: payload.handler.address,
    //   street: payload.handler.street,
    //   city: payload.handler.city,
    //   postcode: +payload.handler.postCode,
    //   latitude: +payload.handler.latitude,
    //   longitude: +payload.handler.longitude,
    //   isfacilityadmin: true,
    // }
  )
  return data
}
