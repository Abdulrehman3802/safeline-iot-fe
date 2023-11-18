/* eslint-disable react/prop-types */
import React from 'react'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'

const GenericToast = ({ visible, onClose, title, content, color = '#007aff' }) => {
  return (
    <CToaster placement="top-end">
      <CToast autohide={true} visible={visible} onClose={onClose}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill={color}></rect>
          </svg>
          <div className="fw-bold me-auto">{title}</div>
          <small>Just Now</small>
        </CToastHeader>
        <CToastBody>{content}</CToastBody>
      </CToast>
    </CToaster>
  )
}

export default GenericToast
