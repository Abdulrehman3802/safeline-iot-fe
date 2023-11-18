/* eslint-disable prettier/prettier */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDevicesData } from 'src/hooks/useDevices'
import {
  addDeviceSensor,
  EditDeviceSensor,
  getSensorConfigurationData,
} from 'src/hooks/useDevicesSensors'
import AddDeviceSensor from 'src/views/forms/add-device-sensors/add-device-sensor'
import AddSensorConfigration from 'src/views/forms/add-sensor-configration/add-sensor-configration'
import { getAllDevicesSensorsData, deleteDeviceSensor } from 'src/hooks/useDevicesSensors'
import GenericTable from 'src/views/table/GenericTable'
import { TRUE } from 'sass'

const columns = [
  { key: 'aws_sensorid', label: 'Sensor ID' },
  { key: 'sensorname', label: 'Sensor Name' },
  { key: 'devices.departments.departmentname', label: 'Department Name' },
  { key: 'devices.devicename', label: 'Device Name' },
]
const DevicesSensors = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: deviceData, data, isSuccess, isError } = useMutation(getAllDevicesSensorsData)
  const { mutate: DeviceSensorAdd } = useMutation(addDeviceSensor)
  const { mutate: DeviceSensorEdit } = useMutation(EditDeviceSensor)
  const { mutate: GetSensorConfiguration } = useMutation(getSensorConfigurationData)
  const { data: allDevices } = useAllDevicesData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deviceId, setDeviceId] = useState()
  const [isModalSensorOpen, setisModalSensorOpen] = useState(false)
  const [AddsensorConfiguration, setIsAddsensorConfiguration] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const deleteDeviceSensorById = useMutation(deleteDeviceSensor)
  const [sensorForm, setSensorForm] = useState(false)
  const [configData, setConfigData] = useState('')
  const [sensorData, setSensorData] = useState('')
  // const [dataTable, setDataTable] = useState(true)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openAddSensorConfigurationModal = () => {
    setIsAddsensorConfiguration(true)
  }
  const openEditModal = (data) => {
    setIsAddMode(false)
    setEditData(data)
    setIsModalOpen(true)
  }
  function handleDeviceChange(e) {
    setDeviceId(e.target.value)
    deviceData(e.target.value, {
      onSuccess: (data) => {},
      onError: () => {},
    })
  }
  function getAllDataOfDeviceSensors(myDeviceId) {
    deviceData(myDeviceId, {
      onSuccess: (data) => {},
      onError: () => {},
    })
  }

  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        DeviceSensorAdd(handler, {
          onSuccess: (res) => {
            localStorage.setItem('sensorId', res.id)
            localStorage.setItem('deviceid', res.deviceId)
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Device Sensor Created Successfully',
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
      } else {
        DeviceSensorEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Edited Successfully',
              }))
            },
            onError: (error) => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content: error.response.data,
                color: '#FF0000',
              }))
            },
          },
        )
      }
    }, 0)
  }

  /**
   * Deletes a Device sensor by its ID.
   * @param {number} deviceSensorId - The ID of the Device sensor to be deleted.
   */
  const deleteDeviceSensors = (deviceSensorId) => {
    showLoader()
    deleteDeviceSensorById.mutate(deviceSensorId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Device Sensor deleted Successfully',
        }))
        hideLoader()
        getAllDataOfDeviceSensors(deviceId)
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

  const viewConfig = (item) => {
    debugger
     setSensorData(item)
    // configurationView(id)
    GetSensorConfiguration(item.sensorid, {
      onSuccess: (res) => {
        debugger
        hideLoader()
        setConfigData(res.data)
        setSensorForm(true)
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
  function handleDeviceChange(e) {
    setDeviceId(e.target.value)
    getAllDataOfDeviceSensors(e.target.value)
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      {sensorForm ? (
        <AddSensorConfigration
          closeModal={closeModal}
          saveHandler={saveHandler}
          data={configData}
          sensorData={sensorData}
        />
      ) : (
        <>
          <GenericModal
            title={isAddMode ? 'Add Device sensor' : 'Edit Device sensor'}
            content={
              isAddMode ? (
                <AddDeviceSensor
                  closeModal={closeModal}
                  saveHandler={saveHandler}
                  openAddSensorConfigurationModal={openAddSensorConfigurationModal}
                  AddsensorConfiguration={AddsensorConfiguration}
                  setisModalSensorOpen={setisModalSensorOpen}
                />
              ) : (
                <AddDeviceSensor
                  closeModal={closeModal}
                  saveHandler={saveHandler}
                  data={editData}
                />
              )
            }
            isOpen={isModalOpen}
            onClose={closeModal}
          />
          <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
            <CRow>
              <CCol md={6}>
                <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
                  Device Sensors
                </h3>
              </CCol>
              <CCol md={3} className="float-end">
                <select
                  size="sm"
                  className={` form-select ${darkMode ? 'select-dark' : ''}`}
                  aria-label="Department"
                  onChange={handleDeviceChange}
                  value={deviceId}
                >
                  <option>Select Device</option>
                  {allDevices?.data?.map((item) => {
                    return (
                      <option key={item.deviceid} value={item.deviceid}>
                        {item.devicename}
                      </option>
                    )
                  })}
                </select>
              </CCol>
              <CCol md={3}>
                <CButton
                  color="primary"
                  className="float-end"
                  onClick={() => {
                    setIsAddMode(true)
                    setEditData(null)
                    setIsModalOpen(true)
                  }}
                >
                  Add Devices Sensor
                </CButton>
              </CCol>
            </CRow>
            <GenericTable
              columns={columns}
              data={data?.data}
              OnDeleteItem={deleteDeviceSensors}
              openEditModal={openEditModal}
              viewConfig={viewConfig}
            />
          </CCard>
        </>
      )}
    </>
  )
}

export default DevicesSensors
