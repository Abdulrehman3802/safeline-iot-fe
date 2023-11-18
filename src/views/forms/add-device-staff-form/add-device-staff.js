/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cil4k,
  cilBuilding,
  cilLibraryBuilding,
  cilLocationPin,
  cilPaperPlane,
  cilPaperclip,
  cilPhone,
} from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useAllDevicesData } from 'src/hooks/useDevices'
// eslint-disable-next-line react/prop-types
const AddDeviceStaff = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const { data: allDevices } = useAllDevicesData()
  const [validated, setValidated] = useState(false)
  const [deviceId, setDeviceId] = useState()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phonenumber: '',
    deviceid: 0,
    is_admin: false,
  })
  useEffect(() => {
    if (data) {
      // debugger
      setFormData(() => ({
        firstname: data.users.firstname,
        lastname: data.users.lastname,
        email: data.users.email,
        address: data.users.address,
        phonenumber: data.users.phonenumber,
        deviceid: data.users.deviceid,
        is_admin: true,
        userid: data.userid,
      }))
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let parsedValue = value

    if (name === 'deviceid') {
      // Parse the "deviceid" value as an integer
      parsedValue = parseInt(value, 10) || 0
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : parsedValue,
    })
  }
  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    const inputEmail = e.target.value
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const isValid = emailRegex.test(inputEmail)

    setValidated(isValid)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      showLoader()
      saveHandler(formData)
      console.log(formData)
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
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDeviceSelection">
          Device Selection*
        </CFormLabel>
        <CFormSelect
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          aria-describedby="validationCustom04Feedback"
          name="deviceid"
          value={formData.deviceid}
          feedbackInvalid="Please select a valid Device Selection"
          id="validationDeviceSelection"
          onChange={handleInputChange}
          required
        >
          <option>Select Device</option>
          {allDevices?.data?.map((item) => {
            return (
              <option key={item.deviceid} value={item.deviceid}>
                {item.devicename}
              </option>
            )
          })}
        </CFormSelect>
      </CCol>
      {/* First Name */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFirstname">
          First Name
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            {/* <MdLocationPin /> */}
            {/*   <CIcon icon={cilBuilding} alt="Name" /> */}
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            feedbackInvalid="First Name is required"
            id="validationCustom01"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Last Name */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationLastname">
          Last Name
        </CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>{/*  <CIcon icon={cilPhone} alt="Contact" /> */}</CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            feedbackInvalid="Last name is required"
            id="validationCustom02"
            required
          />
        </CInputGroup>
      </CCol>
      {/*  Email */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationEmail">
          Email
        </CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>
            <CIcon icon={cilPaperPlane} alt="Email" />
          </CInputGroupText>
          <CFormInput
            type="email"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            aria-describedby="inputGroupPrependFeedback"
            feedbackInvalid=" Email is required"
            id="validationEmail"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Address */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomAddress">
          Address
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilLocationPin} alt="Address" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            aria-describedby="validationCustom03Feedback"
            feedbackInvalid="Address is required."
            id="validationCustom03"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Contact Number */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPhoneNumber">
          Conatct Number
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="phonenumber" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="Contact Number is required"
            id="validationCustom05"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Organization DropDown*/}
      {/* <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Organization DropDown
        </CFormLabel>
      <CFormSelect 
         aria-label="Default select example"
         name="organizationDropdown"
         value={formData.organizationDropdown}
        onChange={handleInputChange}
  options={[
    'Open this select menu',
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3', disabled: true }
  ]}
/>
</CCol> */}
      {/*facility DropDown*/}
      {/* <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Department DropDown
        </CFormLabel>
      <CFormSelect 
         aria-label="Default select example"
         name="facilityDropdown"
         value={formData.facilityDropdown}
        onChange={handleInputChange}
  options={[
    'Open this select menu',
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3', disabled: true }
  ]}
/>
</CCol> */}
      {/*department DropDown*/}
      {/* <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Department DropDown
        </CFormLabel>
      <CFormSelect 
         aria-label="Default select example"
         name="departmentDropdown"
         value={formData.departmentDropdown}
        onChange={handleInputChange}
  options={[
    'Open this select menu',
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3', disabled: true }
  ]}
/>
</CCol> */}

      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Is Admin
        </CFormLabel>
        <CFormCheck
          id="flexCheckDefault"
          label=" "
          checked={formData.is_admin} // Set the checked state based on formData.is_admin
          onChange={(e) => {
            setFormData({ ...formData, is_admin: e.target.checked })
          }}
        />
      </CCol>
      {/* Submit Button */}
      <CCol xs={12}>
        <CButton
          color="primary"
          className="float-end"
          id={`${darkMode ? 'button-dark' : ''}`}
          type="submit"
        >
          {data ? 'Edit Device Staff ' : 'Add Device Staff '}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddDeviceStaff.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.array, // editdata can be an array
    PropTypes.shape({
      // Or an object
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      phoneNumber: PropTypes.string,
      organizationDropdown: PropTypes.string,
      facilityDropdown: PropTypes.string,
      departmentDropdown: PropTypes.string,
    }),
  ]),
}

export default AddDeviceStaff
