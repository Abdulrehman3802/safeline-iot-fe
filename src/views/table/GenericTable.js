/* eslint-disable react/prop-types */
// GenericTable.js
import React, { useEffect, useState } from 'react'
import {
  CDropdownMenu,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CDropdown, CDropdownItem, CDropdownToggle } from '@coreui/react'
import './GenericTable.css'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings, cilTrash, cilEye, cilSearch } from '@coreui/icons'
import { DeleteModal } from 'src/components/modal/DeleteModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const GenericTable = ({
  columns = [],
  data = [],
  openEditModal,
  OnDeleteItem,
  viewConfig,
  deldevId,
  deldepId,
  delfacId,
  delorgId,
  deldevsSensorId,
  delfacstaffId,
  delUserId,
  deldevstaffId,
  deldepstaffId,
  delgatewayId,
}) => {
  const renderCell = (item, key) => {
    const keys = key.split('.')
    return keys.reduce((acc, currentKey) => acc?.[currentKey], item)
  }
  const [DeleteId, setDeleteId] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <div className="table-responsive-x">
      <DeleteModal
        title="Delete"
        content={''}
        OnDeleteClick={OnDeleteItem}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={DeleteId}
      />
      <CTable hover className="custom-table">
        <CTableHead>
          <CTableRow>
            {columns.map((column) => (
              <CTableHeaderCell
                className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
                key={column.key}
              >
                {column.label}
              </CTableHeaderCell>
            ))}
            <CTableHeaderCell
              className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
              key="actions"
            >
              Actions
            </CTableHeaderCell>
            {viewConfig ? (
              <CTableHeaderCell
                key="viewConfig"
                className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
              >
                View Config
              </CTableHeaderCell>
            ) : null}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <CTableRow key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
                  >
                    {column.key.includes('.') ? renderCell(item, column.key) : item[column.key]}
                  </td>
                ))}
                <td
                  key="actions"
                  className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
                >
                  <CDropdown>
                    <CDropdownToggle color="secondary">
                      <CIcon icon={cilSettings} />
                    </CDropdownToggle>
                    <CDropdownMenu className={` pt-0 ${darkMode ? 'dropdown-dark' : ''}`}>
                      <CDropdownItem onClick={() => openEditModal(item)}>
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          debugger
                          if (delorgId) {
                            setDeleteId(item.customerid)
                          } else if (delfacId) {
                            setDeleteId(item.facilityid)
                          } else if (deldepId) {
                            setDeleteId(item.departmentid)
                          } else if (deldevId) {
                            setDeleteId(item.deviceid)
                          } else if (deldevsSensorId) {
                            setDeleteId(item.sensorid)
                          } else if (delfacstaffId || deldepstaffId || deldevstaffId || delUserId) {
                            debugger
                            setDeleteId(item)
                          } else if (delgatewayId) {
                            debugger
                            setDeleteId(item)
                          }
                          openDeleteModal()
                        }}
                      >
                        <CIcon icon={cilTrash} className="me-2" />
                        Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </td>
                {viewConfig ? (
                  <td
                    key="viewConfig"
                    className={`table-data-light ${darkMode ? 'table-data-dark' : ''}`}
                  >
                    <CIcon
                      style={{
                        cursor: 'pointer',
                        width: '25px',
                        height: '22px',
                      }}
                      color="secondary"
                      icon={cilSearch}
                      onClick={() => viewConfig(item)}
                    />
                  </td>
                ) : null}
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default GenericTable
