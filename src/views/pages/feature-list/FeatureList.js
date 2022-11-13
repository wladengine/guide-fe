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

const FeatureList = () => {
  const [features, setFeatures] = React.useState(null)
  useEffect(() => {
    fetch('http://487346.msk-kvm.ru:3333/features', {
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
        setFeatures(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const rows =
    features == null
      ? null
      : features.map((val, index) => {
          return (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row"></CTableHeaderCell>
              <CTableDataCell>{val.product.short_name}</CTableDataCell>
              <CTableDataCell>{val.parameter.name}</CTableDataCell>
              <CTableDataCell>{val.summary}</CTableDataCell>
              <CTableDataCell>
                <CButton href={`../#/feature?id=${val.id}`} size="sm">
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
            <CTableHeaderCell scope="col">Продукт</CTableHeaderCell>
            <CTableHeaderCell scope="col">Параметр</CTableHeaderCell>
            <CTableHeaderCell scope="col">Описание</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{rows}</CTableBody>
      </CTable>
      <CRow>
        <CCol lg={4}>
          <CButton size="lg" href={'./#/feature?id=-1'}>
            Добавить
          </CButton>
        </CCol>
      </CRow>
    </AppHeaderAdmin>
  )
}

export default FeatureList
