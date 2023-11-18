import React from 'react'
import { Navigate } from 'react-router-dom'
import { AppHeader } from 'src/components'
import { hasPermissionToActionAccess } from './permissionContant'

const CustomRoute = (props) => {
  const permissions = localStorage.getItem('permissions')
  // eslint-disable-next-line react/prop-types
  const status = hasPermissionToActionAccess(permissions, props.pageAccess, props.pageAction)

  if (status) {
    return <props.component />
  } else {
    return <Navigate to="/error" replace />
  }
}

export default CustomRoute
