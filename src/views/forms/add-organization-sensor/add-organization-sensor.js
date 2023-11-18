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
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'
import { useMutation } from 'react-query'
import { getAllSensors } from 'src/hooks/useOrganizationDevices'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { cilBuilding } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AddOrganizationSensor = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const dataOrganization = useDataStore((state) => state.data)
  const [orgId, setOrgId] = useState()
  const [formData, setFormData] = useState({
    // sensors: [],
    customerid: orgId,
    aws_sensorid: '',
  })
  useEffect(() => {
    // debugger
    if (data) {
      setFormData({
        aws_sensorid: data.aws_sensorid,
        id: Number(data.sensorid),
        customerid: Number(data.customerid),
      })
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target
  //   if (name === 'typeSensorId') {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       sensors: [value],
  //     }))
  //   } else if (name === 'sensorId') {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       sensors: [...prevData.sensors, value],
  //     }))
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       sensorId: [value],
  //     }))
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: type === 'checkbox' ? checked : value,
  //     })
  //   }
  // }
  const handleOrgChange = (e) => {
    const selectedOrgId = parseInt(e.target.value, 10) || 0 // Parse as an integer or default to 0
    setFormData({
      ...formData,
      customerid: selectedOrgId,
    })
    setOrgId(selectedOrgId)
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
      // debugger
      saveHandler(formData)
      event.preventDefault()
      closeModal()
    }
  }
  const { mutate: getAllSensorsData, data: sensorData } = useMutation(getAllSensors)
  useEffect(() => {
    getAllSensorsData('', {
      onSuccess: (data) => {},
      onError: (error) => {
        console.log(error)
      },
    })
  }, [])
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <CForm
      className="row mt-2 g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Type Sensor Id */}
      {/* <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationTypeSensorId">
          Type Sensor Id *
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            {' '}
            <CIcon icon={cilBuilding} alt="typeSensorid" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="aws_sensorid"
            value={formData.aws_sensorid}
            onChange={handleInputChange}
            feedbackInvalid="Type Sensor Id is required"
            id="validationTypeSensorId"
            disabled={data ? true : false}
          />
        </CInputGroup>
      </CCol> */}
      {/* Sensor Id*/}
      {!data ? (
        <CCol md={12}>
          {/* Form select*/}
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationSensorId">
            Sensor Id*
          </CFormLabel>
          <CFormSelect
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid sensor id"
            name="aws_sensorid"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            value={formData.aws_sensorid}
            id="validationSensorId"
            onChange={handleInputChange}
            // required
          >
            <option>Select Sensors</option>
            {sensorData?.data?.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
      ) : null}
      {/* Organization */}
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationOrganization">
          Organization*
        </CFormLabel>
        <CFormSelect
          aria-describedby="validationCustom04Feedback"
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          name="organization"
          value={formData.customerid}
          feedbackInvalid="Please select a valid Organization"
          id="validationOrganization"
          onChange={handleOrgChange}
          required
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

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Organization Sensor' : 'Add Organization Sensor'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddOrganizationSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    typeSensorId: PropTypes.string,
    sensorId: PropTypes.string,
    organization: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        organizationName: PropTypes.string,
      }),
    ]),
  }),
}
AddOrganizationSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    customerid: PropTypes.string,
    sensorId: PropTypes.string,
  }),
}
export default AddOrganizationSensor
