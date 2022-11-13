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
  const [features, setFeatures] = React.useState(null)
  const [currentFeature, setCurrentFeature] = React.useState(null)
  const [featureAddingVisible, setFeatureAddingVisible] = React.useState(true)
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
        setArticle(data.article.id)
        setDocument(data.document.id)
        setArticleNumber(data.number)
        setDocumentName(data.document.short_name)
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

  const saveSegment = () => {
    const reqBody = {
      article_id: parseInt(article),
      number: number,
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
            <CTableDataCell scope="row">{val.product.short_name}</CTableDataCell>
            <CTableDataCell scope="row">{val.parameter.name}</CTableDataCell>
            <CTableDataCell scope="row">{val.summary}</CTableDataCell>
            <CTableDataCell>
              <CButton href={`../#/segment?id=${val.id}`} size="sm">
                Просмотр
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      })
    )

  const optionsFeatures =
    features == null ? (
      <></>
    ) : (
      features.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {`[${val.product.short_name}] ${val.parameter.name}`}
          </option>
        )
      })
    )

  const addFeature = () => {
    setFeatureAddingVisible(!featureAddingVisible)
  }
  const saveFeature = () => {
    if (currentFeature != null && currentFeature >= 0) {
      console.log(currentFeature, 'current feature')
      console.log(features, 'features')
      if (features != null) {
        const fff = features.find((x) => x.id == currentFeature)
        console.log(fff, 'fff')
      }
      fetch(`${baseUrl}/features/${currentFeature}`, {
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
          const product = data.product.id
          const parameter = data.parameter.id
          const summary = data.summary
          const segments = data.segments ?? []
          let saveFeature = false
          console.log(segments, 'segments')
          if (typeof segments === 'undefined' || segments === null) {
            console.log('Saving...')
            saveFeature = true
          } else if (segments.find((x) => x == id) == null) {
            const ff = segments.find((x) => x == id)
            console.log(ff, 'ff')
            console.log('Saving...')
            saveFeature = true
          }
          if (saveFeature) {
            const reqBody = {
              product_id: parseInt(product),
              parameter_id: parseInt(parameter),
              summary: summary,
              segments: (segments ?? []).push(id),
            }
            const reqJSON = JSON.stringify(reqBody)
            const isPOST = (id ?? -1) <= 0
            const requestOptions = {
              method: isPOST ? 'POST' : 'PATCH',
              headers: { 'Content-Type': 'application/javascript', token: authToken },
              body: reqJSON,
              redirect: 'follow',
            }
            const fetchUrl = isPOST ? `${baseUrl}/features` : `${baseUrl}/features/${id}`
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
                window.location = `./#/feature-list`
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
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
                      <li className="breadcrumb-item">
                        <a href={`./#/article?id=${article}`}>ст. {articleNumber}</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        п. {number}
                      </li>
                    </ol>
                  </nav>
                  <CForm action={'./document'} method={'post'}>
                    <h1>Пункт</h1>
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
                  <CHeader>Характеристики</CHeader>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Продукт</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Параметр</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Описание</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>{rowsFeatures}</CTableBody>
                  </CTable>
                  <CRow>
                    {authToken == null ? (
                      <></>
                    ) : (
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={addFeature}>
                          Добавить
                        </CButton>
                      </CCol>
                    )}
                  </CRow>
                  {featureAddingVisible ? (
                    <>
                      <br />
                      <CRow>
                        <CCol xs={12}>
                          <select
                            className="form-select"
                            value={currentFeature}
                            defaultValue={-1}
                            onChange={(e) => {
                              setCurrentFeature(e.target.value)
                            }}
                          >
                            <option value={-1}>Выберите значение...</option>
                            {optionsFeatures}
                          </select>
                        </CCol>
                      </CRow>
                      <br />
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={saveFeature}>
                            Сохранить
                          </CButton>
                        </CCol>
                      </CRow>
                    </>
                  ) : (
                    <></>
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

export default Segment
