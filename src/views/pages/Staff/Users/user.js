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
  useAllFacilitiesData,
  addFacility,
  EditFacility,
  deleteFacility,
  getAllFacilitiesData,
} from 'src/hooks/useFacilities'
import {
  getAllFacilitiesStaffData,
  addFacilityStaff,
  EditFacilityStaff,
} from 'src/hooks/useFacilitiesStaff'
import AddFacilityStaff from 'src/views/forms/add-facility-staff-form/add-facility-staff'
import GenericTable from 'src/views/table/GenericTable'
import { getAllUsersData, addUser, deleteUsers , EditUser } from 'src/hooks/useUsers'
import AddStaffForm from 'src/views/forms/add-staff-form/add-staff-form'
const columns = [
  { key: 'rolename', label: 'Role' },
  { key: 'firstname', label: 'Name' },
  // { key: 'userroles[0].roles.name', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: 'phonenumber', label: 'Contact Number' },
  { key: 'address', label: 'Address' },
]
const Users = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: UserAdd } = useMutation(addUser)
  const { mutate: facilityStaffAdd } = useMutation(addFacilityStaff)

  const { mutate: userEdit } = useMutation(EditUser)
  const { mutate: facilityEdit } = useMutation(EditFacility)
  const [usersData, setUsersData] = useState([])
  const { mutate: Users } = useMutation(getAllUsersData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const deleteUserById = useMutation(deleteUsers)
  const [deluserid, setDeluserId] = useState(true)

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
  const deleteFacilities = (user) => {
    debugger
    showLoader()
    deleteUserById.mutate(user.userid, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'User deleted Successfully',
        }))

        getAllUsers()

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

  function getAllUsers() {
    // debugger
    Users('', {
      onSuccess: (data) => {
        // // debugger
        setUsersData(data.data)
        hideLoader()
      },
      onError: (error) => {},
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        // debugger
        UserAdd(handler, {
          onSuccess: () => {
            // debugger
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'User Created Successfully',
            }))
            // if (
            //   localStorage.getItem('OrganizationId') === null ||
            //   localStorage.getItem('OrganizationId') === undefined
            // ) {
            getAllUsers()
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
        debugger
        userEdit(
          { handler, editData },
          
          {
            onSuccess: () => {
              debugger
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'User Edited Successfully',
              }))

              getAllUsers()
            },
            onError: (error) => {
              debugger
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content:error?.response?.data?.error,
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
        title={isAddMode ? 'Add Staff' : 'Edit Staff'}
        content={
          isAddMode ? (
            <AddStaffForm closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddStaffForm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
              Users
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
              Add Users
            </CButton>
          </CCol>
        </CRow>
        {usersData ? (
          <GenericTable
            columns={columns}
            OnDeleteItem={deleteFacilities}
            data={usersData}
            openEditModal={openEditModal}
            delUserId={deluserid}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Users
