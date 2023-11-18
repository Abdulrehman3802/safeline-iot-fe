import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'
import {
  cilAudio,
  cilAudioSpectrum,
  cilBarChart,
  cilBuilding,
  cilCast,
  cilDevices,
  cilLibraryBuilding,
  cilPeople,
} from '@coreui/icons'

// Import your permissions and constants here
import {
  hasPermissionToAction,
  _view,
  _user,
  _organization,
  _facility,
  _department,
  _device,
  _sensor,
} from './constants/permissionContant'
import { useGlobalInfo } from './global-context/GlobalContext'

const userPermissions = JSON.parse(localStorage.getItem('permissions'))
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    permissions: [`${_device}_${_view}`], // Example permission for viewing the dashboard
  },
  {
    component: CNavGroup,
    name: 'Admin',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Organizations',
        to: '/organizations',
        icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon ps-4" />,
        permissions: [`${_organization}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Facilities',
        to: '/Facilities',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon ps-4" />,
        permissions: [`${_facility}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Department',
        to: '/department',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon ps-4" />,
        permissions: [`${_department}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Devices',
        to: '/devices',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon ps-4" />,
        permissions: [`${_device}_${_view}`],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Staff',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Facility Staff',
        to: '/Facilities-staff',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon ps-4" />,
        permissions: [`${_facility}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Department Staff',
        to: '/Department-staff',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon ps-4" />,
        permissions: [`${_department}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Devices Staff',
        to: '/Devices-staff',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon ps-4" />,
        permissions: [`${_device}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon ps-4" />,
        permissions: [`${_device}_${_view}`],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sensor Setup',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Organization Sensors',
        to: '/organization-sensors',
        icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon ps-4" />,
        permissions: [`${_organization}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'Devices Sensors',
        to: '/devices-sensors',
        icon: <CIcon icon={cilCast} customClassName="nav-icon ps-4" />,
        permissions: [`${_sensor}_${_view}`],
      },
      {
        component: CNavItem,
        name: 'GateWays',
        to: '/gateway',
        icon: <CIcon icon={cilCast} customClassName="nav-icon ps-4" />,
        permissions: [`${_sensor}_${_view}`],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Alerts',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alarm Recipients',
        to: '/notification-alerts',
        icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon ps-4" />,
        // permissions: [`${_organization}_${_view}`],
      },
      // {
      //   component: CNavItem,
      //   name: 'Alarm Thresholds',
      //   to: '/alarm-thresholds',
      //   icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon ps-4" />,
      //   // permissions: [`${_organization}_${_view}`],
      // },
    ],
  },
]

// Filter the items based on the user's permissions
const filteredNav = _nav
  .map((item) => {
    if (!item.permissions || hasPermissionToAction(userPermissions, ...item.permissions)) {
      if (item.items) {
        item.items = item.items.filter(
          (subItem) =>
            !subItem.permissions || hasPermissionToAction(userPermissions, ...subItem.permissions),
        )
      }
      return item
    }
    return null
  })
  .filter(Boolean) // Remove null items

export default filteredNav
