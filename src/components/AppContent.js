import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import * as constant from '../constants/permissionContant'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useLoader } from 'src/global-context/LoaderContext'
import GlobalLoader from './global-loader/GlobalLoader'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import CustomRoute from 'src/constants/CustomRoute'
import Dashboard from 'src/views/dashboard/Dashboard'
import Organization from 'src/views/pages/admin/organization/Organization'
import Facilities from 'src/views/pages/admin/facilities/Facilities'
import Department from 'src/views/pages/admin/department/Department'

const AppContent = () => {
  const { isLoading } = useLoader()
  // const { loading, setLoading } = useGlobalInfo()
  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <CContainer
          id="table_container"
          className={`table_container_light ${darkMode ? 'table_container_dark' : ''}`}
          style={{ maxWidth: 'unset' }}
          lg
        >
          <Suspense fallback={<CSpinner color="primary" />}>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}
              <Route path="/" element={<Navigate to="dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <CustomRoute
                    component={Dashboard}
                    pageAccess={constant._device}
                    pageAction={[constant._view]}
                  />
                }
              />
              <Route
                path="/organizations"
                element={
                  <CustomRoute
                    component={Organization}
                    pageAccess={constant._organization}
                    pageAction={[constant._view]}
                  />
                }
              />
              <Route
                path="/department"
                element={
                  <CustomRoute
                    component={Department}
                    pageAccess={constant._department}
                    pageAction={[constant._view]}
                  />
                }
              />
              <Route
                path="/facilities"
                element={
                  <CustomRoute
                    component={Facilities}
                    pageAccess={constant._facility}
                    pageAction={[constant._view]}
                  />
                }
              />
            </Routes>
          </Suspense>
        </CContainer>
      )}
    </>
  )
}

export default React.memo(AppContent)
