/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useLoader } from 'src/global-context/LoaderContext'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useMutation } from 'react-query'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CCard,
} from '@coreui/react'
import { addSensorConfiguration, EditSensorConfigurationData } from 'src/hooks/useDevicesSensors'
import { useNavigate, useLocation } from 'react-router-dom'

const AddSensorConfigration = ({ data, sensorData }) => {
  const { mutate: AddSensorConfiguration } = useMutation(addSensorConfiguration)
  const { mutate: editSensorConfiguration } = useMutation(EditSensorConfigurationData)
  const [selectedSensors, setSelectedSensors] = useState([])
  const [validated, setValidated] = useState(false)
  const [tempOneChecked, setTempOneChecked] = useState(false)
  const [tempTwoChecked, setTempTwoChecked] = useState(false)
  const [co2Checked, setCo2Checked] = useState(false)
  const [humidityChecked, setHumidityChecked] = useState(false)
  const { dispatch } = useLoader()
  const { setShowToast } = useGlobalInfo()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const sensorId = localStorage.getItem('sensorId')
  const deviceId = localStorage.getItem('deviceid')

  const [tempOne, settempOne] = useState({
    property: 'temp',
    name: '',
    minvalue: '',
    maxvalue: '',
    unit: '',
    description: 'description',
    deviceId: Number(deviceId),
    sensorId: Number(sensorId),
    hidden: false,
  })
  const [tempTwo, settempTwo] = useState({
    property: 'temp2',
    name: '',
    maxvalue: '',
    minvalue: '',
    unit: '',
    description: '',
    deviceId: Number(deviceId),
    sensorId: Number(sensorId),
    hidden: false,
  })
  const [co2, setco2] = useState({
    property: 'co2',
    name: '',
    minvalue: '',
    maxvalue: '',
    unit: '',
    description: '',
    deviceId: Number(deviceId),
    sensorId: Number(sensorId),
    hidden: false,
  })
  const [humidity, sethumidity] = useState({
    property: 'humidity',
    name: '',
    minvalue: '',
    maxvalue: '',
    unit: '',
    description: '',
    deviceId: Number(deviceId),
    sensorId: Number(sensorId),
    hidden: false,
  })
  // useEffect(() => {
  //   if (data) {
  //     debugger
  //     const propertyMap = {
  //       temp: 'tempOne',
  //       temp2: 'tempTwo',
  //       co2: 'co2',
  //       humidity: 'humidity',
  //     }
  //     const defaultProperties = {
  //       name: '',
  //       minvalue: '',
  //       maxvalue: '',
  //       unit: '',
  //       description: '',
  //       deviceId: '',
  //       // sensorId: '',
  //       is_hidden: false,
  //     }

  //     const mappedData = Object.keys(propertyMap).map((property) => {
  //       const item = data.find((item) => item.property === property)

  //       if (item) {
  //         // Exclude 'id' from the item if it exists
  //         const { id, ...rest } = item
  //         return {
  //           property: property,
  //           ...defaultProperties,
  //           ...rest,
  //         }
  //       } else {
  //         return {
  //           property: property,
  //           ...defaultProperties,
  //         }
  //       }
  //     })

  //     mappedData.forEach((item) => {
  //       const propertyName = propertyMap[item.property]
  //       if (propertyName) {
  //         switch (propertyName) {
  //           case 'tempOne':
  //             settempOne(item)
  //             break
  //           case 'tempTwo':
  //             settempTwo(item)
  //             break
  //           case 'co2':
  //             setco2(item)
  //             break
  //           case 'humidity':
  //             sethumidity(item)
  //             break
  //           default:
  //             break
  //         }
  //       }
  //     })
  //   }
  // }, [data])
  useEffect(() => {
    if (data) {
      const propertyMap = {
        temp: 'tempOne',
        temp2: 'tempTwo',
        co2: 'co2',
        humidity: 'humidity',
      }
      const defaultProperties = {
        name: '',
        minvalue: '',
        maxvalue: '',
        unit: '',
        description: '',
        deviceId: '',
        // sensorId: '',
        is_hidden: false,
      }

      const mappedData = Object.keys(propertyMap).map((property) => {
        const item = data.find((item) => item.property === property)

        if (item) {
          // Exclude 'date_created' and 'date_updated' from the item if they exist
          const { date_created, date_updated, is_deleted, updated_by, deviceId, ...rest } = item
          return {
            property: property,
            ...defaultProperties,
            ...rest,
          }
        } else {
          return {
            property: property,
            ...defaultProperties,
          }
        }
      })

      mappedData.forEach((item) => {
        const propertyName = propertyMap[item.property]
        if (propertyName) {
          switch (propertyName) {
            case 'tempOne':
              settempOne(item)
              break
            case 'tempTwo':
              settempTwo(item)
              break
            case 'co2':
              setco2(item)
              break
            case 'humidity':
              sethumidity(item)
              break
            default:
              break
          }
        }
      })
    }
  }, [data])

  const [formData, setFormData] = useState([])
  const handleTempOneCheckBoxChange = (checked) => {
    setTempOneChecked(checked)
  }
  const handleTempTwoCheckBoxChange = (checked) => {
    setTempTwoChecked(checked)
  }
  const handleCo2CheckBoxChange = (checked) => {
    setCo2Checked(checked)
  }
  const handleHumidityCheckBoxChange = (checked) => {
    setHumidityChecked(checked)
  }
  const handleTempOneChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    settempOne((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }
  const handleTempTwoChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    settempTwo((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }
  const handleCo2Change = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setco2((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }
  const handleHumidityChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    sethumidity((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      debugger
      if (data) {
        const id = sensorData.sensorid
        editSensorConfiguration(
          { handler, id },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Sensor Configuration Edited Successfully',
              }))
            },
            onError: (error) => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content: error?.response?.data?.title,
                color: '#FF0000',
              }))
            },
          },
        )
      } else {
        AddSensorConfiguration(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Device Sensor Configured Successfully',
            }))
          },
          onError: (error) => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Error',
              content: error?.response?.data?.title,
              color: '#FF0000',
            }))
          },
        })
      }
    }, 0)
  }

  const navigate = useNavigate()
  const deviceSensor = () => {
    navigate('/devices-sensors')
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedFormData = []
    if (tempOneChecked) {
      updatedFormData.push(tempOne)
    }
    if (tempTwoChecked) {
      updatedFormData.push(tempTwo)
    }
    if (co2Checked) {
      updatedFormData.push(co2)
    }
    if (humidityChecked) {
      updatedFormData.push(humidity)
    }
    if (data) {
      setFormData(updatedFormData)
      saveHandler(updatedFormData)
      deviceSensor()
    } else {
      setFormData(updatedFormData)
      saveHandler(updatedFormData)
      deviceSensor()
    }
  }
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <CCard className={`table_container_light p-5 ${darkMode ? 'table_container_dark' : ''}`}>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {/*Temperature 1*/}
        <CFormCheck
          id="tempOneCheckbox"
          label="Temperature 1"
          className={`input-light   ${darkMode ? 'input-dark' : ''}`}
          onChange={(e) => handleTempOneCheckBoxChange(e.target.checked)}
          checked={tempOneChecked}
        />
        {/*Name*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Name*
          </CFormLabel>
          <CFormInput
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            type="name"
            placeholder="Enter Sensor Name"
            name="name"
            value={tempOne.name}
            onChange={handleTempOneChange}
            feedbackInvalid="Name is required"
            id="temponeName"
            required
          />
        </CCol>
        {/* Min*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMin">
            Min*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Minimum Value"
            name="minvalue"
            value={tempOne.minvalue}
            onChange={handleTempOneChange}
            feedbackInvalid="Minimum value is required"
            id="tempMin"
            required
          />
        </CCol>

        {/* Max */}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMax">
            Max*
          </CFormLabel>
          <CFormInput
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            type="text"
            placeholder="Enter Maximum Value"
            name="maxvalue"
            value={tempOne.maxvalue}
            onChange={handleTempOneChange}
            feedbackInvalid="Maximum Value is required"
            id="tempMax"
            required
          />
        </CCol>
        {/*unit*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationunit">
            unit*
          </CFormLabel>
          <CFormSelect
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            aria-label="Default select example"
            id="tempunit"
            name="unit"
            value={tempOne.unit}
            onChange={handleTempOneChange}
            feedbackInvalid="unit is required"
            required
          >
            <option>Open this select menu</option>
            <option value="--Name--">--Name--</option>
            <option value="C">C*</option>
            <option value="F">F-</option>
          </CFormSelect>
        </CCol>
        {/* Hide on dashboard*/}
        <CCol xs="auto">
          <CFormLabel
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id={`${darkMode ? 'heading-dark' : ''}`}
            htmlFor="validationTypeSensorId"
            label="Hide on dashboard"
          ></CFormLabel>
        </CCol>
        {/*Description*/}
        <CForm>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Description
          </CFormLabel>
          <CFormTextarea
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id="temponedescribe"
            rows={3}
            name="description"
            value={tempOne.description}
            onChange={handleTempOneChange}
            placeholder="Describe Your Way"
          ></CFormTextarea>
        </CForm>
        {/* Temperature 2*/}
        <CFormCheck
          id="tempTwoCheckbox"
          className={`input-light   ${darkMode ? 'input-dark' : ''}`}
          label="Temperature 2"
          onChange={(e) => handleTempTwoCheckBoxChange(e.target.checked)}
          checked={tempTwoChecked}
        />
        {/*Name*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Name*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Sensor Name"
            name="name"
            value={tempTwo.name}
            onChange={handleTempTwoChange}
            feedbackInvalid="Name is required"
            id="temptwoName"
            required
          />
        </CCol>
        {/* Min*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMin">
            Min*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Minimum Value"
            name="minvalue"
            value={tempTwo.minvalue}
            onChange={handleTempTwoChange}
            feedbackInvalid="Minimum value is required"
            id="validationMin"
            required
          />
        </CCol>

        {/* Max */}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMax">
            Max*
          </CFormLabel>
          <CFormInput
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Maximum Value"
            name="maxvalue"
            value={tempTwo.maxvalue}
            onChange={handleTempTwoChange}
            feedbackInvalid="Maximum Value is required"
            id="validationMax"
            required
          />
        </CCol>
        {/*unit*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationunit">
            unit*
          </CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            id="temptwounit"
            name="unit"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            value={tempTwo.unit}
            onChange={handleTempTwoChange}
            feedbackInvalid="unit is required"
            required
          >
            <option>Open this select menu</option>
            <option value="--Name--">--Name--</option>
            <option value="C">C*</option>
            <option value="F">F-</option>
          </CFormSelect>
        </CCol>
        {/* Hide on dashboard*/}
        <CCol xs="auto">
          <CFormLabel
            id={`${darkMode ? 'heading-dark' : ''}`}
            htmlFor="validationTypeSensorId"
          ></CFormLabel>
          <CFormCheck
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            reverse
            id="temptwoCheckbox1"
            name="hidden"
            checked={tempTwo.hidden}
            onChange={handleTempTwoChange}
            label="Hide on dashboard"
          />
        </CCol>
        {/*Description*/}
        <CForm>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Description
          </CFormLabel>
          <CFormTextarea
            id="temptwodescribe"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            rows={3}
            name="description"
            value={tempTwo.description}
            onChange={handleTempTwoChange}
            placeholder="Describe Your Way"
          ></CFormTextarea>
        </CForm>
        {/*CO^2*/}
        <CFormCheck
          id="co2Checkbox"
          className={`input-light   ${darkMode ? 'input-dark' : ''}`}
          label={
            <span>
              CO<sub>2</sub>
            </span>
          }
          onChange={(e) => handleCo2CheckBoxChange(e.target.checked)}
          checked={co2Checked}
        />
        {/*Name*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Name*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Sensor Name"
            name="name"
            value={co2.name}
            onChange={handleCo2Change}
            feedbackInvalid="Name is required"
            id="co2Name"
            required
          />
        </CCol>
        {/* Min*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMin">
            Min*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Minimum Value"
            name="minvalue"
            value={co2.minvalue}
            onChange={handleCo2Change}
            feedbackInvalid="Minimum value is required"
            id="validationMin"
            required
          />
        </CCol>

        {/* Max */}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMax">
            Max*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Maximum Value"
            name="maxvalue"
            value={co2.maxvalue}
            onChange={handleCo2Change}
            feedbackInvalid="Maximum Value is required"
            id="validationMax"
            required
          />
        </CCol>
        {/*unit*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationunit">
            unit*
          </CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            id="co2unit"
            name="unit"
            value={co2.unit}
            onChange={handleCo2Change}
            feedbackInvalid="unit is required"
            required
          >
            <option>Open this select menu</option>
            <option value="--Name--">--Name--</option>
            <option value="C">C*</option>
            <option value="F">F-</option>
          </CFormSelect>
        </CCol>
        {/* Hide on dashboard*/}
        <CCol xs="auto">
          <CFormLabel
            id={`${darkMode ? 'heading-dark' : ''}`}
            htmlFor="validationTypeSensorId"
          ></CFormLabel>
          <CFormCheck
            reverse
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id="co2Checkbox1"
            name="hidden"
            checked={co2.hidden}
            onChange={handleCo2Change}
            label="Hide on dashboard"
          />
        </CCol>
        {/*Description*/}
        <CForm>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Description
          </CFormLabel>
          <CFormTextarea
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id="co2describe"
            rows={3}
            name="description"
            value={co2.description}
            onChange={handleCo2Change}
            placeholder="Describe Your Way"
          ></CFormTextarea>
        </CForm>
        {/*Humadity*/}
        <CFormCheck
          id="humidityCheckbox"
          className={`input-light   ${darkMode ? 'input-dark' : ''}`}
          label="Humidity"
          onChange={(e) => handleHumidityCheckBoxChange(e.target.checked)}
          checked={humidityChecked}
        />
        {/*Name*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Name*
          </CFormLabel>
          <CFormInput
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            type="text"
            placeholder="Enter Sensor Name"
            name="name"
            value={humidity.name}
            onChange={handleHumidityChange}
            feedbackInvalid="Name is required"
            id="humidityName"
            required
          />
        </CCol>
        {/* Min*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMin">
            Min*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Minimum Value"
            name="minvalue"
            value={humidity.minvalue}
            onChange={handleHumidityChange}
            feedbackInvalid="Minimum value is required"
            id="humidityMin"
            required
          />
        </CCol>

        {/* Max */}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationMax">
            Max*
          </CFormLabel>
          <CFormInput
            type="text"
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            placeholder="Enter Maximum Value"
            name="maxvalue"
            value={humidity.maxvalue}
            onChange={handleHumidityChange}
            feedbackInvalid="Maximum Value is required"
            id="humidityMax"
            required
          />
        </CCol>
        {/*unit*/}
        <CCol xs="auto">
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationunit">
            unit*
          </CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            id="humidityunit"
            name="unit"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            value={humidity.unit}
            onChange={handleHumidityChange}
            feedbackInvalid="unit is required"
            required
          >
            <option>Open this select menu</option>
            <option value="--Name--">--Name--</option>
            <option value="C">C*</option>
            <option value="F">F-</option>
          </CFormSelect>
        </CCol>
        {/* Hide on dashboard*/}
        <CCol xs="auto">
          <CFormLabel
            id={`${darkMode ? 'heading-dark' : ''}`}
            htmlFor="validationTypeSensorId"
          ></CFormLabel>
          <CFormCheck
            reverse
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id="humidityCheckbox1"
            name="hidden"
            checked={humidity.hidden}
            onChange={handleHumidityChange}
            label="Hide on dashboard"
          />
        </CCol>
        {/*Description*/}
        <CForm>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationName">
            Description
          </CFormLabel>
          <CFormTextarea
            className={`input-light   ${darkMode ? 'input-dark' : ''}`}
            id="humiditydescribe"
            rows={3}
            name="description"
            value={humidity.description}
            onChange={handleHumidityChange}
            placeholder="Describe Your Way"
          ></CFormTextarea>
        </CForm>
        {/*Button*/}
        {!data ? (
          <CCol xs="auto">
            <CButton variant="outline" onClick={deviceSensor}>
              Back
            </CButton>
          </CCol>
        ) : null}

        {/* Submit Button */}
        <CCol xs="auto">
          <CButton color="primary" type="submit">
            Configure
          </CButton>
        </CCol>
      </CForm>
    </CCard>
  )
}

export default AddSensorConfigration

AddSensorConfigration.propTypes = {
  data: PropTypes.func.isRequired,
  sensorData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    deviceId: PropTypes.number,
    sensorId: PropTypes.string,
  }),
}
