import React from 'react'
import AddSensorConfigration from './views/forms/add-sensor-configration/add-sensor-configration'
import CustomRoute from './constants/CustomRoute'
import Page404 from './views/pages/page404/Page404'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Organization = React.lazy(() => import('./views/pages/admin/organization/Organization'))
const Department = React.lazy(() => import('./views/pages/admin/department/Department'))
const Devices = React.lazy(() => import('./views/pages/admin/devices/Devices'))
const Facilities = React.lazy(() => import('./views/pages/admin/facilities/Facilities'))
const UserManagement = React.lazy(() => import('./views/pages/management/UserManagement'))
const DevicesSensors = React.lazy(() =>
  import('./views/pages/sensors/devices-sensors/DevicesSensors'),
)
const OrganizationSensors = React.lazy(() =>
  import('./views/pages/sensors/organization-sensors/OrganizationSensor'),
)
const FacilityStaff = React.lazy(() => import('./views/pages/Staff/Facility/FacilitySatff'))
const DepartmnentStaff = React.lazy(() => import('./views/pages/Staff/Department/DepartmentStaff'))
const DeviceStaff = React.lazy(() => import('./views/pages/Staff/Devices/DevicesStaff'))
const Users = React.lazy(() => import('./views/pages/Staff/Users/user'))
const SensorGraph = React.lazy(() => import('./views/dashboard/Components/GraphPage'))
const GateWay = React.lazy(() => import('./views/pages/admin/gateway/Gateway'))
const NotificationAlerts = React.lazy(() =>
  import('./views/pages/notification-setup/Notification-Setup'),
)
const AlramThreshold = React.lazy(() => import('./views/pages/alarm-threshold/Alram-threshold'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   element: Dashboard,
  // },
  // {
  //   path: '/organizations',
  //   name: 'Organization',
  //   element: Organization,
  // },
  // {
  //   path: '/facilities',
  //   name: 'Facilities',
  //   element: Facilities,
  // },
  // {
  //   path: '/department',
  //   name: 'Department',
  //   element: Department,
  // },
  {
    path: '/devices',
    name: 'Devices',
    element: Devices,
  },
  {
    path: '/error',
    name: 'Error',
    element: Page404,
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    element: UserManagement,
  },
  {
    path: '/organization-sensors',
    name: 'OrganizationSensors',
    element: OrganizationSensors,
  },
  {
    path: '/devices-sensors',
    name: 'DevicesSensors',
    element: DevicesSensors,
  },
  {
    path: '/devices-sensors/sensor-configration',
    name: 'SensorConfigration',
    element: AddSensorConfigration,
  },
  {
    path: '/Facilities-staff',
    name: 'Facility Staff',
    element: FacilityStaff,
  },
  {
    path: '/Department-staff',
    name: 'Department Staff',
    element: DepartmnentStaff,
  },
  {
    path: '/Devices-staff',
    name: 'Device Staff',
    element: DeviceStaff,
  },
  {
    path: '/users',
    name: 'Users',
    element: Users,
  },
  {
    path: 'sensor/graph',
    name: 'SensorGraph',
    element: SensorGraph,
  },
  {
    path: '/gateway',
    name: 'Gateway',
    element: GateWay,
  },
  {
    path: '/notification-alerts',
    name: 'NotificationAlerts',
    element: NotificationAlerts,
  },
  {
    path: '/alarm-thresholds',
    name: 'AlramThreshold',
    element: AlramThreshold,
  },
]

export default routes
