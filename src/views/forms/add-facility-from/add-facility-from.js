import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CForm,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cil3d,
  cil4k,
  cilBuilding,
  cilEnvelopeClosed,
  cilLibraryBuilding,
  cilPhone,
} from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import {
  _department,
  _facility,
  _organization,
  _view,
  _create,
  hasPermissionToActionAccess,
} from 'src/constants/permissionContant'
const AddFacilityFrom = ({ closeModal, saveHandler, data }) => {
  const dataOrganization = useDataStore((state) => state.data)
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const userPermissions = JSON.parse(localStorage.getItem('permissions'))
  const organizationPermission = hasPermissionToActionAccess(userPermissions, _organization, _view)
  const facilityPermission = hasPermissionToActionAccess(userPermissions, _facility, _view)
  const departmentPermission = hasPermissionToActionAccess(userPermissions, _department, _view)
  const [formData, setFormData] = useState({
    name: '',
    facility_Type: '',
    customerid: 'Selected Organization',
    timezone: '',
    currency: '',
    contactname: '',
    contactphonenumber: '',
    email: '',
    address: '',
    city: '',
    street: '',
    postCode: 0,
    latitude: 0,
    longitude: 0,
    isfacilityadmin: true,
  })
  useEffect(() => {
    // debugger
    if (data) {
      setFormData(() => ({
        name: data.name,
        facility_Type: data.facility_Type,
        customerid: Number(data.customerid),
        timezone: data.timezone,
        currency: data.currency,
        contactname: data.contactname,
        contactphonenumber: data.contactphonenumber,
        email: data.email,
        address: data.address,
        city: data.city,
        street: data.street,
        postCode: +data.postcode,
        latitude: +data.latitude,
        longitude: +data.longitude,
        isfacilityadmin: true,
      }))
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    const phoneNumber = formData.organizationContact
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      showLoader()
      saveHandler(formData)
      event.preventDefault()
      closeModal()
    }
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <CForm
      className="row mt-2 g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {organizationPermission && (
        <CCol md={12}>
          {/* Form select*/}
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
            Organization
          </CFormLabel>
          <CFormSelect
            name="customerid"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid Organization."
            // id="validationOrganization"
            value={formData.customerid}
            onChange={handleInputChange}
            required
            // eslint-disable-next-line react/prop-types
            disabled={data ? true : false}
          >
            <option>Select Organization</option>
            {dataOrganization[0]?.map((item) => {
              return (
                <option key={item.customerid} value={item.customerid}>
                  {item.customername}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
      )}
      {/* Facility Name */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Facility Name*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil3d} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            feedbackInvalid="Facility Name is required"
            id="validationFacilityName"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Facility Type */}

      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Facility Type*
        </CFormLabel>
        <CFormSelect
          name="facility_Type"
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid facility type."
          id="validationFacilityType"
          value={formData.facility_Type}
          onChange={handleInputChange}
          required
        >
          <option>Select Facility Type</option>
          <option value={'Mixed Dashboard'}>Mixed Dashboard</option>
          <option value={'Energy Dashboard'}>Energy Dashboard</option>
          <option value={'Condition Dashboard'}>Condition Dashboard</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Time Zone*
        </CFormLabel>
        <CFormSelect
          name="timezone"
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          value={formData.timezone}
          onChange={handleInputChange}
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid time zone."
          id="validationTimeZone"
          required
        >
          <option>Select Timezone</option>
          <option value={'Asia/Colombo'}>Asia/Colombo</option>
          <option value={'Asia/Dhaka'}>Asia/Dhaka</option>
          <option value={'Asia/Dubai'}>Asia/Dubai</option>
        </CFormSelect>
      </CCol>

      {/*Currency */}
      {/* <CFormLabel htmlFor="validationCurrency">Currency*</CFormLabel>*/}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Currency*
        </CFormLabel>
        <CFormSelect
          name="currency"
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          value={formData.currency}
          onChange={handleInputChange}
          aria-describedby="validationCurrency"
          feedbackInvalid="Please select a valid currency."
          id="validationCurrency"
          required
        >
          <option>Select Currency</option>
          <option value={'USD'}>USD</option>
          <option value={'EUR'}>EUR</option>
          <option value={'ZAR'}>ZAR</option>
        </CFormSelect>
      </CCol>
      {/* Site manager */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomCity">
          Site Manager
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilLibraryBuilding} alt="contactname" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="contactname"
            value={formData.contactname}
            onChange={handleInputChange}
            aria-describedby="validationSiteManager"
            feedbackInvalid="Site Manager required."
            id="validationSiteManager"
            required
          ></CFormInput>
        </CInputGroup>
      </CCol>
      {/* Contact */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomStreet">
          Contact Number*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="Contact" />
          </CInputGroupText>
          <CFormInput
            type="tel"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="contactphonenumber"
            placeholder="+92xxxx"
            value={formData.contactphonenumber}
            onChange={handleInputChange}
            aria-describedby="validationContactNumber"
            feedbackInvalid="Phone Number is required."
            id="validationContactNumber"
            required
          />
        </CInputGroup>
      </CCol>

      {/*Contact Email*/}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomAddress">
          Contact Email
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilEnvelopeClosed} alt="email" />
          </CInputGroupText>
          <CFormInput
            type="email"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-describedby="validationContactEmail"
            feedbackInvalid="Contact Email is required."
            id="validationContactEmail"
            required
          />
        </CInputGroup>
      </CCol>

      {/* Address */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomAddress">
          Address*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="Address" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            aria-describedby="validationCustom03Feedback"
            feedbackInvalid="Address is required."
            id="validationAddress"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Street*/}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomCity">
          Street*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilLibraryBuilding} alt="Street" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Street is required."
            id="validationStreet"
            required
          ></CFormInput>
        </CInputGroup>
      </CCol>
      {/* City */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomStreet">
          City*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil4k} alt="City" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="City is required."
            id="validationCity"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Postcode */}
      <CCol md={4}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPostcode">
          Postcode
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="Postcode" />*/}</CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="number"
            name="postCode"
            value={formData.postCode}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="Postcode is required"
            id="validationPostCode"
            required
          />
        </CInputGroup>
      </CCol>
      {/* latitude */}
      <CCol md={4}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPostcode">
          Latitude*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="latitude" /> */}</CInputGroupText>
          <CFormInput
            type="number"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="latitude is required"
            id="validationLatitude"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Longitude*/}
      <CCol md={4}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPostcode">
          Longitude*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="longitude" />*/}</CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="longitude is required"
            id="validationLongitude"
            required
          />
        </CInputGroup>
      </CCol>

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Facility' : 'Add Facility'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddFacilityFrom.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    facilityType: PropTypes.string,
    customerid: PropTypes.string,
    timezone: PropTypes.string,
    currency: PropTypes.string,
    contactname: PropTypes.string,
    contactphonenumber: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    postcode: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }),
}

export default AddFacilityFrom
