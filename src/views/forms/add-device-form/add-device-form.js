/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
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
import { cilBuilding, cilSignalCellular0 } from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'
import { useMutation } from 'react-query'
import { getDepartmentsData, getFacilitiesData } from 'src/hooks/useAuth'
import { getAllDepartmentsData } from 'src/hooks/useDepartments'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import {
  _department,
  _facility,
  _organization,
  _view,
  _create,
  hasPermissionToActionAccess,
} from 'src/constants/permissionContant'
import { getAllFacilitiesData } from 'src/hooks/useFacilities'
const AddDeviceForm = ({ closeModal, saveHandler, data }) => {
  const dataOrganization = useDataStore((state) => state.data)
  const userPermissions = JSON.parse(localStorage.getItem('permissions'))
  const [validated, setValidated] = useState(false)
  const [facilityData, setFacilityData] = useState()
  const [departmentsData, setDepartmentsData] = useState()
  const { dispatch } = useLoader()
  const { mutate: facility } = useMutation(getAllFacilitiesData)
  const { mutate: getAllDep } = useMutation(getAllDepartmentsData)
  const organizationPermission = hasPermissionToActionAccess(userPermissions, _organization, _view)
  const facilityPermission = hasPermissionToActionAccess(userPermissions, _facility, _view)
  const departmentPermission = hasPermissionToActionAccess(userPermissions, _department, _view)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [formData, setFormData] = useState({
    devicename: '',
    manufacturer: '',
    facilityid: 0,
    departmentid: 0,
    // active: true,
    customerid: 0,
    email: '',
  })
  useEffect(() => {
    if (data) {
      // // debugger
      // facilitiesDataFetch(data?.customerid)
      // departmentsDataFetch(data?.departmentid)
      setFormData(() => ({
        devicename: data.devicename,
        manufacturer: data.manufacturer,
        facilityid: data?.facilityid,
        departmentid: data?.departmentid,
        organizationId: data?.customerid,
        email: data.email,
      }))
    }
  }, [data])
  const { mutate: getFacilities } = useMutation(getFacilitiesData)
  function facilitiesDataFetch(selectedId) {
    if (selectedId !== null) {
      getFacilities(selectedId, {
        onSuccess: (data) => {
          setFacilityData(data)
        },
        onError: (error) => {},
      })
    }
  }
  const { mutate: getDepartments } = useMutation(getDepartmentsData)
  function departmentsDataFetch(selectedId) {
    getDepartments(selectedId, {
      onSuccess: (data) => {
        setDepartmentsData(data)
      },
      onError: (error) => {},
    })
  }
  const handleInputChange = (e) => {
    console.log(e.target.value)
    const { name, value, type, checked } = e.target
    console.log(e.target.value)
    const parsedValue =
      (name === 'customerid' || name === 'facilityid' || name === 'departmentid') &&
      value !== `Selected ${name.charAt(0).toUpperCase() + name.slice(1)}`
        ? parseInt(value, 10)
        : value
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : parsedValue,
    })
    if (name === 'customerid') {
      facilitiesDataFetch(value)
    } else if (name === 'facilityid') {
      departmentsDataFetch(value)
    }
  }
  function getAllFacilities() {
    facility('', {
      onSuccess: (data) => {
        setFacilityData(data)
      },
      onError: (error) => {},
    })
  }
  function getAllDepartments() {
    getAllDep('', {
      onSuccess: (data) => {
        setDepartmentsData(data)
      },
      onError: (error) => {},
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
  useEffect(() => {
    if (facilityPermission) {
      getAllFacilities()
    } else if (departmentPermission) {
      // debugger
      getAllDepartments()
    }
  }, [facilityPermission])
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

      {/* Facilities */}
      {facilityPermission && (
        <CCol md={12}>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationManufacturerName">
            Facility*
          </CFormLabel>
          <CFormSelect
            name="facilityid"
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid facility."
            id="validationFacilities"
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            value={formData.facilityid}
            onChange={handleInputChange}
            required
            // eslint-disable-next-line react/prop-types
            disabled={data ? true : false}
          >
            <option>Select Facility</option>
            {facilityData?.data?.map((item) => {
              return (
                <option key={item.facilityid} value={item.facilityid}>
                  {item.name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
      )}
      {/*Department Selection */}
      {departmentPermission && (
        <CCol md={12}>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationManufacturerName">
            Department Selection*
          </CFormLabel>
          <CFormSelect
            name="departmentid"
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid facility."
            id="validationDepartment"
            value={formData.departmentid}
            onChange={handleInputChange}
            className={` form-select ${darkMode ? 'select-dark' : ''}`}
            required
            // eslint-disable-next-line react/prop-types
            disabled={data ? true : false}
          >
            <option>Select Department</option>
            {departmentsData?.data?.map((item) => {
              return (
                <option key={item.departmentid} value={item.departmentid}>
                  {item.departmentname}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
      )}
      {/* Device Name */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDevicesName">
          Device Name*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="devicename"
            value={formData.devicename}
            onChange={handleInputChange}
            feedbackInvalid="Device Name is required"
            id="validationDeviceName"
            required
          />
        </CInputGroup>
      </CCol>

      {/* Manufacturer Name */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationManufacturerName">
          Manufacturer Name*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilSignalCellular0} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            feedbackInvalid="Manufacturer Name is required"
            id="validationManufacturerName"
            required
          />
        </CInputGroup>
      </CCol>
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDevicesName">
          Email
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            feedbackInvalid="Device Name is required"
            id="validationDeviceName"
            required
            disabled={data ? true : false}
          />
        </CInputGroup>
      </CCol>

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Device' : 'Add Device'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddDeviceForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    deviceName: PropTypes.string,
    name: PropTypes.string,
    manufacturerName: PropTypes.string,
    facilityid: PropTypes.string,
    department: PropTypes.string,
    manufacturer: PropTypes.string, // Added manufacturer validation
    system: PropTypes.shape({
      systemName: PropTypes.string, // Added system and systemName validation
    }),
  }),
}

export default AddDeviceForm
