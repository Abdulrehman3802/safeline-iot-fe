/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import {
  useAllFacilitiesData,
  addFacility,
  EditFacility,
  deleteFacility,
  getAllFacilitiesData,
} from 'src/hooks/useFacilities'
import AddFacilityFrom from 'src/views/forms/add-facility-from/add-facility-from'
import GenericTable from 'src/views/table/GenericTable'
import { getFacilitiesData } from 'src/hooks/useAuth'
const columns = [
  { key: 'name', label: 'System Name' },
  { key: 'facility_type', label: 'System Type' },
  { key: 'email', label: 'Contact Email' },
  { key: 'site_manager', label: 'Site Manager' },
  { key: 'contactphonenumber', label: 'Contact Number' },
  { key: 'address', label: 'Address' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'postcode', label: 'Postcode' },
]
const Facilities = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: facilityAdd } = useMutation(addFacility)
  const { mutate: facilityEdit } = useMutation(EditFacility)
  const { facilityData, setFacilityData } = useGlobalInfo()
  const { mutate: facility } = useMutation(getAllFacilitiesData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const deleteFacilityById = useMutation(deleteFacility)
  const [delfacId, setDelfacId] = useState(true)

  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /**
   * Deletes a Fecility by its ID.
   * @param {number} facilityId - The ID of the Facility to be deleted.
   */
  const deleteFacilities = (facilityId) => {
    showLoader()
    deleteFacilityById.mutate(facilityId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Facility deleted Successfully',
        }))
        if (
          localStorage.getItem('OrganizationId') === null ||
          localStorage.getItem('OrganizationId') === undefined
        ) {
          getAllFacilities()
        } else {
          facilitiesDataFetch(localStorage.getItem('OrganizationId'))
        }
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
  const openEditModal = (data) => {
    setIsAddMode(false)
    setEditData(data)
    setIsModalOpen(true)
  }
  function getAllFacilities() {
    facility('', {
      onSuccess: (data) => {
        setFacilityData(data.data)
      },
      onError: (error) => {},
    })
  }
  const { mutate: getFacilities } = useMutation(getFacilitiesData)
  function facilitiesDataFetch(selectedId) {
    getFacilities(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setFacilityData(data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  useEffect(() => {
    if (
      localStorage.getItem('OrganizationId') === undefined ||
      localStorage.getItem('OrganizationId') === null
    ) {
      getAllFacilities()
    } else {
      return
    }
  }, [localStorage.getItem('OrganizationId')])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        facilityAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Facility Created Successfully',
            }))
            if (
              localStorage.getItem('OrganizationId') === null ||
              localStorage.getItem('OrganizationId') === undefined
            ) {
              getAllFacilities()
            } else {
              facilitiesDataFetch(localStorage.getItem('OrganizationId'))
            }
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
        facilityEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Facility Edited Successfully',
              }))
              if (
                localStorage.getItem('OrganizationId') === null ||
                localStorage.getItem('OrganizationId') === undefined
              ) {
                getAllFacilities()
              } else {
                facilitiesDataFetch(localStorage.getItem('OrganizationId'))
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
          },
        )
      }
    }, 0)
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Facility' : 'Edit Facility'}
        content={
          isAddMode ? (
            <AddFacilityFrom closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddFacilityFrom closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Facilities
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
              Add Facilities
            </CButton>
          </CCol>
        </CRow>
        {facilityData ? (
          <GenericTable
            columns={columns}
            OnDeleteItem={deleteFacilities}
            data={facilityData}
            openEditModal={openEditModal}
            delfacId={delfacId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Facilities
