import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const DefaultLayout = () => {
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <AppSidebar />
      <div
        className={`wrapper d-flex flex-column min-vh-100 light-mode ${
          darkMode ? 'dark-mode' : ''
        }`}
      >
        <AppHeader />
        <div className={`body flex-grow-1 px-3 ${darkMode ? 'dark-mode' : ''}`}>
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
