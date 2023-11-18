import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

// sidebar nav config
import filteredNav from '../_nav'
import { useMutation } from 'react-query'
import { generalPermissions } from 'src/hooks/useAuth'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { darkMode, setDarkMode } = useGlobalInfo()
  const { mutate: permissions } = useMutation(generalPermissions)
  useEffect(() => {
    permissions('', {
      onSuccess: (data) => {
        localStorage.setItem('permissions', JSON.stringify(data.permissions))
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }, [])
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      className={`sidebar-light ${darkMode ? 'sidebar-dark' : ''}`}
    >
      <CSidebarBrand
        className={`d-none d-md-flex sidebar-light ${darkMode ? 'sidebar-dark' : ''}`}
        to="/"
      >
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <a
          href="#"
          style={{
            color: '#ffffff',
            margin: '0',
            padding: '15px 0',
            textDecoration: 'none',
            fontSize: '30px',
          }}
        >
          Safeline IOT
        </a>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={filteredNav} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
