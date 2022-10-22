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
import { cilPen } from '@coreui/icons'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../../components/AuthContext'

const Feature = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [savedSegmentsIds, setSavedSegmentsIds] = React.useState(null)
  const [savedSegments, setSavedSegments] = React.useState(null)
  const [parameters, setParameters] = React.useState(null)
  const [products, setProducts] = React.useState(null)

  const [document, setDocument] = React.useState('')
  const [article, setArticle] = React.useState('')
  const [segment, setSegment] = React.useState('')

  const [documents, setDocuments] = React.useState(null)
  const [articles, setArticles] = React.useState(null)
  const [segments, setSegments] = React.useState(null)

  const [authToken] = useContext(AuthContext)

  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/features/${id}`, {
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
        setProduct(data.product.id)
        setParameter(data.parameter.id)
        setSummary(data.summary)
        setSavedSegments(data.segments)
        if (typeof data.segments != 'undefined' && data.segments != null) {
          const ids = data.segments.map((x) => {
            return x.id
          })
          setSavedSegmentsIds(ids)
        } else {
          setSavedSegments([])
          setSavedSegmentsIds([])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/parameters`, {
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
        setParameters(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/products`, {
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
        setProducts(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/documents`, {
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
        setDocuments(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const GetArticles = (document_id) => {
    setArticles(null)
    if (document_id == null) {
      document_id = document
    }
    fetch(`http://487346.msk-kvm.ru:3333/documents/${document_id}/articles`, {
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
        setSegments(null)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const GetSegments = (article_id) => {
    if (article_id == null) {
      article_id = article
    }
    fetch(`http://487346.msk-kvm.ru:3333/articles/${article_id}/segments`, {
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
  }

  const [isSuccessfullySaved, setIsSuccessfullySaved] = React.useState(false)
  const saveFeature = () => {
    console.log(authToken)
    const reqBody = {
      product_id: parseInt(product),
      parameter_id: parseInt(parameter),
      summary: summary,
      segments: savedSegmentsIds,
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
        setIsSuccessfullySaved(true)
        setTimeout(setIsSuccessfullySaved, 5, false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const [product, setProduct] = React.useState(-1)
  const [parameter, setParameter] = React.useState(-1)
  const [summary, setSummary] = React.useState('')

  const [saveButton, setSaveButton] = React.useState(false)
  const onSaveButton = () => {
    setSaveButton(!saveButton)
  }
  const onSaveFeature = () => {
    const segmentId = parseInt(segment)
    console.log([...savedSegmentsIds, segmentId], 'savedSegmentsIds')
    if (!savedSegmentsIds.includes(segmentId)) {
      console.log('saving....')
      const doc = documents.find((x) => x.id == document)
      const art = articles.find((x) => x.id == article)
      const seg = segments.find((x) => x.id == segmentId)
      setSavedSegmentsIds([...savedSegmentsIds, seg.id])
      const segmentExtended = {
        id: seg.id,
        number: seg.number,
        document: doc,
        article: art,
      }
      setSavedSegments([...savedSegments, segmentExtended])
      onSaveButton()
    }
  }

  const optionsProducts =
    products == null ? (
      <></>
    ) : (
      products.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {val.name}
          </option>
        )
      })
    )
  const optionsParameters =
    parameters == null ? (
      <></>
    ) : (
      parameters.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {val.name}
          </option>
        )
      })
    )
  const optionsDocuments =
    documents == null ? (
      <></>
    ) : (
      documents.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {val.short_name}
          </option>
        )
      })
    )
  const optionsArticles =
    articles == null ? (
      <></>
    ) : (
      articles.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {`ст. ${val.number} ${val.name}`}
          </option>
        )
      })
    )
  const optionsSegments =
    segments == null ? (
      <></>
    ) : (
      segments.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {`п. ${val.number}`}
          </option>
        )
      })
    )
  const rowsSegments =
    savedSegments == null ? (
      <></>
    ) : (
      savedSegments.map((val, index) => {
        return (
          <CTableRow key={index}>
            <CTableDataCell scope="row">{val.document.short_name}</CTableDataCell>
            <CTableDataCell scope="row">{`ст. ${val.article.number}. ${val.article.name}`}</CTableDataCell>
            <CTableDataCell scope="row">{`п. ${val.number}`}</CTableDataCell>
            <CTableDataCell>
              <CButton href={`../#/segment?id=${val.id}`} size="sm">
                Просмотр
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )
      })
    )
  const saveButtonMarkup = saveButton ? (
    <CTableRow>
      <CTableDataCell>
        <select
          className="form-select"
          value={document}
          defaultValue={-1}
          onChange={(e) => {
            setDocument(e.target.value)
            GetArticles(e.target.value)
          }}
          aria-label="Parameter"
        >
          <option value={-1}>Выберите значение...</option>
          {optionsDocuments}
        </select>
      </CTableDataCell>
      <CTableDataCell>
        <select
          className="form-select"
          value={article}
          defaultValue={-1}
          onChange={(e) => {
            setArticle(e.target.value)
            GetSegments(e.target.value)
          }}
          aria-label="Article"
        >
          <option value={-1}>Выберите значение...</option>
          {optionsArticles}
        </select>
      </CTableDataCell>
      <CTableDataCell>
        <select
          className="form-select"
          value={segment}
          defaultValue={-1}
          onChange={(e) => {
            setSegment(e.target.value)
          }}
          aria-label="Segment"
        >
          <option value={-1}>Выберите значение...</option>
          {optionsSegments}
        </select>
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="primary" className="px-4" onClick={onSaveFeature}>
          Добавить
        </CButton>
      </CTableDataCell>
    </CTableRow>
  ) : (
    <CTableRow>
      <CCol xs={6}>
        <CButton color="primary" className="px-4" onClick={onSaveButton}>
          Добавить
        </CButton>
      </CCol>
    </CTableRow>
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
                      <a href="./#/feature-list">Список инструментов по параметрам</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {product}
                    </li>
                  </ol>
                  <CForm>
                    <h1>Инструмент</h1>
                    <h5>Продукт</h5>
                    <CInputGroup className="mb-3">
                      <select
                        className="form-select"
                        value={product}
                        defaultValue={-1}
                        onChange={(e) => {
                          setProduct(e.target.value)
                        }}
                        aria-label="Default select example"
                      >
                        <option value={-1}>Выберите значение...</option>
                        {optionsProducts}
                      </select>
                    </CInputGroup>
                    <h5>Характеристика</h5>
                    <CInputGroup className="mb-3">
                      <select
                        className="form-select"
                        value={parameter}
                        defaultValue={-1}
                        onChange={(e) => {
                          setParameter(e.target.value)
                        }}
                        aria-label="Parameter"
                      >
                        <option value={-1}>Выберите значение...</option>
                        {optionsParameters}
                      </select>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilPen} />
                      </CInputGroupText>
                      <CFormTextarea
                        placeholder="Описание"
                        autoComplete="feature_summary"
                        rows={2}
                        value={summary}
                        onChange={(e) => {
                          setSummary(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={saveFeature}>
                          Сохранить
                        </CButton>
                      </CCol>
                    </CRow>
                    {isSuccessfullySaved ? (
                      <div className="alert alert-success" role="alert">
                        Сохранено
                      </div>
                    ) : (
                      <></>
                    )}
                  </CForm>
                  <CHeader>Пункты статей</CHeader>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">ФЗ</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Статья</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Пункт</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {rowsSegments}
                      {authToken == null ? <></> : saveButtonMarkup}
                    </CTableBody>
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

export default Feature
