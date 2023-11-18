import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import Battery from '../../../assets/images/battery.svg'
// import Gauge from "./Gauge";
// import { getSensorsData } from "services/sensor";
import { useNavigate } from 'react-router-dom'
// import { getTimeDifference } from "variables/DonutData";
// import Gauge from "./Gauge";
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useMutation } from 'react-query'
import Gauge from './Guage'
import { getAllSensorData } from 'src/hooks/useSensors'
const Donut = (props) => {
  const dummySensorData = [
    {
      sensorId: '1',
      sensorName: 'Heater 1',
      minValue: 0,
      maxValue: 100,
      value: 75,
      readingDateTime: new Date(),
      batteryValue: 3.8,
    },
    {
      sensorId: '2',
      sensorName: 'Temp 2',
      minValue: 0,
      maxValue: 100,
      value: 50,
      readingDateTime: new Date(),
      batteryValue: 3.2,
    },
    // Add more dummy data as needed
  ]
  const { mutate: SensorsData } = useMutation(getAllSensorData)
  const [widgetsData, setWidgetsData] = useState()
  const [sensorData, setSensorData] = useState([])
  const [loadingDonut, setLoadingDonut] = useState(false)
  function getAllSensorsData() {
    SensorsData('', {
      onSuccess: (data) => {
        setWidgetsData(data.data)
        setSensorData(data.data) // Set sensorData here
      },
      onError: (error) => {
        // Handle error if needed
      },
    })
  }

  useEffect(() => {
    setLoadingDonut(true)
    setTimeout(() => {
      getAllSensorsData()
      setLoadingDonut(false)
    }, 1000)
  }, [])

  const navi = useNavigate()
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <div className="card-top" style={{ width: '100vw' }}>
      <CRow className="my-5 gap-5">
        {loadingDonut ? (
          <>
            {[...Array(2)].map((_, index) => (
              <CCol
                key={index}
                sm="12"
                md="6"
                lg="3"
                className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
              >
                <CCard>
                  <CCardBody>
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
            <div>hyyy</div>
          </>
        ) : (
          sensorData?.map((item, index) => (
            <CCol
              key={index}
              sm="12"
              md="6"
              lg="3"
              className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
              style={{
                border: '1px solid rgba(163, 163, 163, 0.32)',
                borderRadius: '5px',
                padding: '0',
              }}
            >
              <CCard
                className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
                onClick={() => {
                  navi(`/sensor/graph`)
                }}
              >
                <CCardHeader id={`${darkMode ? 'heading-dark' : ''}`}>
                  {item?.sensorName ? item.sensorName : item.sensorId}
                </CCardHeader>
                <CCardBody>
                  <Gauge
                    id={`${darkMode ? 'heading-dark' : ''}`}
                    minValue={item?.minValue}
                    maxValue={item?.maxValue}
                    currentValue={isNaN(item?.value) ? 0 : item?.value}
                  />
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className="min">
                      <div style={{ display: 'flex', gap: '3px' }}>
                        <div className="min-heading" id={`${darkMode ? 'heading-dark' : ''}`}>
                          Min
                        </div>
                        <div id={`${darkMode ? 'heading-dark' : ''}`}>{item.minValue}</div>
                      </div>
                    </CCol>
                    <CCol className="max">
                      <div style={{ display: 'flex', gap: '3px', justifyContent: 'flex-end' }}>
                        <div className="max-heading" id={`${darkMode ? 'heading-dark' : ''}`}>
                          Max
                        </div>
                        <div id={`${darkMode ? 'heading-dark' : ''}`}>{item.maxValue}</div>
                      </div>
                    </CCol>
                  </CRow>
                  {/* <Divider /> */}
                  <CRow>
                    <CCol className="hours">
                      {/* {getTimeDifference(new Date(), item?.readingDateTime)} */}
                    </CCol>
                    <CCol className="battery">
                      <img
                        src={Battery}
                        alt="Battery"
                        style={{
                          width: '20px',
                          height: '20px',
                          marginLeft: '5px',
                        }}
                      />
                      <div
                        style={{
                          color: item.batteryValue < 3.5 ? 'red' : 'green',
                        }}
                        id={`${darkMode ? 'heading-dark' : ''}`}
                      >
                        {item.batteryValue}
                      </div>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          ))
        )}
      </CRow>
    </div>
  )
}

export default Donut
