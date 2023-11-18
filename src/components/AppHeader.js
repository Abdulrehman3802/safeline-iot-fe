/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CFormSelect,
  CButton,
  CFormInput,
  CForm,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useMutation } from 'react-query'
import { getDepartmentsData, getFacilitiesData, getOrganizationData } from 'src/hooks/useAuth'
import { getAllFacilitiesData } from 'src/hooks/useFacilities'
import { getAllDepartmentsData } from 'src/hooks/useDepartments'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import useStore from 'src/store/state'
import useDataStore from 'src/store/state'
import { getAllDevicesById } from 'src/hooks/useDevices'
import {
  _department,
  _facility,
  _organization,
  _view,
  _create,
  _device,
  hasPermissionToActionAccess,
} from 'src/constants/permissionContant'

const AppHeader = () => {
  const addData = useDataStore((state) => state.addData)
  const userPermissions = JSON.parse(localStorage.getItem('permissions'))
  const { setDepartmentId } = useGlobalInfo()
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const dispatched = useDispatch()
  const [organizationData, setOrganizationData] = useState([])
  const { mutate: facility } = useMutation(getAllFacilitiesData)
  const { mutate: getAllDep } = useMutation(getAllDepartmentsData)
  const organizationPermission = hasPermissionToActionAccess(userPermissions, _organization, _view)
  const facilityPermission = hasPermissionToActionAccess(userPermissions, _facility, _view)
  const departmentPermission = hasPermissionToActionAccess(userPermissions, _department, _view)
  const devicePermission = hasPermissionToActionAccess(userPermissions, _device, _view)
  const mail = localStorage.getItem('email')
  let role = ''
  if (organizationPermission) {
    role = 'SuperAdmin'
  } else if (facilityPermission) {
    role = 'Organization Admin'
  } else if (departmentPermission) {
    role = 'Facility Admin'
  } else if (devicePermission) {
    role = 'Department Admin'
  }
  const {
    facilityData,
    setFacilityData,
    departmentsData,
    setDepartmentsData,
    devicesData,

    setDevicesData,
  } = useGlobalInfo()
  const handleOrganizationChange = (event) => {
    setDepartmentId('')
    localStorage.removeItem('facilityId')
    localStorage.removeItem('departmentId')
    const selectedId = event.target.value
    setFacilityData([])
    setDepartmentsData([])
    localStorage.setItem('OrganizationId', selectedId)
    facilitiesDataFetch(selectedId)
  }
  const handleFacilityChange = (event) => {
    const selectedId = event.target.value
    localStorage.setItem('facilityId', selectedId)
    localStorage.removeItem('departmentId')
    setDepartmentsData([])
    departmentsDataFetch(selectedId)
  }
  const handleDepartmentChange = (event) => {
    const selectedId = event.target.value
    devicesDataFetch(selectedId)
    localStorage.setItem('departmentId', selectedId)
    setDepartmentId(selectedId)
  }

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { mutate: getOrganization } = useMutation(getOrganizationData)
  function organizationDataFetch() {
    getOrganization('', {
      onSuccess: (data) => {
        hideLoader()
        setOrganizationData(data)
        addData(data.data)
      },
      onError: (error) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          localStorage.removeItem('token')
          localStorage.removeItem('OrganizationId')
          localStorage.removeItem('facilityId')
          localStorage.removeItem('departmentId')
          navigate('/login')
        }
        hideLoader()
      },
    })
  }
  function getAllFacilities() {
    facility('', {
      onSuccess: (data) => {
        hideLoader()
        setFacilityData(data.data)
      },
      onError: (error) => {},
    })
  }
  const { mutate: getFacilities } = useMutation(getFacilitiesData)
  function facilitiesDataFetch(selectedId) {
    showLoader()
    getFacilities(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setFacilityData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const { mutate: getDevices } = useMutation(getAllDevicesById)
  function devicesDataFetch(selectedId) {
    showLoader()
    getDevices(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setDevicesData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  function getAllDepartments() {
    // debugger
    getAllDep('', {
      onSuccess: (data) => {
        // debugger
        hideLoader()
        setDepartmentsData(data.data)
      },
      onError: (error) => {},
    })
  }
  const { mutate: getDepartments } = useMutation(getDepartmentsData)
  function departmentsDataFetch(selectedId) {
    showLoader()
    getDepartments(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setDepartmentsData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  useEffect(() => {
    showLoader()
    if (organizationPermission) {
      organizationDataFetch()
      if (
        localStorage.getItem('OrganizationId') !== undefined ||
        localStorage.getItem('OrganizationId') !== null
      ) {
        facilitiesDataFetch(localStorage.getItem('OrganizationId'))
      }
      if (
        localStorage.getItem('facilityId') !== undefined ||
        localStorage.getItem('facilityId') !== null
      ) {
        departmentsDataFetch(localStorage.getItem('facilityId'))
      }
    } else if (facilityPermission) {
      getAllFacilities()
      if (
        localStorage.getItem('facilityId') !== undefined ||
        localStorage.getItem('facilityId') !== null
      ) {
        departmentsDataFetch(localStorage.getItem('facilityId'))
      }
    } else if (departmentPermission) {
      // // debugger
      getAllDepartments()
    } else {
      hideLoader()
    }
  }, [])

  const { darkMode, setDarkMode } = useGlobalInfo()
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <CHeader className={`mb-4 ${darkMode ? 'header-dark' : ''}`} position="sticky">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatched({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon className={`  ${darkMode ? 'icon-dark' : ''}`} icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <h2 style={{ color: '#0f172a' }}>Safeline IOT</h2>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto gap-4">
          {organizationPermission && (
            <CNavItem>
              <select
                size="sm"
                className={` form-select ${darkMode ? 'select-dark' : ''}`}
                aria-label="Organization"
                onChange={handleOrganizationChange}
                value={localStorage.getItem('OrganizationId')}
              >
                <option>Select Organization</option>
                {organizationData?.data?.map((item) => {
                  return (
                    <option key={item.customerid} value={item.customerid}>
                      {item.customername}
                    </option>
                  )
                })}
              </select>
            </CNavItem>
          )}
          {facilityPermission && (
            <CNavItem>
              <select
                size="sm"
                className={` form-select ${darkMode ? 'select-dark' : ''}`}
                aria-label="Facility"
                onChange={handleFacilityChange}
                value={localStorage.getItem('facilityId')}
              >
                <option>Select Facility</option>
                {facilityData?.map((item) => {
                  return (
                    <option key={item.facilityid} value={item.facilityid}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </CNavItem>
          )}
          {departmentPermission && (
            <CNavItem>
              <select
                size="sm"
                className={` form-select ${darkMode ? 'select-dark' : ''}`}
                aria-label="Department"
                onChange={handleDepartmentChange}
                value={localStorage.getItem('departmentId')}
              >
                <option>Select Department</option>
                {departmentsData?.map((item) => {
                  return (
                    <option key={item.departmentid} value={item.departmentid}>
                      {item.departmentname}
                    </option>
                  )
                })}
              </select>
            </CNavItem>
          )}
          <CNavItem>
            <CButton id={`${darkMode ? 'button-dark' : ''}`} onClick={toggleDarkMode}>
              Change Mode
            </CButton>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav style={{ display: 'block' }}>
          <h5 className={`m-0 ${darkMode ? 'heading-dark01' : 'heading-light01'}`}>{role}</h5>
          <p className={`m-0 ${darkMode ? 'heading-dark01' : 'heading-light01'}`}>{mail}</p>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
