/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
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
// eslint-disable-next-line react/prop-types
const AddOrganizationForm = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    customername: '',
    contactperson: '',
    email: '',
    address: '',
    city: '',
    street: '',
    postcode: '',
    phone: '',
  })
  useEffect(() => {
    // // debugger
    if (data) {
      setFormData(() => ({
        customername: data.customername,
        contactperson: data.contactperson,
        email: data.email,
        address: data.address,
        city: data.city,
        street: data.street,
        postcode: data.postcode,
        phone: data.phone,
      }))
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let parsedValue = value

    if (name === 'postcode' && type !== 'checkbox') {
      // Parse the "postcode" value as an integer
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
      {/* Organization Name */}
      <CCol md={12}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationCustomorganizationName"
        >
          Organization Name
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            {/* <MdLocationPin /> */}
            <CIcon icon={cilBuilding} alt="Name" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="customername"
            value={formData.customername}
            onChange={handleInputChange}
            feedbackInvalid="Organization Name is required"
            id="validationCustom01"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Organization Contact */}
      <CCol md={12}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationCustomorganizationContact"
        >
          Contact Person
        </CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="Contact" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="contactperson"
            value={formData.contactperson}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid phone number"
            id="validationCustom02"
            required
          />
        </CInputGroup>
      </CCol>

      <CCol md={12}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationCustomorganizationContact"
        >
          Organization Contact
        </CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="Contact" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid phone number"
            id="validationCustom02"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Organization Email */}
      <CCol md={12}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationCustomorganizationEmail"
        >
          Organization Email
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
            feedbackInvalid="Organization Email is required"
            id="validationCustomorganizationEmail"
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
      {/* City */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomCity">
          City
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilLibraryBuilding} alt="City" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="City is required."
            id="validationCustom04"
            required
          ></CFormInput>
        </CInputGroup>
      </CCol>
      {/* Street */}
      <CCol md={6}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomStreet">
          Street
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil4k} alt="Street" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="Street is required."
            id="validationCustom05"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Postcode */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPostcode">
          Postcode
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilPaperclip} alt="Postcode" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="Postcode is required"
            id="validationCustom05"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Submit Button */}
      <CCol xs={12}>
        <CButton
          color="primary"
          className="float-end"
          id={`${darkMode ? 'button-dark' : ''}`}
          type="submit"
        >
          {data ? 'Edit Organization' : 'Add Organization'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddOrganizationForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.array, // editdata can be an array
    PropTypes.shape({
      // Or an object
      customername: PropTypes.string,
      contactperson: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      street: PropTypes.string,
      postcode: PropTypes.string,
    }),
  ]),
}

export default AddOrganizationForm
