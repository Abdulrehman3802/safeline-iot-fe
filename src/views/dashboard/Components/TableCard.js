import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReportTable from './ReportTable/ReportTable'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
function TableCard() {
  const [startDate, setStartDate] = useState(new Date())
  const [day, setDay] = useState(1)
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <CCard
      className={`table_container_light ${darkMode ? 'table_container_dark' : ''}`}
      style={{
        marginTop: '2rem',
        borderRadius: '5px',
        padding: '25px',
        border: '1px solid rgba(163, 163, 163, 0.32)',
      }}
    >
      <h3 id={`${darkMode ? 'heading-dark' : ''}`}>HACCP Report</h3>
      <form className="">
        <div className="d-flex gap-5">
          <div className="Custom-Date items-center d-flex gap-2 w-50">
            <label htmlFor="datePicker" id={`${darkMode ? 'heading-dark' : ''}`}>
              Select a Date
            </label>
            <DatePicker
              className={` form-select ${darkMode ? 'select-dark' : ''}`}
              selected={startDate}
              name="startDate"
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="d-flex w-50 items-center">
            <label
              htmlFor="datePicker"
              id={`${darkMode ? 'heading-dark' : ''}`}
              style={{ width: '130px' }}
            >
              Select No of Days
            </label>
            <select
              className={`form-select ${darkMode ? 'select-dark' : ''}`}
              value={day}
              style={{ width: '190px' }}
              onChange={(e) => {
                setDay(Number(e.target.value))
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
      </form>

      <div className="overflow-x-scroll w-100">
        <ReportTable date={startDate} day={day} />
      </div>
    </CCard>
  )
}

export default TableCard
