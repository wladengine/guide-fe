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
import { useContext } from 'react'
import AuthContext from '../../../components/AuthContext'
import AppHeaderAdmin from '../../../components/AppHeaderAdmin'

const Article = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const param_document = searchParams.get('document') ?? -1

  const [number, setNumber] = React.useState('')
  const [name, setName] = React.useState('')
  const [documentName, setDocumentName] = React.useState('')
  const [document, setDocument] = React.useState(param_document)
  const [segmentIds, setSegmentIds] = React.useState(null)
  const [segments, setSegments] = React.useState(null)
  const [authToken] = useContext(AuthContext)

  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/articles/${id}`, {
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
        setDocument(data.document)
        setSegmentIds(data.segments)
        fetch(`${baseUrl}/documents/${data.document}`, {
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
            setDocumentName(data.short_name)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/articles/${id}/segments`, {
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
          data.sort((a, b) => {
            return a.number - b.number
          }),
        )
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const saveArticle = () => {
    const reqBody = {
      document: parseInt(document),
      number: number,
      name: name,
      segments: segmentIds,
    }
    const reqJSON = JSON.stringify(reqBody)
    const isPOST = (id ?? -1) <= 0
    const requestOptions = {
      method: isPOST ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/javascript', token: authToken },
      body: reqJSON,
      redirect: 'follow',
    }
    const fetchUrl = isPOST ? `${baseUrl}/articles` : `${baseUrl}/articles/${id}`
    fetch(fetchUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert('Error while save article')
          return null
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        window.location = `./#/document?id=${document}`
      })
      .catch(function (error) {
        console.log(error)
      })
  }

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
    <AppHeaderAdmin>
      <CContainer>
        <CRow>
          <CCol lg={12} md={12} sm={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="./#/document-list">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href={`./#/document?id=${document}`}>{documentName}</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        ст. {number}
                      </li>
                    </ol>
                  </nav>
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
                        rows={2}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      {authToken == null ? (
                        <></>
                      ) : (
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={saveArticle}>
                            Сохранить
                          </CButton>
                        </CCol>
                      )}
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
                  {authToken == null ? (
                    <></>
                  ) : (
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          href={`../#/segment?article=${id}`}
                        >
                          Добавить
                        </CButton>
                      </CCol>
                    </CRow>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </AppHeaderAdmin>
  )
}

export default Article
