import React from 'react'
import { ClipLoader } from 'react-spinners'
import { useState } from 'react'
import { SpinnerInfinity } from 'spinners-react'

const GlobalLoader = () => {
  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <SpinnerInfinity
        size={100}
        thickness={120}
        speed={100}
        color="#0000FF"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    </div>
  )
}

export default GlobalLoader
