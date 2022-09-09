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
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'ФЗ',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      label: 'Дата',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Информация',
      _props: { scope: 'col' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
  ]

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
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>{items[0].name}</CTableDataCell>
            <CTableDataCell>{items[0].date}</CTableDataCell>
            <CTableDataCell>{items[0].description}</CTableDataCell>
            <CTableDataCell>
              <CButton size="sm">Редактировать</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>ФЗ №222</CTableDataCell>
            <CTableDataCell>01.09.2021</CTableDataCell>
            <CTableDataCell>
              Nullam eget est aliquam, porttitor tortor ac, bibendum nisl. Praesent sed urna mi. Ut
              libero turpis, facilisis ac neque ac, suscipit tincidunt urna. Aliquam lobortis turpis
              id sapien lobortis lacinia. Morbi tincidunt leo eget libero efficitur rutrum.
              Vestibulum varius ac metus elementum mattis. Aenean rhoncus eu nisl vitae euismod. Sed
              semper mollis venenatis. Morbi non finibus mauris. Sed diam ex, gravida at nunc eu,
              placerat congue quam. Nulla vitae quam at dui condimentum lobortis. Morbi mattis
              bibendum congue. Pellentesque habitant morbi tristique senectus et netus et malesuada
              fames ac turpis egestas. Pellentesque vitae tellus a metus auctor posuere. Cras
              sagittis accumsan tellus, in blandit velit dignissim sed. Integer pretium vestibulum
              dui, id tristique diam.
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm">Редактировать</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>ФЗ №333</CTableDataCell>
            <CTableDataCell>01.04.2022</CTableDataCell>
            <CTableDataCell>
              Sed eu mattis enim. Donec fermentum quis enim non suscipit. Sed egestas dolor quis dui
              vestibulum, at dictum ipsum vehicula. Cras est ex, pulvinar sed massa sollicitudin,
              volutpat elementum augue. Vivamus tempor ornare nulla, in suscipit dui luctus non.
              Curabitur convallis at ipsum ac maximus. In hac habitasse platea dictumst. Sed
              tincidunt, metus rutrum laoreet suscipit, leo orci sollicitudin nulla, ut accumsan mi
              diam eu massa. Mauris efficitur mattis dolor, eget blandit tellus pretium at.
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm">Редактировать</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">4</CTableHeaderCell>
            <CTableDataCell>ФЗ №333/2</CTableDataCell>
            <CTableDataCell>02.04.2022</CTableDataCell>
            <CTableDataCell>
              In hac habitasse platea dictumst. Nam sed mi ipsum. Quisque mattis ut dolor a mollis.
              Donec luctus lacus nulla, vitae pharetra ante gravida ac. Donec egestas ipsum non erat
              mollis, et rhoncus nulla tincidunt. Donec aliquam auctor tortor eu sodales. In egestas
              nunc risus, ac porta nibh pretium sed. Vestibulum dignissim erat ultrices dapibus
              hendrerit. Nullam at augue et orci imperdiet cursus. Cras tincidunt lectus orci, non
              auctor enim volutpat ac. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Donec sit amet purus sodales, vehicula lacus in,
              vulputate eros.
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm">Редактировать</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
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
