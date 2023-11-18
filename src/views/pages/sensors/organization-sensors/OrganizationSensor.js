import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import {
  useAllOrgDevicesData,
  EditOrganizationSensor,
  addOrganizationSensor,
  deleteOrganizationSensor,
} from 'src/hooks/useOrganizationDevices'
import AddOrganizationSensor from 'src/views/forms/add-organization-sensor/add-organization-sensor'
import GenericTable from 'src/views/table/GenericTable'
import { useMutation } from 'react-query'
const columns = [
  { key: 'aws_sensorid', label: 'AWS Sensor ID' },
  { key: 'customers.customername', label: 'Assigned Organization' },
]

const OrganizationSensor = () => {
  const navigate = useNavigate()
  const { data, isSuccess, isError, refetch: refetchOrganizationSensors } = useAllOrgDevicesData()
  const { mutate: OrganizationSensorAdd } = useMutation(addOrganizationSensor)
  const { mutate: OrganizationSensorEdit } = useMutation(EditOrganizationSensor)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast } = useGlobalInfo()
  const deleteOrganizationSensorById = useMutation(deleteOrganizationSensor)
  const [deldevsSensorId, setDeldevSensorId] = useState(true)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /**
   * Deletes an organization sensor by its ID.
   * @param {number} organizationSensorId - The ID of the organization sensor to be deleted.
   */
  const deleteOrganizationSensors = (organizationSensorId) => {
    showLoader()
    deleteOrganizationSensorById.mutate(organizationSensorId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Organization Sensor deleted Successfully',
        }))
        hideLoader()
        refetchOrganizationSensors()
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
  useEffect(() => {
    showLoader()
    if (isSuccess && !isError) {
      hideLoader()
    } else {
      hideLoader()
    }
  }, [isSuccess, isError, showLoader, hideLoader])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        OrganizationSensorAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Organization Created Successfully',
            }))
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
              content: error?.response?.data,
              color: '#FF0000',
            }))
          },
        })
      } else {
        OrganizationSensorEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Edited Successfully',
              }))
              // organizationData('', {
              //   onSuccess: (data) => {
              //     addData(data)
              //   },
              //   onError: (error) => {
              //     setShowToast(() => ({
              //       show: true,
              //       title: 'Error',
              //       content: error.response.data,
              //     }))
              //   },
              // })
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
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Organization sensor' : 'Edit Organization sensor'}
        content={
          isAddMode ? (
            <AddOrganizationSensor closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddOrganizationSensor
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
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Organization Sensors
            </h3>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              id={`${darkMode ? 'button-dark' : ''}`}
              className="float-end"
              onClick={() => {
                setIsAddMode(true)
                setEditData(null)
                setIsModalOpen(true)
              }}
            >
              Add Organization Sensor
            </CButton>
          </CCol>
        </CRow>
        {data ? (
          <GenericTable
            columns={columns}
            data={data}
            OnDeleteItem={deleteOrganizationSensors}
            openEditModal={openEditModal}
            deldevsSensorId={deldevsSensorId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default OrganizationSensor
