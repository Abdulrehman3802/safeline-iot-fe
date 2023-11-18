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
import { cil3d, cilNotes, cilPhone } from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const Gateway = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    gateway_id: '',
    gateway_note: '',
    customerid: Number(localStorage.getItem('OrganizationId')),
  })
  useEffect(() => {
    if (data) {
      setFormData(() => ({
        gateway_id: data.gateway_id,
        gateway_note: data.gateway_note,
        customerid: data.customerid,
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
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      showLoader()
      debugger
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
      {/* Gateway ID */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Gateway ID*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil3d} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="gateway_id"
            value={formData.gateway_id}
            onChange={handleInputChange}
            feedbackInvalid="Facility Name is required"
            id="validationFacilityName"
            required
            disabled={data ? true : false}
          />
        </CInputGroup>
      </CCol>

      {/* Notes */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Notes*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilNotes} alt="Notes" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="gateway_note"
            value={formData.gateway_note}
            onChange={handleInputChange}
            feedbackInvalid="Facility Name is required"
            id="validationFacilityName"
            required
          />
        </CInputGroup>
      </CCol>

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Facility' : 'Add GateWay'}
        </CButton>
      </CCol>
    </CForm>
  )
}
Gateway.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    gateway_id: PropTypes.string,
    gateway_note: PropTypes.string,
  }),
}

export default Gateway
