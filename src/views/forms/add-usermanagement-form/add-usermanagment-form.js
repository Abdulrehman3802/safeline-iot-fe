import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibMailchimp,
  cil3d,
  cil4k,
  cilActionUndo,
  cilAirplay,
  cilBuilding,
  cilEnvelopeClosed,
  cilLibraryBuilding,
  cilLocationPin,
  cilPaperPlane,
  cilPaperclip,
  cilPhone,
  cilTerminal,
} from '@coreui/icons'

const  AddUsermanagmentForm = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    Name: '',
    mobileNumber:'',
    phoneNumber:'',
    emailAdddress: '',
    system:'',
    textToEmail:'',
    textToSpeech:''
  })
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
      event.preventDefault()
    }
  }

  return (
    <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmit}
  >
    {/* Name */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationName">Name*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilBuilding} alt="Name" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          feedbackInvalid="Name is required"
          id="validationName"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Phone Number */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationPhoneNumber">Phone Number*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilPhone} alt="phoneNumber" />
        </CInputGroupText>
        <CFormInput
          type="phonenumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          feedbackInvalid="Phone Number is required"
          id="validationPhone Number"
          required
        />
      </CInputGroup>
    </CCol>
    
    {/* Mobile Number */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationMobileNumber">Mobile Number*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilPhone} alt="mobileNumber" />
        </CInputGroupText>
        <CFormInput
          type="phoneNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          feedbackInvalid="Mobile Number is required"
          id="validationMobileNumber"
          required
        />
      </CInputGroup>
    </CCol>
    
    
    
    {/* Email Address */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationEmailAddress">Email Address*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilEnvelopeClosed} alt="emailAddress" />
        </CInputGroupText>
        <CFormInput
          type="email"
          name="emailAddress"
          value={formData.emailAdddress}
          onChange={handleInputChange}
          aria-describedby="validationEmailAddress"
          feedbackInvalid="Email Address is required."
          id="validationEmailAddress"
          required
        />
      </CInputGroup>
    </CCol>

    {/* System */}
<CCol md={12}>
      {/* Form select*/}
      <CFormLabel htmlFor="validationSystem">System*</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select valid system."
        id="validationSystem"
        name='system'
        value={formData.system}
        onChange={handleInputChange}
        required
      >
        <option >Choose...</option>
        <option>Lahore City</option>
        <optio>Karachi City</optio>
        <option>Murre City</option>
      </CFormSelect>
</CCol>
    {/* Plain text email Address*/}
    <CCol md={6}>
      <CFormLabel htmlFor="validationTextToEmail">Plain text to Email</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilLibraryBuilding} alt="textToEmail" />
        </CInputGroupText>
        <CFormInput
          type="email"
          name="textToEmail"
          value={formData.textToEmail}
          onChange={handleInputChange}
          placeholder='user@mail.com'
          aria-describedby="validationTexttoEmail"
          feedbackInvalid="Text to Plain required."
          id="validationTextToEmail"
          required
        ></CFormInput>
      </CInputGroup>
    </CCol>
    {/* Text to Speech */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationTextToSpeech">Text to Speech*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilBuilding} alt="textToSpeech" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="textToSpeech"
          placeholder='....'
          value={formData.textToSpeech}
          onChange={handleInputChange}
          aria-describedby="validationTexttoSpeech"
          feedbackInvalid="Text to Speeech is required."
          id="validationTextToSpeech"
          required
        />
      </CInputGroup>
    </CCol>
   
   {/* Submit Button */}
   <CCol xs={12}>
      <CButton color="primary" type="submit">
        Submit form
      </CButton>
    </CCol>
  </CForm>
  )
}

export default AddUsermanagmentForm;