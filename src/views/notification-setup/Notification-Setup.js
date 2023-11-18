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
      CFormSelect ,
      CInputGroup,
      CInputGroupText,
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
    } from '@coreui/icons'
    import CIcon from '@coreui/icons-react'
    import { cilLockLocked, cilUser } from '@coreui/icons'
    import GlobalLoader from 'src/components/global-loader/GlobalLoader'
  import { GenericModal } from 'src/components/modal/GenericModal'
  import { useLoader } from 'src/global-context/LoaderContext'
  import { useMutation } from 'react-query'
  import { useGlobalInfo } from 'src/global-context/GlobalContext'
  import { useNavigate } from 'react-router-dom'
  import NotificationAlarm from '../forms/Notification-alarm/NotificationAlarm'
  import SmsNumber from '../forms/smsnumber/SmsNumber'

const NotificationSetup=()=> {

  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast } = useGlobalInfo()
  const navigate = useNavigate()
  const [isAddMode, setIsAddMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSmsNumberModalOpen, setIsSmsNumberModalOpen] = useState(false);
  const [isAlarmNotificationModalOpen, setIsAlarmNotificationModalOpen] = useState(false);
  const [showState, setShowState] = useState(true);

  const openSmsNumberTable = () => {
    setIsAddMode(true);
    setEditData(null);
    setIsSmsNumberModalOpen(true);
    setShowState(false);
  };

  const openAlarmNotificationTable = () => {
    setIsAddMode(true);
    setEditData(null);
    setIsAlarmNotificationModalOpen(true);
    setShowState(false);
  };
  const closeSmsNumberModal = () => {
    setIsSmsNumberModalOpen(false);
    // Additional cleanup if needed
  };

  const closeAlarmNotificationModal = () => {
    setIsAlarmNotificationModalOpen(false);
    // Additional cleanup if needed
  };


  const openModal = () => {
      setIsModalOpen(true)
  }
  const closeModal = () => {
      setIsModalOpen(false)
  }

  const [data, setdata] = useState([])
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    textemailaddress:'',
    smsnumber:'',
    texttospeechnumber:'',
  })
   useEffect(() => {
    if (data) {
     setFormData(() => ({
        email: data.email,
        textemailaddress: data.textemailaddress,
        smsnumber: data.smsnumber,
        texttospeechnumber:data.texttospeechnumber,
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

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      showLoader()
      saveHandler(formData)
      console.log(formData)
      closeModal()
    }
  }
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
        if (isAddMode) {
            
        console.log("modal is open")
        } else {
          closeSmsNumberModal();
          closeAlarmNotificationModal();        
        }
    }, 0)
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
              saveHandler={saveHandler}
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
              saveHandler={saveHandler}
              data={editData}
            />
          }
          isOpen={isAlarmNotificationModalOpen}
          onClose={closeAlarmNotificationModal}
        />
      )}

    <div>
    <CIcon icon={cilBuilding} alt="Name" /> 
      <h1 style={{fontSize:'60px', fontFamily:'sans-serif'}}>Alarm Notification</h1>
    </div>
    <div>
     <CAccordion alwaysOpen activeItemKey={2}>
  <CAccordionItem itemKey={1}>
    <CAccordionHeader style={{fontSize:'50px', fontFamily:'sans-serif'}}>Notification Setup</CAccordionHeader>
    <CAccordionBody>
      <left>
      This is the first item's accordion body. It is hidden by default, until the
      collapse plugin adds the <strong>ensure</strong> appropriate classes that we use to style each element.
       These classes are very useful for the necessory implementation of the work and also the esuresance of task
      control the overall appearance, as well as the showing and hiding via CSS transitions. You can
      modify any of this with  <a href='www.google.com'>Alaram Setup</a> custom CSS or overriding our default variables. It's also worth noting
      that just about any HTML can go within the  <a href='www.google.com'>User setup</a>, though the transition
      does limit overflow.</left>
    </CAccordionBody>
  </CAccordionItem>
  <CAccordionItem itemKey={2}>
    <CAccordionHeader style={{fontSize:'50px', fontFamily:'sans-serif'}}>SMS Credits</CAccordionHeader>
    <CAccordionBody>
   * It is hidden by default, until the collapse plugin adds the appropriate classes that we use to 
    to be aware of something is necessary
    <br/>
      <CTable bordered>
  <CTableBody>
    <CTableRow >
      <CTableDataCell style={{width:'800px'}}  >
        Organization Credit
      </CTableDataCell>
      <CTableDataCell>0</CTableDataCell>
    </CTableRow>
    <CTableRow >
      <CTableDataCell  >
      Facility  Credit
      </CTableDataCell>
      <CTableDataCell>0</CTableDataCell>
    </CTableRow>
     </CTableBody>
       </CTable>
    </CAccordionBody>
  </CAccordionItem>
  
  <CAccordionItem itemKey={3}>
    <CAccordionHeader style={{fontSize:'50px', fontFamily:'sans-serif'}}>Alarms</CAccordionHeader>
    <CAccordionBody>
    <CForm
      className="row mt-2 g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{marginBottom:'26px'}}
    >
      {/* First Name */}
      <CCol md={6}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationFirstName"
        >
          Email Address
        </CFormLabel>
        <CInputGroup style={{height:'90px'}}>
          <CInputGroupText>
            {/* <MdLocationPin /> */}
          <CIcon icon={cilBuilding} alt="Name" /> 
          </CInputGroupText>
          <CFormInput
            type="email"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onClick={openAlarmNotificationTable}
            feedbackInvalid="Email is required"
            id="validationCustom01"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Plain Text email Address*/}
      <CCol md={6}>
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationLastName"
        >
          Plain text email Address
        </CFormLabel>
        <CInputGroup className="has-validation" style={{height:'90px'}}>
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
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationEmail"
        >
         SMS Number
        </CFormLabel>
        <CInputGroup className="has-validation" style={{height:'90px'}}>
          <CInputGroupText>
            <CIcon icon={cilHeadphones} alt="sms number" />
          </CInputGroupText>
          <CFormInput
            type="number"
            className={`input-light pt-0 ${darkMode ? 'input-dark' : ''}`}
            name="smsnumber"
            value={formData.smsnumber}
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
        <CFormLabel
          id={`${darkMode ? 'heading-dark' : ''}`}
          htmlFor="validationEmail"
        >
         Text to Speech Number
        </CFormLabel>
        <CInputGroup className="has-validation" style={{height:'90px'}}>
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
          {data ? 'Edit  Details' : 'Add  Details'}
        </CButton>
      </CCol>
    </CForm>
    </CAccordionBody>
  </CAccordionItem>
</CAccordion>
</div>
    </>
  )}
 
 export default NotificationSetup
