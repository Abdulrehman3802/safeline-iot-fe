/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const CounterComp = ({ name, count }) => {
  const { darkMode, setDarkMode } = useGlobalInfo()
  return (
    <>
      <div className="counter_cards mb-3">
        <h3 id={`${darkMode ? 'heading-dark' : ''}`}>{name}</h3>
        <div className="count" id={`${darkMode ? 'count-dark' : 'count-light'}`}>
          <p id={`${darkMode ? 'heading-dark' : ''}`}>{count}</p>
        </div>
      </div>
    </>
  )
}

export default CounterComp
