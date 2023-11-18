/* eslint-disable react/prop-types */
import { CButton, CCol, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
export const DeleteModal = ({ title, content, onClose, isOpen, OnDeleteClick, id }) => {
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <CModal id="delete_modal" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton className={`modal-light ${darkMode ? 'modal-dark' : ''}`}>
        <CModalTitle id={`${darkMode ? 'heading-dark' : ''}`}>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className={`modal-light pt-0 ${darkMode ? 'modal-dark' : ''}`}>
        {content}
        <h4 className="ms-3 pt-2" id={`${darkMode ? 'heading-dark' : ''}`}>
          Are you sure you want to delete?{' '}
        </h4>

        <CCol xs={11} className={`modal-light ${darkMode ? 'modal-dark' : ''}`}>
          <CButton
            color="danger"
            className="float-end ms-2"
            onClick={() => {
              OnDeleteClick(id)
              onClose()
            }}
          >
            Delete
          </CButton>
          <CButton
            color="primary"
            className="float-end"
            onClick={() => {
              onClose()
            }}
          >
            Cancel
          </CButton>
        </CCol>
      </CModalBody>
    </CModal>
  )
}
