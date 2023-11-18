import React from 'react'
import GaugeChart from 'react-gauge-chart'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
// import "./Gauge.css";
// import { calculatePercentage } from "variables/DonutData";
const Gauge = ({ minValue, maxValue, currentValue }) => {
  const safeCurrentValue = Math.min(Math.max(currentValue, minValue), maxValue)
  const percentage = (currentValue - minValue) / (maxValue - minValue)
  // const percen = calculatePercentage(minValue, maxValue, currentValue);npm update
  //   console.log("re", percen);
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={20}
          colors={['#2ECC71', '#ca0035']}
          arcWidth={0.3}
          percent={percentage}
          needleColor="#BFC9CA"
          style={{ height: '190px', width: '330px' }}
        />
      </div>
      <div className="text">
        <div
          className="Min-Max  d-flex"
          style={{ gap: '3rem' }}
          id={`${darkMode ? 'heading-dark' : ''}`}
        >
          <span>
            {minValue} <span>&#8451;</span>
          </span>
          <span>
            {currentValue} <span>&#8451;</span>
          </span>
          <span>
            {maxValue} <span>&#8451;</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Gauge
