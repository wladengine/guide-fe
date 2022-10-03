import React from 'react'
import {
  CTable,
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
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import { items } from '../../../App'

const DocumentList = (props) => {
  let documents = null
  fetch('http://62.3.58.179:3333/documents')
    .then((response) => {
      return response.json() // data into json
    })
    .then((data) => {
      // Here we can use the response Data
      console.log(data)
      documents = data
    })
    .catch(function (error) {
      console.log(error)
    })
  const rows = documents.map((val, index) => {
    return (
      <CTableRow key={index}>
        <CTableHeaderCell scope="row"></CTableHeaderCell>
        <CTableDataCell>{val.name}</CTableDataCell>
        <CTableDataCell>{val.date}</CTableDataCell>
        <CTableDataCell>{val.description}</CTableDataCell>
        <CTableDataCell>
          <CButton size="sm">Редактировать</CButton>
        </CTableDataCell>
      </CTableRow>
    )
  })
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">ФЗ</CTableHeaderCell>
            <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
            <CTableHeaderCell scope="col">Описание</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{rows}</CTableBody>
      </CTable>
      <CRow>
        <CCol lg={4}>
          <CButton size="lg">Add</CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default DocumentList
