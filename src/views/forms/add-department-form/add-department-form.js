import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import useDataStore from 'src/store/state'
import { getFacilitiesData } from 'src/hooks/useAuth'
import {
  _department,
  _facility,
  _organization,
  _view,
  _create,
  hasPermissionToActionAccess,
} from 'src/constants/permissionContant'
import { getAllFacilitiesData } from 'src/hooks/useFacilities'
import { useMutation } from 'react-query'
const AddDepartmentForm = ({ closeModal, saveHandler, data }) => {
  const dataOrganization = useDataStore((state) => state.data)
  const { dispatch } = useLoader()
  const [facilityData, setFacilityData] = useState()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const userPermissions = JSON.parse(localStorage.getItem('permissions'))
  const { mutate: facility } = useMutation(getAllFacilitiesData)
  const organizationPermission = hasPermissionToActionAccess(userPermissions, _organization, _view)
  const facilityPermission = hasPermissionToActionAccess(userPermissions, _facility, _view)
  const departmentPermission = hasPermissionToActionAccess(userPermissions, _department, _view)
  const [formData, setFormData] = useState({
    departmentname: '',
    email: '',
    description: '',
    customerid: 'Selected Organization',
    facilityid: '',
  })
  useEffect(() => {
    if (data) {
      facilitiesDataFetch(data?.customerid)
      setFormData(() => ({
        departmentname: data?.departmentname,
        email: data?.email,
        description: data?.description,
        customerid: data?.customerid,
        facilityid: data?.facilityid,
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
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    console.log(e.target.value)
    const parsedValue =
      (name === 'customerid' || name === 'facilityid') &&
      value !== `Selected ${name.charAt(0).toUpperCase() + name.slice(1)}`
        ? parseInt(value, 10)
        : value
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : parsedValue,
    })
    if (name === 'customerid') {
      facilitiesDataFetch(value)
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
    }
  },[facilityPermission])
  // useEffect(() => {
  //   if (formData.customerid !== '') {
  //     facilitiesDataFetch(localStorage.getItem('OrganizationId'))
  //   }
  // }, [])
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

      {/* Facility */}
      {facilityPermission && (
        <CCol md={12}>
          <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
            Facility*
          </CFormLabel>
          <CFormSelect
            name="facilityid"
            aria-describedby="validationCustom04Feedback"
            feedbackInvalid="Please select a valid facility."
            id="validationFacility"
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
      {/* Department Name */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDepartmentName">
          Department Name*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="Name" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="departmentname"
            value={formData.departmentname}
            onChange={handleInputChange}
            feedbackInvalid="Department Name is required"
            id="validationDepartmentName"
            required
          />
        </CInputGroup>
      </CCol>

      {/*Department Email */}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationDepartmentEmail">
          Department Email*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilEnvelopeClosed} alt="Departmentemail" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-describedby="validationDepartmentEmail"
            feedbackInvalid="Department Email is required."
            id="validationDepartmentEmail"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Description*/}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="description">
          Description*
        </CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil4k} alt="description" />
          </CInputGroupText>
          <CFormInput
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            feedbackInvalid="Description is required"
            id="validationDescription"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Active*/}
      <CCol md={12}>
        <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationFacilityName">
          Active
        </CFormLabel>
        <CFormCheck id="flexCheckDefault" label=" " />
      </CCol>

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          {data ? 'Edit Department' : 'Add Department'}
        </CButton>
      </CCol>
    </CForm>
  )
}
AddDepartmentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    departmentname: PropTypes.string,
    system: PropTypes.string,
    contactEmail: PropTypes.string,
    description: PropTypes.string,
    organizationId: PropTypes.number,
    systemId: PropTypes.number,
  }),
}

export default AddDepartmentForm
