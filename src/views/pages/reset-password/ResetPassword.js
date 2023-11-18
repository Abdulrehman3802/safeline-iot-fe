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
  CFormLabel,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useMutation } from 'react-query'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { resetpassword } from 'src/hooks/useAuth'
import { useLoader } from 'src/global-context/LoaderContext'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'

const ResetPassword = () => {
  const { isLoading, dispatch } = useLoader()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: PasswordReset } = useMutation(resetpassword)
  const [payload, setPayload] = useState({
    email: '',
  })
  const navigate = useNavigate()
  function resetPassword() {
    debugger
    showLoader()
    PasswordReset(payload, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        addToast(exampleToast)
      },
      onError: (err) => {
        hideLoader()
        addToast(TryAgain)
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
          <rect width="100%" height="100%" fill="#2ECC71"></rect>
        </svg>
      </CToastHeader>
      <CToastBody>Check Your Email to Reset Password</CToastBody>
    </CToast>
  )
  const TryAgain = (
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
      </CToastHeader>
      <CToastBody>Try Again </CToastBody>
    </CToast>
  )

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />({' '}
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center ">
            <CCol md={8}>
              <CCardGroup style={{ padding: '80px' }}>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Reset Password</h1>
                      <p className="text-medium-emphasis">Change your account password</p>
                      <CInputGroup className="mb-3 ">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(event) => {
                            setPayload({ ...payload, email: event.target.value })
                          }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-6 text-align-center"
                            onClick={resetPassword}
                          >
                            Reset Password
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
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      )
    </>
  )
}

export default ResetPassword
