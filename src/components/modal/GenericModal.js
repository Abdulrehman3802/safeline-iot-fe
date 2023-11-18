/* eslint-disable react/prop-types */
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
export const GenericModal = ({ title, content, onClose, isOpen }) => {
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton className={`modal-light ${darkMode ? 'modal-dark' : ''}`}>
        <CModalTitle id={`${darkMode ? 'heading-dark' : ''}`}>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className={`modal-light pt-0 ${darkMode ? 'modal-dark' : ''}`}>
        {content}
      </CModalBody>
      {/* <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            onClose()
          }}
        >
          Add Organization
        </CButton>
        <CButton
          color="secondary"
          onClick={() => {
            onClose()
          }}
        >
          Close
        </CButton>
      </CModalFooter> */}
    </CModal>
  )
}
