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

const Segment = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const param_article = searchParams.get('article') ?? -1

  const [number, setNumber] = React.useState('')
  const [text, setText] = React.useState('')
  const [document, setDocument] = React.useState('')
  const [documentName, setDocumentName] = React.useState('')
  const [articleNumber, setArticleNumber] = React.useState('')
  const [featuresData, setFeaturesData] = React.useState(null)
  const [article, setArticle] = React.useState(param_article)
  const [authToken] = useContext(AuthContext)

  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/segments/${id}`, {
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
        setText(data.text)
        setArticle(data.article_id)
        fetch(`${baseUrl}/articles/${data.article_id}`, {
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
            setDocument(data.document)
            setArticleNumber(data.number)
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
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/segments/${id}/features`, {
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
        setFeaturesData(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const saveSegment = () => {
    const reqBody = {
      article_id: parseInt(article),
      number: parseFloat(number),
      text: text,
    }
    const reqJSON = JSON.stringify(reqBody)
    const isPOST = (id ?? -1) <= 0
    const requestOptions = {
      method: isPOST ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/javascript', token: authToken },
      body: reqJSON,
      redirect: 'follow',
    }
    const fetchUrl = isPOST ? `${baseUrl}/segments` : `${baseUrl}/segments/${id}`
    fetch(fetchUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert('Error while save segments')
          return null
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        window.location = `./#/article?id=${article}`
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const rowsFeatures =
    featuresData == null ? (
      <></>
    ) : (
      featuresData.map((val, index) => {
        return (
          <CTableRow key={index}>
            <CTableDataCell>{val.product.name}</CTableDataCell>
            <CTableHeaderCell scope="row">{val.parameter.name}</CTableHeaderCell>
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
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="./#/document-list">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href={`./#/document?id=${document}`}>{documentName}</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href={`./#/article?id=${article}`}>ст. {articleNumber}</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        п. {number}
                      </li>
                    </ol>
                  </nav>
                  <CForm action={'./document'} method={'post'}>
                    <h1>Абзац</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilHeader} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Номер абзаца"
                        autoComplete="segments_number"
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
                        placeholder="Текст абзаца"
                        autoComplete="segments_text"
                        rows={8}
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      {authToken == null ? (
                        <></>
                      ) : (
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={saveSegment}>
                            Сохранить
                          </CButton>
                        </CCol>
                      )}
                    </CRow>
                  </CForm>
                  <CHeader>Цели</CHeader>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>{rowsFeatures}</CTableBody>
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

export default Segment
