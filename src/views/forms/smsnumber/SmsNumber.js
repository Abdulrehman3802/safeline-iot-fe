import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {
  CButton,
  CCol,
  CForm,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CFormCheck,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cil3d,
  cil4k,
  cilBuilding,
  cilEnvelopeClosed,
  cilLibraryBuilding,
  cilNotes,
  cilPhone,
} from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { getAllNotificationDataBySms } from 'src/hooks/useNotifications'
const SmsNumber = ({ closeModal, saveHandler, data }) => {
  const [tableDataArray, setDataTableArray] = useState([])
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: AllData } = useMutation(getAllNotificationDataBySms)

  function EmailDataFetch(id) {
    AllData(id, {
      onSuccess: (data) => {
        debugger
        hideLoader()
        setDataTableArray(data.data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const [checkedItems, setCheckedItems] = useState([])
  const [isAllNoneChecked, setIsAllNoneChecked] = useState(false)

  // Handler for checkbox change
  const handleCheckboxChange = (index) => {
    const isChecked = checkedItems.includes(index)

    // Create a copy of checkedItems to avoid mutating state directly
    const updatedCheckedItems = [...checkedItems]

    if (isChecked) {
      // Item is checked, remove it
      updatedCheckedItems.splice(updatedCheckedItems.indexOf(index), 1)
    } else {
      // Item is unchecked, add it
      updatedCheckedItems.push(index)
    }

    setCheckedItems(updatedCheckedItems)
  }
  // const handleCheckboxChange = (index) => {
  //   // Create a copy of checkedItems to avoid mutating state directly
  //   const updatedCheckedItems = [...checkedItems]

  //   // Toggle the checkbox state
  //   if (updatedCheckedItems.includes(index)) {
  //     updatedCheckedItems.splice(updatedCheckedItems.indexOf(index), 1)
  //   } else {
  //     updatedCheckedItems.push(index)
  //   }

  //   setCheckedItems(updatedCheckedItems)
  // }

  // Handler for "All/None" checkbox change
  const handleAllNoneCheckboxChange = () => {
    // If "All/None" is checked, set all checkboxes to be checked; otherwise, uncheck them
    setIsAllNoneChecked((prev) => {
      const updatedCheckedItems = prev
        ? []
        : Array.from({ length: tableDataArray.length }, (_, i) => i)
      setCheckedItems(updatedCheckedItems)
      return !prev
    })
  }

  // Handler for Save button click
  const handleSaveClick = () => {
    const checkedItemsData = checkedItems.map((index) => tableDataArray[index])
    // Log the checked items to the console
    console.log('Checked Items:', checkedItemsData)
    // Call the saveHandler function with the array parameter
    saveHandler(checkedItemsData)

    // Optionally, close the modal or perform other actions
    closeModal()
  }
  useEffect(() => {
    EmailDataFetch(localStorage.getItem('OrganizationId'))
  }, [localStorage.getItem('OrganizationId')])
  useEffect(() => {
    // Initialize checkedItems based on is_email field
    const initialCheckedItems = tableDataArray
      .map((rowData, index) => (rowData.is_email ? index : null))
      .filter((index) => index !== null)

    setCheckedItems(initialCheckedItems)
  }, [tableDataArray])
  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              <CFormCheck
                id="defaultCheckAllNone"
                label="All/None"
                checked={isAllNoneChecked}
                onChange={handleAllNoneCheckboxChange}
              />
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* Map over the array to render table rows */}
          {tableDataArray.map((rowData, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{rowData.name}</CTableDataCell>
              <CTableDataCell>{rowData.phonenumber}</CTableDataCell>
              <CTableDataCell>
                {/* Use handleCheckboxChange to handle checkbox change */}
                <CFormCheck
                  id={`defaultCheck${index + 1}`}
                  onChange={() => handleCheckboxChange(index)}
                  checked={checkedItems.includes(index)}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {/* Button to trigger handleSaveClick */}
      <button onClick={handleSaveClick}>Save</button>
    </div>
  )
}

export default SmsNumber
SmsNumber.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
}
