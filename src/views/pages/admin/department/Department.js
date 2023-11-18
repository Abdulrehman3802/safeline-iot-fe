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
import {
  useAllDepartmentsData,
  deleteDepartment,
  addDepartment,
  EditDepartment,
  getAllDepartmentsData,
} from 'src/hooks/useDepartments'
import AddDepartmentForm from 'src/views/forms/add-department-form/add-department-form'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'departmentname', label: 'Department Name' },
  { key: 'email', label: 'Contact Email' },
  { key: 'description', label: 'Description' },
  // { key: 'active', label: 'Active' },
  // { key: 'id', label: 'ID' },
  // Add more columns as needed
]
const Department = () => {
  const { dispatch } = useLoader()
  const { mutate: departmentAdd } = useMutation(addDepartment)
  const { mutate: departmentEdit } = useMutation(EditDepartment)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast, departmentsData, setDepartmentsData } = useGlobalInfo()
  const { mutate: getAllDep } = useMutation(getAllDepartmentsData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteDepartmentById = useMutation(deleteDepartment)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const [deldepId, setDeldepId] = useState(true)
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
  const { mutate: getDepartments } = useMutation(getDepartmentsData)
  function departmentsDataFetch(selectedId) {
    showLoader()
    getDepartments(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setDepartmentsData(data.data)
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
    deleteDepartmentById.mutate(departmentId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Department deleted Successfully',
        }))
        if (
          localStorage.getItem('facilityId') === null ||
          localStorage.getItem('facilityId') === undefined
        ) {
          getAllDepartments()
        } else {
          departmentsDataFetch(localStorage.getItem('facilityId'))
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
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        departmentAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Department Created Successfully',
            }))
            if (
              localStorage.getItem('facilityId') === null ||
              localStorage.getItem('facilityId') === undefined
            ) {
              getAllDepartments()
            } else {
              departmentsDataFetch(localStorage.getItem('facilityId'))
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
        departmentEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Department Edited Successfully',
              }))
              if (
                localStorage.getItem('facilityId') === null ||
                localStorage.getItem('facilityId') === undefined
              ) {
                getAllDepartments()
              } else {
                departmentsDataFetch(localStorage.getItem('facilityId'))
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
  useEffect(() => {
    if (
      localStorage.getItem('facilityId') === undefined ||
      localStorage.getItem('facilityId') === null
    ) {
      getAllDepartments()
    } else {
      return
    }
  }, [])
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Department' : 'Edit Department'}
        content={
          isAddMode ? (
            <AddDepartmentForm closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDepartmentForm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className={`table_container_light p-4 ${darkMode ? 'table_container_dark' : ''}`}>
        <CRow>
          <CCol>
            <h3 id={`${darkMode ? 'heading-dark' : ''}`} className="pb-2">
              Departments
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
              Add Department
            </CButton>
          </CCol>
        </CRow>
        {departmentsData ? (
          <GenericTable
            columns={columns}
            data={departmentsData}
            openEditModal={openEditModal}
            OnDeleteItem={deleteDepartments}
            deldepId={deldepId}
          />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Department
