import React, { useEffect, useState } from 'react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import {
  _department,
  _facility,
  _organization,
  _device,
  _view,
  _create,
  hasPermissionToActionAccess,
} from 'src/constants/permissionContant'
import Charts from '../charts/Charts'
import { useMutation } from 'react-query'
import { cilSortAscending, cilCheckAlt, cilTriangle, cilAirplay } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Donut from './Components/Donut'
import TableCard from './Components/TableCard'
import GraphPage from './Components/GraphPage'
import CounterComp from './Counter_Comp'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CCardTitle,
  CCardText,
  CRow,
  CCardHeader,
  CCardFooter,
  CHeader,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import { FindDashboard } from 'src/hooks/useSensors'
import { useLoader } from 'src/global-context/LoaderContext'
const Dashboard = () => {
  const { dispatch } = useLoader()
  const { departmentId } = useGlobalInfo()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: dashboardFind } = useMutation(FindDashboard)
  const userPermissions = JSON.parse(localStorage.getItem('permissions'))
  const organizationPermission = hasPermissionToActionAccess(userPermissions, _organization, _view)
  const facilityPermission = hasPermissionToActionAccess(userPermissions, _facility, _view)
  const departmentPermission = hasPermissionToActionAccess(userPermissions, _department, _view)
  const devicepermission = hasPermissionToActionAccess(userPermissions, _device, _view)
  const [organizationCount, setOrganiztionCount] = useState(0)
  const [facilityCount, setFacilityCount] = useState(0)
  const [departmentCount, setDepartmentCount] = useState(0)
  const [deviceCount, setDeviceCount] = useState(0)
  const [unAssignedSensorCount, setUnAssignedSensorCount] = useState(0)
  const [assignedSensorCount, setAssignedSensorCount] = useState(0)
  const orgID = localStorage.getItem('OrganizationId')
  const facID = localStorage.getItem('facilityId')
  const depID = localStorage.getItem('departmentId')

  const { darkMode, setDarkMode } = useGlobalInfo()

  function DashboardData(handler) {
    // debugger
    setTimeout(() => {
      dashboardFind(handler, {
        onSuccess: (res) => {
          setOrganiztionCount(res.data.counts?.OrganizationCount)
          setFacilityCount(res.data.counts?.FacilityCount)
          setDepartmentCount(res.data.counts?.DepartmentCount)
          setDeviceCount(res.data.counts?.DeviceCount)
          setUnAssignedSensorCount(res.data.counts?.UnAssignedSensorCount)
          setAssignedSensorCount(res.data.counts?.AssignedSensorCount)
          hideLoader()
        },
        onError: (error) => {
          setFacilityCount(0)
          setDepartmentCount(0)
          setDeviceCount(0)
          hideLoader()
        },
      })
    }, 0)
  }
  useEffect(() => {
    if (orgID !== null || orgID !== undefined || orgID !== 'Select organization') {
      DashboardData(orgID)
    } else {
      DashboardData()
    }
  }, [orgID])

  return (
    <>
      {/* <Charts/> */}
      {/* {organizationPermission || facilityPermission || departmentPermission ? (
        !localStorage.getItem('departmentId') ||
        localStorage.getItem('departmentId') === 'Select Department' ? (
          <h4
            style={{
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
            }}
          >
            Kindly Select Organization, Facility & Department First
          </h4>
        ) : (
          <iframe
            title="Child App"
            src={`http://iot-dashboard-fe.s3-website-us-east-1.amazonaws.com/?systemId=${localStorage.getItem(
              'departmentId',
            )}&themeColor=light`}
            width="100%"
            style={{ height: '100vh' }}
          />
        )
      ) : (
        <iframe
          title="Child App"
          src={`http://iot-dashboard-fe.s3-website-us-east-1.amazonaws.com/?systemId=${localStorage.getItem(
            'departmentId',
          )}&themeColor=light`}
          width="100%"
          style={{ height: '100vh' }}
        />
      )} */}
      <div
        style={{
          color: 'black',
          marginTop: '20px',
        }}
      >
        <CRow
          className="my-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          <CCol>
            {organizationPermission && (!orgID || orgID === 'Select Organization') && (
              <CounterComp name="Organizations" count={organizationCount} />
            )}
            {facilityPermission && <CounterComp name="Facilities" count={facilityCount} />}
            <CounterComp name="Devices " count={deviceCount} />
          </CCol>
          <CCol>
            {departmentPermission && <CounterComp name="Departments " count={departmentCount} />}
            {organizationPermission && (!orgID || orgID === 'Select Organization') && (
              <CounterComp name="Assigned Sensors " count={assignedSensorCount} />
            )}
            {organizationPermission && (!orgID || orgID === 'Select Organization') && (
              <CounterComp name="UnAssigned Sensors " count={unAssignedSensorCount} />
            )}
          </CCol>
        </CRow>
        <h1 id={`${darkMode ? 'heading-dark' : ''}`}>Conditions summary</h1>
        <h6 id={`${darkMode ? 'heading-dark' : ''}`}>Keep track of your Sensor status</h6>
      </div>
      <div style={{ marginTop: '30px', marginBottom: '30px', color: 'black' }}>
        <h4 id={`${darkMode ? 'heading-dark' : ''}`}>Overview</h4>
      </div>
      <div>
        <CRow
          className="gap-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'column',
            flexWrap: 'wrap',
            marginTop: '40px',
          }}
        >
          <CCol
            sm={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              height: '25vh',

              padding: '30px',
              borderRadius: '20px',
              backgroundColor: '#9DDFE4',
            }}
          >
            <CCardText style={{ color: '#349FC4' }}>
              <h1 style={{ fontSize: '60px', color: '#349FC4' }}>01</h1>
              <p>
                <CIcon icon={cilSortAscending} alt="Name" size="xl" />
                Offline
              </p>
            </CCardText>
          </CCol>
          <CCol
            sm={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              height: '25vh',

              padding: '30px',
              borderRadius: '20px',
              backgroundColor: '#fff374',
            }}
          >
            <CCardText style={{ color: '#da582c' }}>
              <h1 style={{ fontSize: '60px', color: '#da582c' }}>01</h1>
              <p>
                <CIcon icon={cilAirplay} alt="Name" size="xl" style={{ marginLeft: '10px' }} />
                Alarm
              </p>
            </CCardText>
          </CCol>
          <CCol
            sm={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              height: '25vh',

              padding: '30px',
              borderRadius: '20px',
              backgroundColor: 'rgb(255 179 179)',
            }}
          >
            <CCardText style={{ color: '#FF0505' }}>
              <h1 style={{ fontSize: '60px', color: '#FF0505' }}>00</h1>
              <p>
                <CIcon icon={cilTriangle} alt="Name" size="xl" style={{ marginLeft: '10px' }} />
                Warning
              </p>
            </CCardText>
          </CCol>
          <CCol
            sm={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              height: '25vh',

              padding: '30px',
              borderRadius: '20px',
              backgroundColor: '#6EF768',
            }}
          >
            <CCardText style={{ color: '#32712F' }}>
              <h1 style={{ fontSize: '60px', color: '#32712F' }}>02</h1>
              <p>
                <CIcon icon={cilCheckAlt} alt="Name" size="xl" style={{ marginLeft: '10px' }} />
                Okay
              </p>
            </CCardText>
          </CCol>
        </CRow>
        <CRow>
          <Donut />
        </CRow>
        <TableCard />
        {/* <GraphPage /> */}
      </div>
    </>
  )
}

export default Dashboard
