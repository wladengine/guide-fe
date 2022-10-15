import React, { useEffect } from 'react'
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
  CHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHeader, cilCalendar, cilPen } from '@coreui/icons'
import { useSearchParams } from 'react-router-dom'

const Article = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [number, setNumber] = React.useState('')
  const [name, setName] = React.useState('')
  const [segments, setSegments] = React.useState(null)

  useEffect(() => {
    fetch(`http://487346.msk-kvm.ru:3333/articles/${id}`, {
      method: 'GET',
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
        setNumber(data.number)
        setName(data.name)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`http://487346.msk-kvm.ru:3333/segments`, {
      method: 'GET',
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
        setSegments(
          data
            .sort((a, b) => {
              return a.number - b.number
            })
            .filter((x) => x.article_id == id),
        )
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const rowsSegments =
    segments == null ? (
      <></>
    ) : (
      segments.map((val, index) => {
        return (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{val.number}</CTableHeaderCell>
            <CTableDataCell>{val.text}</CTableDataCell>
            <CTableDataCell>
              <CButton href={`../#/segment?id=${val.id}`} size="sm">
                Просмотр
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      })
    )
  return (
    <div>
      <CContainer>
        <CRow>
          <CCol lg={12} md={12} sm={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm action={'./document'} method={'post'}>
                    <h1>Статья</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilHeader} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Номер статьи"
                        autoComplete="article_number"
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPen} />
                      </CInputGroupText>
                      <CFormTextarea
                        placeholder="Текст статьи"
                        autoComplete="article_text"
                        rows={5}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
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
                  <CHeader>Абзацы</CHeader>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>{rowsSegments}</CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Article
