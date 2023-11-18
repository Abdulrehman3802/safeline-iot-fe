import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import './dashboard.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CCardTitle,
  CCardText,
  CRow,
  CCardHeader,
  CCardFooter,
  CHeader,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CContainer,
} from '@coreui/react'
import { cilSortAscending, cilCheckAlt, cilTriangle, cilAirplay } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
// import './cards.css'

const Cards = () => {
  return (
    <>
      <div class="card">
        <h1>Conditions summary</h1>
        <h6>Keep track of your Sensor status</h6>
      </div>
      <div class="card card1">
        <h4>Overview</h4>
      </div>
      <div class="row">
        {/*Card 1*/}
        <div class="cardu col1">
          <h1 class="heading">22</h1>
          <h5>
            <CIcon icon={cilCheckAlt} alt="Name" size="xl" style={{ marginLeft: '10px' }} />
            Offline
          </h5>
        </div>
        {/*Card 2*/}
        <div class="cardu col2">
          <h1 class="heading2">05</h1>
          <h5>
            <CIcon icon={cilAirplay} alt="Name" size="xl" style={{ marginTop: '10px' }} />
            Alarm
          </h5>
        </div>
        {/* Card 3*/}
        <div class="cardu col3">
          <h1 class="heading3">23</h1>
          <h5>
            <CIcon icon={cilTriangle} alt="Name" size="xl" style={{ marginTop: '10px' }} />
            Warning
          </h5>
        </div>
        {/*Card 4*/}
        <div class="cardu col4">
          <h1 class="heading4">06</h1>
          <h5>
            <CIcon icon={cilCheckAlt} alt="Name" size="xl" style={{ marginLeft: '10px' }} />
            Okay
          </h5>
        </div>
      </div>
    </>
  )
}

export default Cards