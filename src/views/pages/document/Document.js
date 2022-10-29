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

const Document = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [id, setId] = React.useState(searchParams.get('id'))
  const [articles, setArticles] = React.useState(null)
  const [segments, setSegments] = React.useState(null)

  const [authToken] = useContext(AuthContext)
  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/documents/${id}`, {
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
        setName(data.short_name)
        setDate(new Date(data.date).toJSON().substring(0, 10))
        setDescription(data.full_name)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/documents/${id}/articles`, {
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
        setArticles(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/segments`, {
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
        setSegments(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const [isSuccessfullySaved, setIsSuccessfullySaved] = React.useState(false)
  const [isMessageUnauthorized, setIsMessageUnauthorized] = React.useState(false)

  const saveDocument = () => {
    console.log(authToken)
    const reqBody = {
      short_name: name,
      date: new Date(date).toJSON(),
      full_name: description,
    }
    const reqJSON = JSON.stringify(reqBody)
    const isPOST = (id ?? -1) <= 0
    const requestOptions = {
      method: isPOST ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/javascript', token: authToken },
      body: reqJSON,
      redirect: 'follow',
    }
    const fetchUrl = isPOST ? `${baseUrl}/documents` : `${baseUrl}/documents/${id}`
    fetch(fetchUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status == '401') {
            setIsMessageUnauthorized(true)
          }
          console.log(response)
          console.log(response.status)
          alert('Error while save document')
          return null
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setId(data.id)
        setIsSuccessfullySaved(true)
        setTimeout(setIsSuccessfullySaved, 5 * 1000, false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const [name, setName] = React.useState('')
  const [date, setDate] = React.useState('')
  const [description, setDescription] = React.useState('')
  const rowsSegments =
    articles == null ? (
      <></>
    ) : (
      articles.sort().map((val, index) => {
        return (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{val.number}</CTableHeaderCell>
            <CTableDataCell>{val.name}</CTableDataCell>
            <CTableDataCell>
              <CButton href={`../#/article?id=${val.id}`} size="sm">
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
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./#/document-list">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {name}
                    </li>
                  </ol>
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
                        rows={2}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={saveDocument}>
                          Сохранить
                        </CButton>
                      </CCol>
                    </CRow>
                    {isSuccessfullySaved ? (
                      <CRow className="mt-3">
                        <CCol xs={12}>
                          <div className="alert alert-success" role="alert">
                            Сохранено
                          </div>
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}
                    {isMessageUnauthorized ? (
                      <CRow className="mt-3">
                        <CCol xs={12}>
                          <div className="alert alert-danger" role="alert">
                            Пользователь не аутентифицирован. <br />
                            <a href={'./#/login'} className={'alert-link'}>
                              Войти
                            </a>
                          </div>
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}
                  </CForm>
                  <CHeader>Статьи</CHeader>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Статья</CTableHeaderCell>
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
                          href={`../#/article?document=${id}`}
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
    </div>
  )
}

export default Document
