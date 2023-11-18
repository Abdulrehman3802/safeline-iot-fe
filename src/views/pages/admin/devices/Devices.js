import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import {
  getAllDevicesData,
  useAllDevicesData,
  addDevice,
  EditDevice,
  deleteDevice,
  getAllDevicesById,
} from 'src/hooks/useDevices'
import AddDeviceForm from 'src/views/forms/add-device-form/add-device-form'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'devicename', label: 'Device Name' },
  { key: 'manufacturer', label: 'Manufacturer' },
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
  const { mutate: getDevices } = useMutation(getAllDevicesData)
  // const { data, isSuccess, isError, refetch: refetchDevices } = useAllDevicesData()
  const { mutate: deviceAdd } = useMutation(addDevice)
  const { mutate: deviceEdit } = useMutation(EditDevice)
  const deleteDeviceById = useMutation(deleteDevice)
  const [deldevId, setDeldevId] = useState(true)

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
    deleteDeviceById.mutate(deviceId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Device deleted Successfully',
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
          content: error.response.data,
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
  function getAllDevices() {
    getDevices('', {
      onSuccess: (data) => {
        setDevicesData(data.data)
      },
      onError: (error) => {},
    })
  }
  useEffect(() => {
    if (
      localStorage.getItem('departmentId') === undefined ||
      localStorage.getItem('departmentId') === null ||
      localStorage.getItem('departmentId') === 'Select department'
    ) {
      getAllDevices()
    } else {
      // devicesDataFetch(localStorage.getItem('departmentId'))
      return
    }
  }, [])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        deviceAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Device Created Successfully',
            }))
            if (
              localStorage.getItem('departmentId') === null ||
              localStorage.getItem('departmentId') === undefined
            ) {
              getAllDevices()
            } else {
              devicesDataFetch(localStorage.getItem('departmentId'))
            }
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
        deviceEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Edited Successfully',
              }))
              if (
                localStorage.getItem('departmentId') === null ||
                localStorage.getItem('departmentId') === undefined
              ) {
                getAllDevices()
              } else {
                devicesDataFetch(localStorage.getItem('departmentId'))
              }
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
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Device' : 'Edit Device'}
        content={
          isAddMode ? (
            <AddDeviceForm closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDeviceForm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Devices
            </h3>
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
              Add Device
            </CButton>
          </CCol>
        </CRow>
        {devicesData ? (
          <GenericTable
            columns={columns}
            data={devicesData}
            OnDeleteItem={deleteDevices}
            openEditModal={openEditModal}
            deldevId={deldevId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Devices
