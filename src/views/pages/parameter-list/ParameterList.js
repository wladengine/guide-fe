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

const ParameterList = (props) => {
  const [parameters, setParameters] = React.useState(null)
  useEffect(() => {
    fetch('http://487346.msk-kvm.ru:3333/parameters', {
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
        setParameters(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const rows =
    parameters == null
      ? null
      : parameters.map((val, index) => {
          return (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row"></CTableHeaderCell>
              <CTableDataCell>{val.group.name}</CTableDataCell>
              <CTableDataCell>{val.name}</CTableDataCell>
              <CTableDataCell>
                <CButton href={`../#/parameter?id=${val.id}`} size="sm">
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
            <CTableHeaderCell scope="col">Группа</CTableHeaderCell>
            <CTableHeaderCell scope="col">Параметр</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{rows}</CTableBody>
      </CTable>
      <CRow>
        <CCol lg={4}>
          <CButton size="lg" href={'./#/parameter?id=-1'}>
            Добавить
          </CButton>
        </CCol>
      </CRow>
    </AppHeaderAdmin>
  )
}

export default ParameterList
