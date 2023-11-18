import React, { createContext, useContext, useReducer } from 'react'

const LoaderContext = createContext()

// eslint-disable-next-line react/prop-types
const LoaderProvider = ({ children }) => {
  const [isLoading, dispatch] = useReducer(loaderReducer, false)

  return <LoaderContext.Provider value={{ isLoading, dispatch }}>{children}</LoaderContext.Provider>
}

const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}

const loaderReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return true
    case 'HIDE_LOADER':
      return false
    default:
      return state
  }
}

export { LoaderProvider, useLoader }
