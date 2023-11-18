import React, { useRef, useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
  CTable,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButtonGroup,
  CCol,
  CForm,
  CFormInput,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import {
  cilSortAscending,
  cilBell,
  cilEnvelopeOpen,
  cilHeadphones,
  cilBuilding,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useNavigate } from 'react-router-dom'
// import NotificationAlarm from '../forms/Notification-alarm/NotificationAlarm'
// import AlramThresholdTable from '../thresholdtable/AlramThresholdTable'
import AlramThresholdTable from 'src/views/thresholdtable/AlramThresholdTable'
const AlramThreshold = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const navigate = useNavigate()
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const { darkMode, setDarkMode } = useGlobalInfo()
  const vars = {
    '--cui-accordion-active-color': '#ffffff',
    '--cui-accordion-active-bg': '#0F172A',
  }
  const label = {
    'background-color': '#4F46E5',
    color: '#ffffff',
    'border-radius': '4px',
    padding: '5px',
    width: '120px',
  }
  const option = {
    'background-color': 'white',
    color: 'black',
  }

  return (
    <>
      <h3>
        <CIcon icon={cilBell} size="xxl" />
        Alarm Threshold
      </h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <CAccordion class="accordion" style={{ width: '45%' }}>
          {/* Accordion Item 1 */}
          <CAccordionItem itemKey={1}>
            <CAccordionHeader style={vars}>
              <h5 style={{ fontFamily: 'sans-serif', fontSize: '20px' }}>Alram Period</h5>
            </CAccordionHeader>
            <CAccordionBody>
              <h1>Hello I am the time picker</h1>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        <CAccordion class="accordion" style={{ width: '45%' }}>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader style={vars}>
              <h5 style={{ fontFamily: 'sans-serif', fontSize: '20px' }}>System Office Delay</h5>
            </CAccordionHeader>
            <CAccordionBody style={{ fontFamily: 'sans-serif' }}>
              The default office delay value, which can be inherited by the sensor on this system
              <CFormSelect style={label}>
                <option>2:00 hour</option>
                <option value="1" style={option}>
                  5:00 hour
                </option>
                <option value="2" style={option}>
                  6:00 hour
                </option>
                <option value="3" style={option}>
                  7:00 hour
                </option>
              </CFormSelect>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <CAccordion alwaysOpen activeItemKey={2} style={{ marginTop: '10px' }}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader style={vars}>
            <h5 style={{ fontFamily: 'sans-serif' }}>Condition based Alram</h5>
          </CAccordionHeader>
          <CAccordionBody>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <CButtonGroup role="group" aria-label="Default button group">
                <CButton color="primary" variant="outline">
                  Copy
                </CButton>
                <CButton color="primary" variant="outline">
                  Excel
                </CButton>
                <CButton color="primary" variant="outline">
                  Pdf
                </CButton>
                <CButton color="primary" variant="outline">
                  Print
                </CButton>
              </CButtonGroup>
              <CForm className="row float-end">
                <CCol>
                  <CFormLabel>
                    Search:
                    <CFormInput type="text" id="inputtext" />
                  </CFormLabel>
                </CCol>
              </CForm>
            </div>
            <AlramThresholdTable />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      <CAccordion alwaysOpen activeItemKey={2} style={{ marginTop: '10px' }}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader style={vars}>
            <h5 style={{ fontFamily: 'sans-serif' }}>Status Based Alram</h5>
          </CAccordionHeader>
          <CAccordionBody>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between,',
                flexWrap: 'wrap',
              }}
            >
              <CButtonGroup role="group" aria-label="Default button group">
                <CButton color="primary" variant="outline">
                  Copy
                </CButton>
                <CButton color="primary" variant="outline">
                  Excel
                </CButton>
                <CButton color="primary" variant="outline">
                  Pdf
                </CButton>
                <CButton color="primary" variant="outline">
                  Print
                </CButton>
              </CButtonGroup>
              <CForm className="row float-end">
                <CCol>
                  <CFormLabel>
                    Search:
                    <CFormInput type="text" id="inputtext" />
                  </CFormLabel>
                </CCol>
              </CForm>
            </div>
            <AlramThresholdTable />
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  )
}

export default AlramThreshold
