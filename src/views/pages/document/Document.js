import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHeader, cilCalendar, cilPen } from '@coreui/icons'
import { useSearchParams } from 'react-router-dom'
import { items } from '../../../App'

const Document = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  let data = items[searchParams.get('id')]
  console.log(searchParams.get('id'))
  console.log(data)
  const [name, setName] = React.useState(data.name)
  const [date, setDate] = React.useState(data.date)
  const [description, setDescription] = React.useState(data.description)
  return (
    <div>
      <CContainer>
        <CRow>
          <CCol lg={12} md={12} sm={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm action={'./document'} method={'post'}>
                    <h1>Документ</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilHeader} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Название документа"
                        autoComplete="document_name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Дата документа"
                        autoComplete="document_date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPen} />
                      </CInputGroupText>
                      <CFormTextarea
                        placeholder="Описание документа"
                        autoComplete="document_description"
                        rows={5}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Сохранить
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Document
