import React, { useRef, useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
  CTable,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CTextarea,
} from '@coreui/react'
import {
  cilSortAscending,
  cilCheckAlt,
  cilTriangle,
  cilAirplay,
  cilNotes,
  cilCog,
  cilEnvelopeOpen,
  cilHeadphones,
  cilBuilding,
  cilList,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import NotificationAlarm from '../../forms/Notification-alarm/NotificationAlarm'
import SmsNumber from 'src/views/forms/smsnumber/SmsNumber'
import {
  getAllSelectedUsers,
  addNotificationUsers,
  getAllOrganizationCredits,
} from 'src/hooks/useNotifications'
const NotificationSetup = () => {
  const [combinedData, setCombinedData] = useState([])
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: selectedUsers } = useMutation(getAllSelectedUsers)
  const { mutate: OrganizationCredits } = useMutation(getAllOrganizationCredits)
  const { mutate: AddUsers } = useMutation(addNotificationUsers)

  function SelectedUsersDataFetch(id) {
    // showLoader()
    debugger
    selectedUsers(id, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        setData(data.data)
        setPhonedata(data.data)
      },
      onError: (error) => {
        debugger
        hideLoader()
      },
    })
  }
  const [credits, setCredits] = useState([])
  function CreditsOrganization(id) {
    debugger
    OrganizationCredits(id, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        setCredits(data.data)
      },
      onError: (error) => {
        debugger
        hideLoader()
      },
    })
  }
  useEffect(() => {
    SelectedUsersDataFetch(localStorage.getItem('OrganizationId'))
    CreditsOrganization(localStorage.getItem('OrganizationId'))
  }, [localStorage.getItem('OrganizationId')])
  const [isAddMode, setIsAddMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isSmsNumberModalOpen, setIsSmsNumberModalOpen] = useState(false)
  const [isAlarmNotificationModalOpen, setIsAlarmNotificationModalOpen] = useState(false)
  const [showState, setShowState] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [editData, setEditData] = useState()
  //const [data, setData] = useState([]);
  // const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  // const deleteGatewayById = useMutation(deleteGatewayById)
  const navigate = useNavigate()
  const openSmsNumberTable = () => {
    setIsAddMode(true)
    setEditData(null)
    setIsSmsNumberModalOpen(true)
    setShowState(false)
  }

  const openAlarmNotificationTable = () => {
    setIsAddMode(true)
    setEditData(null)
    setIsAlarmNotificationModalOpen(true)
    setShowState(false)
  }
  const closeSmsNumberModal = () => {
    setIsSmsNumberModalOpen(false)
    // Additional cleanup if needed
  }

  const closeAlarmNotificationModal = () => {
    setIsAlarmNotificationModalOpen(false)
    // Additional cleanup if needed
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [data, setdata] = useState([])
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    textemailaddress: '',
    smsnumber: '',
    texttospeechnumber: '',
  })
  useEffect(() => {
    if (data) {
      setFormData(() => ({
        email: data.email,
        textemailaddress: data.textemailaddress,
        smsnumber: data.smsnumber,
        texttospeechnumber: data.texttospeechnumber,
      }))
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    const inputEmail = e.target.value
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const isValid = emailRegex.test(inputEmail)

    setValidated(isValid)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    // setValidated(true)

    // Handle form submission here
    // if (form.checkValidity() === true) {
    // showLoader()
    saveHandler(formData)
    console.log(formData)
    closeModal()
    // }
  }
  const [Data, setData] = useState([])
  const [phoneData, setPhonedata] = useState([])
  function emailhandler(handler) {
    setData(handler)
  }
  function numberhandler(handler) {
    setPhonedata(handler)
  }
  function saveHandler(event) {
    const combinedArray = [...Data, ...phoneData]
    event.preventDefault()
    debugger
    // setData(handler)
    // setPhonedata(handler)
    // showLoader()
    // setTimeout(() => {
    //   if (isAddMode) {
    AddUsers(combinedArray, {
      onSuccess: () => {
        debugger
        hideLoader()
        // setShowToast(() => ({
        //   show: true,
        //   title: 'Success',
        //   content: 'Facility Created Successfully',
        // }))
        SelectedUsersDataFetch(localStorage.getItem('OrganizationId'))
      },
      onError: (error) => {
        hideLoader()
        SelectedUsersDataFetch(localStorage.getItem('OrganizationId'))
      },
    })
    //   } else {
    //     facilityEdit(
    //       { handler, editData },
    //       {
    //         onSuccess: () => {
    //           hideLoader()
    //           setShowToast(() => ({
    //             show: true,
    //             title: 'Success',
    //             content: 'Facility Edited Successfully',
    //           }))
    //           if (
    //             localStorage.getItem('OrganizationId') === null ||
    //             localStorage.getItem('OrganizationId') === undefined
    //           ) {
    //             getAllFacilities()
    //           } else {
    //             facilitiesDataFetch(localStorage.getItem('OrganizationId'))
    //           }
    //         },
    //         onError: (error) => {
    //           hideLoader()
    //           setShowToast(() => ({
    //             show: true,
    //             title: 'Error',
    //             content: error.response.data.error,
    //             color: '#FF0000',
    //           }))
    //         },
    //       },
    //     )
    //   }
    // }, 0)
  }

  const { darkMode, setDarkMode } = useGlobalInfo()

  return (
    <>
      {!showState && isSmsNumberModalOpen && (
        <GenericModal
          title={isAddMode ? 'Select User' : 'Edit SMS Number'}
          content={
            <SmsNumber
              closeModal={closeSmsNumberModal}
              saveHandler={numberhandler}
              data={editData}
            />
          }
          isOpen={isSmsNumberModalOpen}
          onClose={closeSmsNumberModal}
        />
      )}

      {!showState && isAlarmNotificationModalOpen && (
        <GenericModal
          title={isAddMode ? 'Select User' : 'Edit Alarm Notification'}
          content={
            <NotificationAlarm
              closeModal={closeAlarmNotificationModal}
              saveHandler={emailhandler}
              data={editData}
            />
          }
          isOpen={isAlarmNotificationModalOpen}
          onClose={closeAlarmNotificationModal}
        />
      )}
      {/* <GenericModal
        title={isAddMode ? 'Select User' : 'Edit NotificationAlram'}
        content={
          <NotificationAlarm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          //   isAddMode ? (
          //     <Gateway closeModal={closeModal} saveHandler={saveHandler} />
          //   ) : (
          //     <Gateway closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          //   )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      /> */}
      <div>
        <CIcon
          className="pb-2"
          id={`${darkMode ? 'heading-dark' : ''}`}
          icon={cilList}
          size="xxl"
        />
        <h3 className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
          Alarm Notification
        </h3>
      </div>
      <div>
        <CAccordion
          className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
          alwaysOpen
          activeItemKey={2}
        >
          <CAccordionItem
            className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
            itemKey={1}
          >
            <CAccordionHeader
              className={` ${
                darkMode ? 'table_container_dark' : 'table_container_light heading-dark'
              }`}
              style={{ fontSize: '50px', fontFamily: 'sans-serif' }}
            >
              Notification Setup
            </CAccordionHeader>
            <CAccordionBody
              className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
            >
              <left className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
                This is the first item's accordion body. It is hidden by default, until the collapse
                plugin adds the <strong>ensure</strong> appropriate classes that we use to style
                each element. These classes are very useful for the necessory implementation of the
                work and also the esuresance of task control the overall appearance, as well as the
                showing and hiding via CSS transitions. You can modify any of this with{' '}
                <a href="www.google.com">Alaram Setup</a> custom CSS or overriding our default
                variables. It's also worth noting that just about any HTML can go within the{' '}
                <a href="www.google.com">User setup</a>, though the transition does limit overflow.
              </left>
            </CAccordionBody>
          </CAccordionItem>
          <br />
          <CAccordionItem
            className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
            alwaysOpen
            itemKey={2}
          >
            <CAccordionHeader
              style={{ fontSize: '50px', fontFamily: 'sans-serif' }}
              className="pb-2"
              id={`${darkMode ? 'heading-dark' : ''}`}
            >
              SMS Credits
            </CAccordionHeader>
            <CAccordionBody
              className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
              alwaysOpen
            >
              <p className="pb-2" id={`${darkMode ? 'heading-dark' : ''}`}>
                * It is hidden by default, until the collapse plugin adds the appropriate classes
                that we use to to be aware of something is necessary
              </p>
              <br />
              <CTable
                className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
                alwaysOpen
                bordered
              >
                <CTableBody>
                  <CTableRow
                    className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
                    alwaysOpen
                  >
                    <CTableDataCell
                      style={{ width: '800px' }}
                      className={`pb-2 ${
                        darkMode ? 'table_container_dark' : 'table_container_light'
                      }`}
                      alwaysOpen
                      id={`${darkMode ? 'heading-dark' : 'heading-light'}`}
                    >
                      Organization Credit
                    </CTableDataCell>
                    <CTableDataCell
                      className={`pb-2 ${
                        darkMode ? 'table_container_dark' : 'table_container_light'
                      }`}
                      id={`${darkMode ? 'heading-dark' : ''}`}
                    >
                      {credits}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow
                    className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
                  >
                    <CTableDataCell
                      className={`pb-2 ${
                        darkMode ? 'table_container_dark' : 'table_container_light'
                      }`}
                      id={`${darkMode ? 'heading-dark' : ''}`}
                    >
                      Facility Credit
                    </CTableDataCell>
                    <CTableDataCell
                      className={`pb-2 ${
                        darkMode ? 'table_container_dark' : 'table_container_light'
                      }`}
                      id={`${darkMode ? 'heading-dark' : ''}`}
                    >
                      0
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CAccordionBody>
          </CAccordionItem>
          <br />

          <CAccordionItem
            className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
            alwaysOpen
            itemKey={3}
          >
            <CAccordionHeader
              className="pb-2"
              id={`${darkMode ? 'heading-dark' : ''}`}
              style={{ fontSize: '50px', fontFamily: 'sans-serif' }}
            >
              Alarms
            </CAccordionHeader>
            <CAccordionBody
              className={` ${darkMode ? 'table_container_dark' : 'table_container_light'}`}
              alwaysOpen
            >
              <CForm
                className="row mt-2 g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={saveHandler}
                style={{ marginBottom: '26px' }}
              >
                {/* First Name */}
                <CCol md={6}>
                  <CFormLabel
                    id={`${darkMode ? 'heading-dark' : ''}`}
                    htmlFor="validationFirstName"
                  >
                    Email Address
                  </CFormLabel>
                  <CInputGroup style={{ height: '90px' }}>
                    <CInputGroupText>
                      {/* <MdLocationPin /> */}
                      <CIcon icon={cilBuilding} alt="Name" />
                    </CInputGroupText>
                    <textarea
                      className={`form-control ${darkMode ? 'input-dark' : 'input-light'}`}
                      name="email"
                      value={Data.map((item) => item.email).join('\n')}
                      onChange={handleInputChange}
                      // onClick={() => {
                      //   setIsAddMode(true)
                      //   setEditData(null)
                      //   setIsModalOpen(true)
                      // }}
                      readOnly
                      onClick={openAlarmNotificationTable}
                      placeholder="Enter your email..."
                      required
                    />
                  </CInputGroup>
                </CCol>
                {/* Plain Text email Address*/}
                <CCol md={6}>
                  <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationLastName">
                    Plain text email Address
                  </CFormLabel>
                  <CInputGroup className="has-validation" style={{ height: '90px' }}>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeOpen} alt="text to email" />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
                      name="textemailaddress"
                      value={formData.textemailaddress}
                      onChange={handleInputChange}
                      feedbackInvalid="Plain Text Email Address is required"
                      id="validationCustom02"
                      required
                    />
                  </CInputGroup>
                </CCol>
                {/*  Email */}
                <CCol md={6}>
                  <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationEmail">
                    SMS Number
                  </CFormLabel>
                  <CInputGroup className="has-validation" style={{ height: '90px' }}>
                    <CInputGroupText>
                      <CIcon icon={cilHeadphones} alt="sms number" />
                    </CInputGroupText>
                    {/* <textarea
                      type="number"
                      className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
                      name="smsnumber"
                      value={formData.smsnumber}
                      onChange={handleEmailChange}
                      aria-describedby="inputGroupPrependFeedback"
                      feedbackInvalid=" Sms number is required"
                      id="validationEmail"
                      required
                    /> */}
                    <textarea
                      type="text"
                      className={`form-control ${darkMode ? 'input-dark' : 'input-light'}`}
                      name="smsnumber"
                      value={phoneData.map((item) => item.phonenumber).join('\n')}
                      // value={formData.smsnumber}
                      onChange={handleEmailChange}
                      onClick={openSmsNumberTable}
                      aria-describedby="inputGroupPrependFeedback"
                      feedbackInvalid=" Sms number is required"
                      id="validationEmail"
                      required
                    />
                  </CInputGroup>
                </CCol>
                {/*  Email */}
                <CCol md={6}>
                  <CFormLabel id={`${darkMode ? 'heading-dark' : ''}`} htmlFor="validationEmail">
                    Text to Speech Number
                  </CFormLabel>
                  <CInputGroup className="has-validation" style={{ height: '90px' }}>
                    <CInputGroupText>
                      <CIcon icon={cilHeadphones} alt="text " />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
                      name="texttospeechnumber"
                      value={formData.texttospeechnumber}
                      onChange={handleEmailChange}
                      aria-describedby="inputGroupPrependFeedback"
                      feedbackInvalid=" Text is required"
                      id="validationText"
                      required
                    />
                  </CInputGroup>
                </CCol>

                {/* Submit Button */}
                <CCol xs={12}>
                  <CButton
                    color="primary"
                    className="float-end"
                    id={`${darkMode ? 'button-dark' : ''}`}
                    type="submit"
                  >
                    {data ? 'Save ' : 'Add  Details'}
                  </CButton>
                </CCol>
              </CForm>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
    </>
  )
}

export default NotificationSetup
