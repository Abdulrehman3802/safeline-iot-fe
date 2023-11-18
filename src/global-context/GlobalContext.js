import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [departmentId, setDepartmentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [facilityData, setFacilityData] = useState([])
  const [departmentsData, setDepartmentsData] = useState([])
  const [devicesData, setDevicesData] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    title: '',
    content: '',
    color: '',
  })
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider
      value={{
        departmentId,
        setDepartmentId,
        showToast,
        setShowToast,
        loading,
        setLoading,
        facilityData,
        setFacilityData,
        departmentsData,
        setDepartmentsData,
        devicesData,
        setDevicesData,
        darkMode,
        setDarkMode,
        // facilityStaffData,
        // setFacilityStaffData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalInfo = () => {
  return useContext(GlobalContext)
}
