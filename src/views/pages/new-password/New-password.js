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
import { SetNewPassword } from 'src/hooks/useAuth'
import { useLoader } from 'src/global-context/LoaderContext'
import { useParams } from 'react-router-dom'
const NewPassword = () => {
  const { userId } = useParams()
  const { isLoading, dispatch } = useLoader()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const { mutate: newPasswordset } = useMutation(SetNewPassword)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const [payload, setPayload] = useState({
    password: '',
    token: userId,
  })
  const newPassword = () => {
    console.log(payload)
    showLoader()
    newPasswordset(payload, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        addToast(exampleToast)
      },
      onError: (error) => {
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
      <CToastBody>Your New Password is Set , Now you can login with your New Password</CToastBody>
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
      <CToaster ref={toaster} push={toast} placement="top-end" />

      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center ">
            <CCol md={8}>
              <CCardGroup style={{ padding: '80px' }}>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>New Password</h1>
                      <p className="text-medium-emphasis">Change your account password</p>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder=" Confirm Password"
                          autoComplete="new-password"
                          onChange={(event) => {
                            setPayload({ ...payload, password: event.target.value })
                          }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            onClick={newPassword}
                            color="primary"
                            className="px-4 text-align-center"
                          >
                            Confirm Password
                          </CButton>
                        </CCol>
                        {/* <CCol xs={6} className="text-right">
                            <CButton
                              color="link"
                              className="px-0"
                            >
                              Forgot password?
                            </CButton>
                          </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard
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
                        </Link> 
                      </div>
                    </CCardBody>
                  </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
export default NewPassword
