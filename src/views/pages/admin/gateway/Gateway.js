/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import GatewayForm from '../../../forms/gateway/GatewayForm'
import GenericTable from 'src/views/table/GenericTable'
import AddDeviceSensor from 'src/views/forms/add-device-sensors/add-device-sensor'
import { getAllGatewayData, addGateWay, deleteGateway, EditGateWay } from 'src/hooks/usegateway'
const columns = [
  { key: 'gateway_id', label: 'Gateway ID' },
  { key: 'gateway_note', label: 'Gateway Notes' },
  // { key: 'action', label: 'Action' },
]
const Gateway = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: gatewayAdd } = useMutation(addGateWay)
  const { mutate: gatewayEdit } = useMutation(EditGateWay)
  const { mutate: GatewayData } = useMutation(getAllGatewayData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gatewayData, setgatewaydata] = useState([])
  const [editData, setEditData] = useState()
  //const [data, setData] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const deleteGatewayById = useMutation(deleteGateway)
  const [delgatewayId, setdelgatewayId] = useState(true)
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openEditModal = (data) => {
    setIsAddMode(false)
    setEditData(data)
    setIsModalOpen(true)
  }
  function getAllGateways(id) {
    GatewayData(id, {
      onSuccess: (data) => {
        hideLoader()
        setgatewaydata(data.data)
      },
      onError: (error) => {},
    })
  }
  useEffect(() => {
    getAllGateways(localStorage.getItem('OrganizationId'))
  }, [localStorage.getItem('OrganizationId')])

  /**
     * Deletes a Fecility by its ID.
     * @param {number} facilityId - The ID of the Facility to be deleted.
    //  */
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        gatewayAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'GateWay Created Successfully',
            }))
            getAllGateways(localStorage.getItem('OrganizationId'))
          },
          onError: (error) => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Error',
              content: error?.response?.data?.error,
              color: '#FF0000',
            }))
          },
        })
      } else {
        gatewayEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'GateWay Edited Successfully',
              }))
              getAllGateways(localStorage.getItem('OrganizationId'))
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
          },
        )
      }
    }, 0)
  }
  const deleteFacilities = (facilityId) => {
    // debugger
    showLoader()
    deleteGatewayById.mutate(facilityId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'GateWay deleted Successfully',
        }))

        getAllGateways(localStorage.getItem('OrganizationId'))

        hideLoader()
      },
      onError: (error) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          localStorage.removeItem('token')
          localStorage.removeItem('OrganizationId')
          localStorage.removeItem('facilityId')
          localStorage.removeItem('departmentId')
          navigate('/login')
        }
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
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Facility Staff' : 'Edit Facility Staff'}
        content={
          isAddMode ? (
            <GatewayForm closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <GatewayForm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              GateWay
            </h3>
          </CCol>
          <CCol className="d-flex gap-5 justify-content-end">
            <div>
              <CButton
                color="primary"
                className="float-end mr-3"
                onClick={() => {
                  setIsAddMode(true)
                  setEditData(null)
                  setIsModalOpen(true)
                }}
              >
                Add GateWay
              </CButton>
            </div>
            <div className="d-flex gap-2">
              <CButton color="primary" className="float-end mr-3">
                Day
              </CButton>
              <CButton color="primary" className="float-end mr-3">
                Week
              </CButton>

              <CButton color="primary" className="float-end mr-3">
                Month
              </CButton>
              <CButton color="primary" className="float-end mr-3">
                Hour
              </CButton>
            </div>
          </CCol>
        </CRow>
        {gatewayData ? (
          <GenericTable
            columns={columns}
            data={gatewayData}
            OnDeleteItem={deleteFacilities}
            openEditModal={openEditModal}
            delgatewayId={delgatewayId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}
export default Gateway
