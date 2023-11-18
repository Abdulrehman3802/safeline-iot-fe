import React, { useEffect, useState } from 'react'
// import { useLocation } from "react-router-dom";
import { CButton, CRow } from '@coreui/react' // Import CoreUI components
// import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
// import "./index.css";
// import { FaCalendar } from "react-icons/fa";
// import { getSensorDataById } from "services/sensor";
import BlueGraph from './BlueGraph/BlueGraph'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useNavigate } from 'react-router-dom'
export default function GraphPage({}) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const navi = useNavigate()
  const CustomInput = ({ value, onClick }) => (
    <div className="custom-input">
      <input type="text" value={value} onClick={onClick} placeholder="Select a date" />
      {/* <FaCalendar onClick={onClick} className="calendar-icon" /> */}
    </div>
  )
  const onFormSubmit = (e) => {
    e.preventDefault()
  }
  //   const location = useLocation();
  //   const navi = useNavigate();
  const [sensorData, setSensorsData] = useState()
  const [loading, setLoading] = useState(true)
  const [isSensorId, setIsSensorId] = useState()
  useEffect(() => {
    let sensorId = location?.search?.split('&')[0].split('=')[1]
    let sensorName = location?.search?.split('&')[1]?.split('=')[1]
    sensorName = decodeURIComponent(sensorName)
    if (sensorName == 'undefined') {
      sensorName = sensorId
    }
    setIsSensorId(sensorName)
    setLoading(true)
    const utcstartDate = startDate.toISOString()
    const utcEndDate = endDate.toISOString()
    // Replace the following line with your CoreUI equivalent for fetching data
    // getSensorDataById(sensorId, sensorName, utcstartDate, utcEndDate)
    //   .then((res) => {
    //     setLoading(false);
    //     setSensorsData(res?.data);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.error(err);
    //   });

    // Dummy data for demonstration
    const dummyData = {
      // Your dummy data here
    }
    setLoading(false)
    setSensorsData(dummyData)
  }, [startDate, endDate])

  const handleButtonClick = () => {
    navi('/dashboard')
    // const storedSystemId = localStorage.getItem('systemId')
    // const storedThemeColor = localStorage.getItem('themeColor')
    // const params = new URLSearchParams()
    // params.set('systemId', storedSystemId)
    // params.set('themeColor', storedThemeColor)
    // navi(`/?${params.toString()}`)
  }
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <div>
      <div flexDirection="column" p={{ base: '10px', md: '20px' }}>
        <CButton w="20" onClick={handleButtonClick}>
          Back
        </CButton>
        <form onSubmit={onFormSubmit}>
          <CRow
            className="d-inline-flex p-2 docs-highlight"
            style={{ display: 'flex ', gap: '10px' }}
          >
            <div className="DatePicker">
              <div>
                <div>
                  <p style={{ fontWeight: 'bold' }} id={`${darkMode ? 'heading-dark' : ''}`}>
                    Select a Start Date
                  </p>
                </div>
                <DatePicker
                  className={` form-select ${darkMode ? 'select-dark' : ''}`}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select start date"
                  customInput={<CustomInput />}
                />
              </div>
              <div>
                <div>
                  <p style={{ fontWeight: 'bold' }} id={`${darkMode ? 'heading-dark' : ''}`}>
                    Select an End Date
                  </p>
                </div>
                <DatePicker
                  className={` form-select ${darkMode ? 'select-dark' : ''}`}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  name="endDate"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select end date"
                  customInput={<CustomInput />}
                />
              </div>
            </div>
          </CRow>
        </form>
        <div>
          <BlueGraph sensorId={isSensorId} sensorsData={sensorData} loading={loading} />
        </div>
      </div>
    </div>
  )
}
