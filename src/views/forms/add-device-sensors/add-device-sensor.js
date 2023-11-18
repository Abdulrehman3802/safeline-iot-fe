import React, { useState, useEffect } from 'react'
import AddSensorConfigration from '../add-sensor-configration/add-sensor-configration'
import { GenericModal } from 'src/components/modal/GenericModal'
import PropTypes from 'prop-types'
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
import { useLoader } from 'src/global-context/LoaderContext'
import { getAllSensors } from 'src/hooks/useOrganizationDevices'
import { useAllDevicesData } from 'src/hooks/useDevices'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useMutation } from 'react-query'
const AddDeviceSensor = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const { data: allDevices } = useAllDevicesData()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [AddsensorConfiguration, setIsAddsensorConfiguration] = useState(false)
  const [validated, setValidated] = useState(false)
  const orgID = localStorage.getItem('OrganizationId')
  // const [orgID , setorgID] = useState()
  const [deviceId, setDeviceId] = useState()
  const [formData, setFormData] = useState({
    aws_sensorid: '',
    sensorname: '',
    deviceid: deviceId,
    customerid: Number(orgID),
    // active: true,
  })
  useEffect(() => {
    debugger
    if (data) {
      setFormData({
        customerid: data.customerid,
        aws_sensorid: data.aws_sensorid,
        sensorname: data.sensorname,
        deviceid: data.deviceid,
        // active: true,
      })
    }
  }, [data])
  const { mutate: getAllSensorsData, data: sensorData } = useMutation(getAllSensors)
  useEffect(() => {
    getAllSensorsData('', {
      onSuccess: (data) => {},
      onError: (error) => {},
    })
  }, [])
  const sensorConfigure = () => {
    navigate('/devices-sensors/sensor-configration')
  }
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
      // sensorConfigure()
      closeModal()
    }
  }
  const handledeviceChange = (e) => {
    const selectedDeviceId = parseInt(e.target.value, 10) || 0 // Parse as an integer or default to 0
    setDeviceId(selectedDeviceId)
    setFormData({
      ...formData,
      deviceid: selectedDeviceId,
    })
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <CForm
      className="row mt-2 g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Sensor Id */}
      {/* <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationSensorId">
          Sensor Id *
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="typeSensorid" />
          </CInputGroupText>
          <CFormInput
            type="text"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="sensorId"
            value={formData.sensorId}
            onChange={handleInputChange}
            feedbackInvalid=" Sensor Id is required"
            id="validationSensorId"
            disabled={data ? true : false}
            required
          />
        </CInputGroup>
      </CCol> */}
      <CCol md={12}>
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
          disabled={data ? true : false}
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
      {/*Sensor name*/}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationSensorname">
          Sensor Name*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="typeSensorid" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="sensorname"
            value={formData.sensorname}
            onChange={handleInputChange}
            feedbackInvalid=" Sensor Name is required"
            id="validationSensorname"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Device Selection */}
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDeviceSelection">
          Device Selection*
        </CFormLabel>
        <CFormSelect
          className={` form-select ${darkMode ? 'select-dark' : ''}`}
          aria-describedby="validationCustom04Feedback"
          name="deviceSelection"
          value={deviceId}
          feedbackInvalid="Please select a valid Device Selection"
          id="validationDeviceSelection"
          onChange={handledeviceChange}
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

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Device Sensor' : 'Add Device Sensor'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddDeviceSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  TableHide: PropTypes.func.isRequired,
  data: PropTypes.shape({
    sensorId: PropTypes.string,
    sensorname: PropTypes.string,
    deviceId: PropTypes.number,
    active: PropTypes.bool,
  }),
}
export default AddDeviceSensor
