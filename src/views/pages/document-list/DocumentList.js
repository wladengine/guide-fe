import React, { useEffect } from 'react'
import {
  CTable,
  CButton,
  CCol,
  CRow,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import AppHeaderAdmin from '../../../components/AppHeaderAdmin'

const DocumentList = (props) => {
  const [documents, setDocuments] = React.useState(null)
  useEffect(() => {
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
        return response.json()
      })
      .then((data) => {
        setDocuments(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const rows =
    documents == null
      ? null
      : documents.map((val, index) => {
          return (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row"></CTableHeaderCell>
              <CTableDataCell>{val.short_name}</CTableDataCell>
              <CTableDataCell>{val.full_name}</CTableDataCell>
              <CTableDataCell>{val.date}</CTableDataCell>
              <CTableDataCell>
                <CButton href={`../#/document?id=${val.id}`} size="sm">
                  Редактировать
                </CButton>
              </CTableDataCell>
            </CTableRow>
          )
        })
  return (
    <AppHeaderAdmin>
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
          <CButton href={'./#/document?id=-1'} size="lg">
            Добавить
          </CButton>
        </CCol>
      </CRow>
    </AppHeaderAdmin>
  )
}

export default DocumentList
