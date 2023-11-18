import React from 'react'
import './BlueGraph.css'
import ReactApexChart from 'react-apexcharts'
import PropTypes from 'prop-types'
// import { series } from "variables/AreaData";
// import { options } from "variables/AreaData";
import Skeleton from 'react-loading-skeleton'
function BlueGraph({ sensorId, sensorsData, loading }) {
  const dummyOptions = {
    chart: {
      type: 'area',
      height: 350,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
  }

  const dummySeries = [
    {
      name: 'Series 1',
      data: [30, 40, 45, 50, 49, 60, 70], // Sample Y-axis data for Series 1
    },
    {
      name: 'Series 2',
      data: [20, 35, 40, 45, 50, 55, 60], // Sample Y-axis data for Series 2
    },
  ]
  return (
    <div className="blue-top">
      <div className="main-container">
        {loading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <>
            <div className="container">
              {/* <p>GH-Basement Meat Dishwasher 6221391</p> */}
              <p>{sensorId}</p>
            </div>
            <div id="chart">
              <ReactApexChart
                // options={options}
                // series={series(sensorsData)}
                options={dummyOptions}
                series={dummySeries}
                type="area"
                height={350}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default BlueGraph
BlueGraph.propTypes = {
  sensorId: PropTypes.string.isRequired, // or PropTypes.number, depending on the type
  sensorsData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}
