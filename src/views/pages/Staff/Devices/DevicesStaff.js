import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { getAllDevicesData, deleteDevice, getAllDevicesById } from 'src/hooks/useDevices'
import AddDeviceStaff from 'src/views/forms/add-device-staff-form/add-device-staff'
import { getAllDeviceStaffData, getAllDeviceUserData } from 'src/hooks/useDeviceStaff'
import {
  addDeviceStaff,
  EditDeviceStaff,
  deleteDeviceStaff,
  getAllDeviceStaffbyOrgID,
  getAllDeviceUserbyOrgID,
} from 'src/hooks/useDeviceStaff'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'users.firstname', label: 'Name' },
  { key: 'users.email', label: 'Email' },
  { key: 'users.phonenumber', label: 'Contact Number' },
  { key: 'users.address', label: 'Address' },
  { key: 'devices.devicename', label: 'Device' },
]
const Devices = () => {
  const { dispatch } = useLoader()

  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast, devicesData, setDevicesData } = useGlobalInfo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const navigate = useNavigate()
  const [DeviceStaffData, setdeviceStaffData] = useState([])
  const { mutate: deviceStaff } = useMutation(getAllDeviceStaffData)
  const { mutate: deviceUser } = useMutation(getAllDeviceUserData)
  const { mutate: deviceStaffAdd } = useMutation(addDeviceStaff)
  const { mutate: deviceStaffEdit } = useMutation(EditDeviceStaff)
  const deleteDeviceStaffById = useMutation(deleteDeviceStaff)
  const [deldevstaffId, setDeldevstaffId] = useState(true)
  const [selectedRole, setSelectedRole] = useState('Select Role')

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const { mutate: getDevicesByID } = useMutation(getAllDevicesById)
  function devicesDataFetch(selectedId) {
    showLoader()
    getDevicesByID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setDevicesData(data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  /**
   * Deletes a device by its ID.
   * @param {number} deviceId - The ID of the device to be deleted.
   */
  const deleteDevices = (deviceId) => {
    showLoader()
    deleteDeviceStaffById.mutate(deviceId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Device Staff deleted Successfully',
        }))
        // refetchDevices()
        if (
          localStorage.getItem('departmentId') === null ||
          localStorage.getItem('departmentId') === undefined
        ) {
          getAllDevices()
        } else {
          devicesDataFetch(localStorage.getItem('departmentId'))
        }
        hideLoader()
      },
      onError: (error) => {
        setShowToast(() => ({
          show: true,
          title: 'Error',
          content: error.response.data.error,
        }))
        hideLoader()
      },
    })
    hideLoader()
  }
  const openEditModal = (data) => {
    setIsAddMode(false)
    setEditData(data)
    setIsModalOpen(true)
  }

  function getAllDeviceStaff() {
    deviceStaff('', {
      onSuccess: (data) => {
        setdeviceStaffData(data.data)
        hideLoader()
      },
      onError: (error) => {},
    })
  }
  function getAllDeviceUser() {
    deviceUser('', {
      onSuccess: (data) => {
        setdeviceStaffData(data.data)
        hideLoader()
      },
      onError: (error) => {},
    })
  }
  const { mutate: deviceSatffbyOrgID } = useMutation(getAllDeviceStaffbyOrgID)
  function deviceStaffDataFetch(selectedId) {
    deviceSatffbyOrgID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setdeviceStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const { mutate: deviceUserbyOrgID } = useMutation(getAllDeviceUserbyOrgID)
  function deviceUserDataFetch(selectedId) {
    deviceUserbyOrgID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setdeviceStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  useEffect(() => {
    if (
      localStorage.getItem('departmentId') === undefined ||
      localStorage.getItem('departmentId') === null
    ) {
      getAllDeviceStaff()
    } else {
      deviceStaffDataFetch(localStorage.getItem('departmentId'))
    }
  }, [localStorage.getItem('departmentId')])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        // debugger
        deviceStaffAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Device Staff Created Successfully',
            }))

            getAllDeviceStaff()
          },
          onError: (error) => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Error',
              content: error.response.data.error,
              color: '#FF0000',
            }))
          },
        })
      } else {
        deviceStaffEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Staff Edited Successfully',
              }))

              getAllDeviceStaff()
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
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content: error.response.data.error,
                color: '#FF0000',
              }))
            },
          },
        )
      }
    }, 0)
  }
  const handleRoleChange = (e) => {
    const selectedValue = e.target.value

    setSelectedRole(selectedValue)

    if (selectedValue === 'Admins') {
      if (
        localStorage.getItem('departmentId') === undefined ||
        localStorage.getItem('departmentId') === null
      ) {
        getAllDeviceStaff()
      } else {
        deviceStaffDataFetch(localStorage.getItem('departmentId'))
      }
    } else if (selectedValue === 'Users') {
      if (
        localStorage.getItem('departmentId') === undefined ||
        localStorage.getItem('departmentId') === null
      ) {
        getAllDeviceUser()
      } else {
        deviceUserDataFetch(localStorage.getItem('departmentId'))
      }
    }
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Device Staff' : 'Edit Device Staff'}
        content={
          isAddMode ? (
            <AddDeviceStaff closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDeviceStaff closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Devices Staff
            </h3>
          </CCol>
          <CCol md={3} className="float-end">
            <select
              size="sm"
              className={` form-select ${darkMode ? 'select-dark' : ''}`}
              aria-label="Department"
              defaultValue="Admins"
              onChange={handleRoleChange}
              // value={deviceId}
            >
              <option>Select Role</option>
              <option>Admins</option>
              <option>Users</option>
            </select>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              className="float-end"
              onClick={() => {
                setIsAddMode(true)
                setEditData(null)
                setIsModalOpen(true)
              }}
            >
              Add Device Staff
            </CButton>
          </CCol>
        </CRow>
        {devicesData ? (
          <GenericTable
            columns={columns}
            data={DeviceStaffData}
            OnDeleteItem={deleteDevices}
            openEditModal={openEditModal}
            deldevstaffId={deldevstaffId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Devices
