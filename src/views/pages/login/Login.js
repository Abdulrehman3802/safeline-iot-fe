import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useMutation } from 'react-query'
import { generalPermissions, loginPost } from 'src/hooks/useAuth'
import { useLoader } from 'src/global-context/LoaderContext'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'

const Login = () => {
  const { mutate: login } = useMutation(loginPost)
  const { mutate: permissions } = useMutation(generalPermissions)
  const navigate = useNavigate()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  })
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const { isLoading, dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginHandler()
    }
  }
  function loginHandler() {
    showLoader()
    login(payload, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('email', data.email)
        permissions(data.accessToken, {
          onSuccess: (data) => {
            localStorage.setItem('permissions', JSON.stringify(data.permissions))
            navigate('/dashboard')
            hideLoader()
          },
          onError: (error) => {
            console.log(error)
          },
        })
        // localStorage.setItem('roles', data?.roles[0])
      },
      onError: (error) => {
        hideLoader()
        addToast(exampleToast)
      },
    })
  }
  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#FF0000"></rect>
        </svg>
        <div className="fw-bold me-auto">Error</div>
        <small>Just now</small>
      </CToastHeader>
      <CToastBody>Wrong Email or Password</CToastBody>
    </CToast>
  )
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Username"
                            autoComplete="username"
                            onChange={(event) => {
                              // eslint-disable-next-line no-restricted-globals
                              setPayload({ ...payload, email: event.target.value })
                            }}
                            onKeyPress={handleKeyPress}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(event) => {
                              // eslint-disable-next-line no-restricted-globals
                              setPayload({ ...payload, password: event.target.value })
                            }}
                            onKeyPress={handleKeyPress}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton onClick={loginHandler} color="primary" className="px-4">
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton
                              color="link"
                              className="px-0"
                              onClick={() => {
                                navigate('/reset-password')
                              }}
                            >
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white  py-5"
                    style={{ width: '44%', backgroundColor: '#0F172A' }}
                  >
                    <CCardBody className="text-center flex align-items-center">
                      <div className="px-5">
                        <h1 style={{ color: '#ffff' }}>Welcome to Safelines IOT</h1>
                        {/* <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>
                            Register Now!
                          </CButton>
                        </Link> */}
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      )}
    </>
  )
}

export default Login
