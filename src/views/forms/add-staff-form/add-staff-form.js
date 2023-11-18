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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin, cilPaperPlane, cilPaperclip, cilPhone } from '@coreui/icons'
import { getAllRolesData } from 'src/hooks/useUsers'
import { useMutation } from 'react-query'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
// eslint-disable-next-line react/prop-types
const AddStaffForm = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const { mutate: Roles } = useMutation(getAllRolesData)
  const [UserData, setUserdata] = useState([])
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phonenumber: '',
    roleid: 0,
  })
  useEffect(() => {
    debugger
    if (data) {
      setFormData(() => ({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        phonenumber: data.phonenumber,
        roleid: data.roleid,
      }))
    }
  }, [data])
  function getAllRoles() {
    // // debugger
    Roles('', {
      onSuccess: (data) => {
        setUserdata(data.data)
      },
      onError: (error) => {},
    })
  }
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const parsedValue = name === 'roleid' ? parseInt(value, 10) : value
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

  useEffect(() => {
    if (!data) {
      getAllRoles()
    }
  }, [darkMode])
  return (
    <CForm
      className="row mt-2 g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Role
        </CFormLabel>
        <CFormSelect
          name="roleid"
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid facility."
          id="validationFacility"
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          value={formData.roleid}
          onChange={handleInputChange}
          disabled={data ? true : false}
          required
          // eslint-disable-next-line react/prop-types
        >
          <option>Select Role</option>
          {UserData?.map((item) => {
            return (
              <option key={item.roleid} value={item.roleid}>
                {item.name}
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
      {/* Phone Number */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationCustomPhonenumber">
          Phone Number
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="Phonenumber" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleInputChange}
            aria-describedby="validationCustom05Feedback"
            feedbackInvalid="Phone Number is required"
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
          {data ? 'Edit Staff ' : 'Add Staff '}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddStaffForm.propTypes = {
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
      roleid: PropTypes.number,
    }),
  ]),
}

export default AddStaffForm
