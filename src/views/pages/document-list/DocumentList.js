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
  const [documents, setDocuments] = React.useState(null)
  fetch('http://487346.msk-kvm.ru:3333/documents', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then((response) => {
      console.log(response)
      console.log(response.status)
      return response.json() // data into json
    })
    .then((data) => {
      // Here we can use the response Data
      console.log(data)
      setDocuments(data)
    })
    .catch(function (error) {
      console.log(error)
    })
  const rows =
    documents == null
      ? null
      : documents.map((val, index) => {
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
