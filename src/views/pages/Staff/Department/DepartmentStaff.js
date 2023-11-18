/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { getDepartmentsData } from 'src/hooks/useAuth'
import { getAllDepartmentsData } from 'src/hooks/useDepartments'
import {
  getAllDepartmentStaffData,
  addDepartmentStaff,
  EditDepartmentStaff,
  getAllDepartmentUserData,
  deleteDepartmentStaff,
  getAllDepartmentStaffbyOrgID,
  getAllDepartmentUserbyOrgID,
} from 'src/hooks/useDepartmentstaff'
import AddDepartmentStaff from 'src/views/forms/add-department-staff-form/add-department-staff'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'users.firstname', label: 'Name' },
  { key: 'departments.departmentname', label: 'Department' },
  { key: 'users.email', label: 'Contact Email' },
  { key: 'users.address', label: 'Address' },
  { key: 'users.phonenumber', label: 'PhoneNumber' },
]
const Department = () => {
  const { dispatch } = useLoader()
  const { mutate: departmentStaffAdd } = useMutation(addDepartmentStaff)
  const { mutate: departmentStaffEdit } = useMutation(EditDepartmentStaff)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast, departmentsData, setDepartmentsData } = useGlobalInfo()
  const { mutate: getAllDep } = useMutation(getAllDepartmentsData)
  const [DepartmentStaffData, setdepartmentStaffData] = useState([])
  const { mutate: departmentStaff } = useMutation(getAllDepartmentStaffData)
  const { mutate: departmentUser } = useMutation(getAllDepartmentUserData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteDepartmentStaffById = useMutation(deleteDepartmentStaff)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const [deldepstaffId, setDeldepstaffId] = useState(true)
  const [selectedRole, setSelectedRole] = useState('Select Role')
  const navigate = useNavigate()
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  function getAllDepartments() {
    getAllDep('', {
      onSuccess: (data) => {
        setDepartmentsData(data.data)
      },
      onError: (error) => {},
    })
  }
  function getAllDepartmentStaff() {
    departmentStaff('', {
      onSuccess: (data) => {
        setdepartmentStaffData(data.data)
        hideLoader()
      },
      onError: (error) => {},
    })
  }
  function getAllDepartmentUser() {
    departmentUser('', {
      onSuccess: (data) => {
        setdepartmentStaffData(data.data)
        hideLoader()
      },
      onError: (error) => {},
    })
  }
  const { mutate: departmentSatffbyOrgID } = useMutation(getAllDepartmentStaffbyOrgID)
  function departmentStaffDataFetch(selectedId) {
    departmentSatffbyOrgID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setdepartmentStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const { mutate: departmentUserbyOrgID } = useMutation(getAllDepartmentUserbyOrgID)
  function departmentUserDataFetch(selectedId) {
    departmentUserbyOrgID(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setdepartmentStaffData(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  /**
   * Deletes a department by its ID.
   * @param {number} departmentId - The ID of the department to be deleted.
   */
  const deleteDepartments = (departmentId) => {
    showLoader()
    deleteDepartmentStaffById.mutate(departmentId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Department Staff deleted Successfully',
        }))
        if (
          localStorage.getItem('facilityId') === null ||
          localStorage.getItem('facilityId') === undefined
        ) {
          getAllDepartmentStaff()
        } else {
          departmentStaffDataFetch(localStorage.getItem('facilityId'))
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
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        departmentStaffAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Department Staff Created Successfully',
            }))

            getAllDepartmentStaff()
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
        departmentStaffEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Department Staff Edited Successfully',
              }))

              getAllDepartmentStaff()
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
                content: error.response.data,
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
        localStorage.getItem('facilityId') === undefined ||
        localStorage.getItem('facilityId') === null
      ) {
        getAllDepartmentStaff()
      } else {
        departmentStaffDataFetch(localStorage.getItem('facilityId'))
      }
    } else if (selectedValue === 'Users') {
      if (
        localStorage.getItem('facilityId') === undefined ||
        localStorage.getItem('facilityId') === null
      ) {
        getAllDepartmentUser()
      } else {
        departmentUserDataFetch(localStorage.getItem('facilityId'))
      }
    }
  }
  useEffect(() => {
    if (
      localStorage.getItem('facilityId') === undefined ||
      localStorage.getItem('facilityId') === null
    ) {
      getAllDepartmentStaff()
    } else {
      departmentStaffDataFetch(localStorage.getItem('facilityId'))
    }
  }, [localStorage.getItem('facilityId')])
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Department Satff' : 'Edit Department Staff'}
        content={
          isAddMode ? (
            <AddDepartmentStaff closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDepartmentStaff closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 id={`${darkMode ? 'heading-dark' : ''}`} className="pb-2">
              Departments Staff
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
              Add Department Staff
            </CButton>
          </CCol>
        </CRow>
        {DepartmentStaffData ? (
          <GenericTable
            columns={columns}
            data={DepartmentStaffData}
            openEditModal={openEditModal}
            OnDeleteItem={deleteDepartments}
            deldepstaffId={deldepstaffId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Department
