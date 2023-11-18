/* eslint-disable prettier/prettier */
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
  getAllFacilitiesStaffData,
  addFacilityStaff,
  EditFacilityStaff,
  deleteFacilityStaff,
  getAllFacilitiesUserData,
  getAllFacilitiesUserbyOrgID,
  getAllFacilitiesStaffbyOrgID,
} from 'src/hooks/useFacilitiesStaff'
import AddFacilityStaff from 'src/views/forms/add-facility-staff-form/add-facility-staff'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'users.firstname', label: 'Name' },
  { key: 'users.email', label: 'Email' },
  { key: 'users.phonenumber', label: 'Contact Number' },
  { key: 'users.address', label: 'Address' },
  { key: 'facilities.name', label: 'Facility' },
]
const Facilities = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: facilityStaffAdd } = useMutation(addFacilityStaff)

  const { mutate: facilityStaffEdit } = useMutation(EditFacilityStaff)
  const [facilityStaffData, setFacilityStaffData] = useState([])
  const { mutate: facilityStaff } = useMutation(getAllFacilitiesStaffData)
  const { mutate: facilityUser } = useMutation(getAllFacilitiesUserData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const deleteFacilityStaffById = useMutation(deleteFacilityStaff)
  const [delfacstaffId, setDelfacsatffId] = useState(true)
  const [selectedRole, setSelectedRole] = useState('Select Role')
  const { darkMode, setDarkMode } = useGlobalInfo()
  const { mutate: facilityStaffbyOrgID } = useMutation(getAllFacilitiesStaffbyOrgID)
  const { mutate: facilityUserbyOrgID } = useMutation(getAllFacilitiesUserbyOrgID)

  function facilitiesStaffDataFetch(selectedId) {
    facilityStaffbyOrgID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setFacilityStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  function facilitiesUserDataFetch(selectedId) {
    debugger
    facilityUserbyOrgID(selectedId, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        setFacilityStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const handleRoleChange = (e) => {
    const selectedValue = e.target.value

    setSelectedRole(selectedValue)

    if (selectedValue === 'Admins') {
      if (
        localStorage.getItem('OrganizationId') === undefined ||
        localStorage.getItem('OrganizationId') === null ||
        localStorage.getItem('OrganizationId') === 'Select Organization'
      ) {
        getAllFacilitiesStaff()
      } else {
        facilitiesStaffDataFetch(localStorage.getItem('OrganizationId'))
      }
    } else if (selectedValue === 'Users') {
      if (
        localStorage.getItem('OrganizationId') === undefined ||
        localStorage.getItem('OrganizationId') === null ||
        localStorage.getItem('OrganizationId') === 'Select Organization'
      ) {
        getAllFacilitiesUser()
      } else {
        facilitiesUserDataFetch(localStorage.getItem('OrganizationId'))
      }
    }
  }
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
    deleteFacilityStaffById.mutate(facilityId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Facility Staff deleted Successfully',
        }))

        getAllFacilitiesStaff()

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
  function getAllFacilitiesStaff() {
    facilityStaff('', {
      onSuccess: (data) => {
        hideLoader()
        setFacilityStaffData(data.data)
      },
      onError: (error) => {},
    })
  }
  function getAllFacilitiesUser() {
    hideLoader()
    facilityUser('', {
      onSuccess: (data) => {
        setFacilityStaffData(data.data)
      },
      onError: (error) => {},
    })
  }

  useEffect(() => {
    debugger
    if (
      localStorage.getItem('OrganizationId') === undefined ||
      localStorage.getItem('OrganizationId') === null ||
      localStorage.getItem('OrganizationId') === 'Select Organization'
    ) {
      getAllFacilitiesStaff()
    } else {
      debugger
      facilitiesStaffDataFetch(localStorage.getItem('OrganizationId'))
    }
  }, [localStorage.getItem('OrganizationId')])

  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        // // debugger
        facilityStaffAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Facility Staff Created Successfully',
            }))
            // if (
            //   localStorage.getItem('OrganizationId') === null ||
            //   localStorage.getItem('OrganizationId') === undefined
            // ) {
            getAllFacilitiesStaff()
            // } else {
            //   facilitiesDataFetch(localStorage.getItem('OrganizationId'))
            // }
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
        // debugger
        facilityStaffEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Facility Staff Edited Successfully',
              }))

              getAllFacilitiesStaff()
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

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Facility Staff' : 'Edit Facility Staff'}
        content={
          isAddMode ? (
            <AddFacilityStaff closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddFacilityStaff closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Facility Staff
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
              Add Facility Staff
            </CButton>
          </CCol>
        </CRow>
        {facilityStaffData ? (
          <GenericTable
            columns={columns}
            OnDeleteItem={deleteFacilities}
            data={facilityStaffData}
            openEditModal={openEditModal}
            delfacstaffId={delfacstaffId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Facilities
