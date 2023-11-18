import React from 'react'
import './AlarmThresholdTable.css'
import {
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
  CFormInput,
  CFormCheck,
  CFormSelect,
} from '@coreui/react'
const AlramThresholdTable = () => {
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
      <div>
        <CTable bordered responsive style={{ marginTop: '10px', width: '120px' }}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" colSpan={3} style={{ fontFamily: 'sans-serif' }}>
                Sensor
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Unit
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                <span style={{ fontFamily: 'sans-serif', marginLeft: '8px' }}>Enable </span>
                <CFormCheck id="flexCheckChecked" style={{ marginLeft: '6px' }} defaultChecked />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Delay (Mins)
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Day Min
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Day Max
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Night Min
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Night Max
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                Warning %
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                <span style={{ marginLeft: '8px' }}>Healthy State </span>
                <CFormCheck id="flexCheckChecked" />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ fontFamily: 'sans-serif' }}>
                offline Alert
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row" colSpan={3} style={{ fontFamily: 'sans-serif' }}>
                Medication Cheecked 056754277383
              </CTableHeaderCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>C*</CTableDataCell>
              <CTableDataCell>
                <CFormCheck id="flexCheckChecked" defaultChecked />
              </CTableDataCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                <CFormInput
                  style={{ width: '150px' }}
                  type="input"
                  id="exampleColorInput"
                  defaultValue="10"
                />
              </CTableDataCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                <CFormInput
                  style={{ width: '150px' }}
                  type="input"
                  id="exampleColorInput"
                  defaultValue="10"
                />
              </CTableDataCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                <CFormInput
                  style={{ width: '150px' }}
                  type="input"
                  id="exampleColorInput"
                  defaultValue="10"
                />
              </CTableDataCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                <CFormInput
                  style={{ width: '150px' }}
                  type="input"
                  id="exampleColorInput"
                  defaultValue="10"
                />
              </CTableDataCell>
              <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                <CFormInput
                  style={{ width: '150px' }}
                  type="input"
                  id="exampleColorInput"
                  defaultValue="10"
                />
              </CTableDataCell>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CTableDataCell style={{ fontFamily: 'sans-serif' }}>
                  <CFormInput
                    style={{ width: '150px' }}
                    type="input"
                    id="exampleColorInput"
                    defaultValue="10"
                  />
                  ?
                </CTableDataCell>{' '}
              </div>
              <CTableDataCell>
                <CFormCheck id="flexCheckChecked" />
              </CTableDataCell>
              <CTableDataCell>
                <CFormSelect style={label}>
                  <option>Off</option>
                  <option value="1" style={option}>
                    ON
                  </option>
                  <option value="2" style={option}>
                    Neither
                  </option>
                  <option value="3" style={option}>
                    OK
                  </option>
                </CFormSelect>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default AlramThresholdTable
