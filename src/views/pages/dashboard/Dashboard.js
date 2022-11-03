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
  CCard,
  CHeader,
} from '@coreui/react'

const Dashboard = (props) => {
  const [groups, setGroups] = React.useState(null)
  const [products, setProducts] = React.useState(null)
  const [documents, setDocuments] = React.useState(null)
  const [foundFeatures, setFoundFeatures] = React.useState(null)
  const [filterParams, setFilterParams] = React.useState([])
  const [productParams, setProductParams] = React.useState([])
  const [documentParams, setDocumentParams] = React.useState([])
  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/groups`, {
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
        setGroups(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/products`, {
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
        setProducts(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/documents`, {
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
        setDocuments(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    setFilterParams([])
    setProductParams([])
  }, [])
  useEffect(() => {
    console.log(
      `call filterFeatures(): productParams = ${typeof productParams}, filterParams = ${typeof filterParams}`,
    )
    if (
      typeof productParams == 'undefined' ||
      typeof filterParams == 'undefined' ||
      typeof documentParams == 'undefined'
    ) {
      console.log(`typeof productParams = ${typeof productParams}`)
      console.log(`typeof filterParams = ${typeof filterParams}`)
      console.log(`typeof documentParams = ${typeof documentParams}`)
    } else if (filterParams == null || productParams == null || documentParams == null) {
      console.log(`productParams = ${productParams}`)
      console.log(`filterParams = ${filterParams}`)
      console.log(`documentParams = ${documentParams}`)
    } else {
      console.log(`productParams = ${[...productParams]}`)
      let urlDocumentFilters = ''
      let urlParamsFilters = ''
      let hasValidFilters = false
      if (typeof productParams != 'undefined' && productParams.length > 0) {
        hasValidFilters = true
        productParams.forEach((val, index) => {
          urlDocumentFilters = urlDocumentFilters + `&product_id=${val}`
        })
      }
      if (typeof filterParams != 'undefined' && filterParams.length > 0) {
        hasValidFilters = true
        filterParams.forEach((val, index) => {
          urlParamsFilters = urlParamsFilters + `&parameter_id=${val}`
        })
      }
      if (typeof documentParams == 'undefined' || documentParams.length === 0) {
        hasValidFilters = false
      }
      if (!hasValidFilters) {
        setFoundFeatures(null)
        return
      }
      console.log(`${baseUrl}/features?${urlDocumentFilters}${urlParamsFilters}`)
      fetch(`${baseUrl}/features?${urlDocumentFilters}${urlParamsFilters}`, {
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
          setFoundFeatures(data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [filterParams, productParams, documentParams])
  useEffect(() => {
    console.log(`documentParams now = ${[...documentParams]}`)
    console.log(
      `documentParams.filter((x) => x.id > 0).length now = ${
        documentParams.filter((x) => x > 0).length
      }`,
    )
  }, [documentParams])

  const updateFilterParams = (paramId) => {
    console.log(
      `call updateFilterParams(${paramId}): filterParams = ${filterParams}, ${typeof filterParams}`,
    )
    if (typeof filterParams == 'undefined') {
      console.log(`updateFilterParams(${filterParams}): typeof filterParams == 'undefined'`)
    } else if (filterParams == null) {
      console.log(`updateFilterParams(${filterParams}): filterParams == ${filterParams}`)
    } else if (typeof filterParams == 'number' && filterParams == paramId) {
      setFilterParams([])
    } else if (filterParams.includes(paramId)) {
      setFilterParams([...filterParams.filter((element) => element !== paramId)])
      console.log(`updateFilterParams(${filterParams}): removed element`)
    } else {
      setFilterParams([...filterParams, paramId])
      console.log(
        `updateFilterParams(${filterParams}): added element. ${[...filterParams, paramId]}`,
      )
    }
  }
  const updateProductParams = (paramId) => {
    console.log('updateProductParams(', paramId)
    if (typeof productParams == 'undefined') {
      console.log(`updateProductParams(${productParams}): typeof documentParams == 'undefined'`)
    } else if (productParams == null) {
      console.log(`updateProductParams(${productParams}): documentParams == ${productParams}`)
    } else if (typeof productParams == 'number' && productParams == paramId) {
      setProductParams([])
    } else if (productParams.includes(paramId)) {
      setProductParams([...productParams.filter((element) => element !== paramId)])
      console.log(`updateProductParams(${productParams}): removed element`)
    } else {
      setProductParams([...productParams, paramId])
      console.log(
        `updateProductParams(${filterParams}): added element. ${[...productParams, paramId]}`,
      )
    }
  }
  const updateDocumentParams = (paramId) => {
    console.log(`call updateDocumentParams(${paramId})`)
    if (typeof documentParams == 'undefined') {
      console.log(`updateDocumentParams(${paramId}): typeof documentParams == 'undefined'`)
    } else if (documentParams == null) {
      console.log(`updateDocumentParams(${paramId}): documentParams == ${documentParams}`)
    } else if (typeof documentParams == 'number' && documentParams == paramId) {
      setDocumentParams([])
    } else if (documentParams.includes(paramId)) {
      setDocumentParams([...documentParams.filter((element) => element !== paramId)])
      console.log(`updateDocumentParams(${paramId}): removed element from ${documentParams}`)
    } else {
      setDocumentParams([...documentParams, paramId])
      console.log(
        `updateDocumentParams(${paramId}): added element. ${[...documentParams, paramId]}`,
      )
    }
  }

  const paramsFiltersRows =
    groups == null
      ? null
      : groups.map((val, index) => {
          const filteredParams = val.parameters.map((val_p, index_p) => {
            const htmlId = `checkBoxParam_${val_p.id}`
            return (
              <div key={val_p.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={htmlId}
                  onClick={(e) => {
                    updateFilterParams(val_p.id)
                  }}
                />
                <label className="form-check-label" htmlFor={htmlId}>
                  {val_p.name}
                </label>
              </div>
            )
          })
          return (
            <div key={`prm_${index}`} className="ps-2 pb-2">
              <b>{val.name}</b>
              <>{filteredParams}</>
            </div>
          )
        })

  const documentsList =
    documents == null
      ? null
      : documents.map((val, index) => {
          const htmlId = `checkBoxDoc_${val.id}`
          return (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={htmlId}
                onClick={(e) => {
                  updateDocumentParams(val.id)
                }}
              />
              <label className="form-check-label" htmlFor={htmlId}>
                {val.short_name}
              </label>
            </div>
          )
        })

  const productsList =
    products == null
      ? null
      : products.map((val, index) => {
          const htmlId = `checkBoxProd_${val.id}`
          return (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={htmlId}
                onClick={(e) => {
                  updateProductParams(val.id)
                }}
              />
              <label className="form-check-label" htmlFor={htmlId}>
                {val.name}
              </label>
            </div>
          )
        })

  const foundFeaturesList =
    foundFeatures == null
      ? null
      : foundFeatures.map((val, index) => {
          const rowHeader = (
            <CTableHeaderCell style={{ width: '30%' }} key={val.id}>
              <h6>
                [{val.product.short_name}] {val.product.name}
              </h6>
              <h6>{val.parameter.name}</h6>
            </CTableHeaderCell>
          )
          const documentList =
            val.segments == null || productParams.length == 0
              ? null
              : documentParams
                  .filter((x) => x > 0)
                  .map((doc, index) => {
                    const id = `doc${doc}_${index}`
                    const segmentListsData = val.segments
                      .filter((a) => a.document.id == doc)
                      .sort((a, b) => a.id - b.id)
                    const segmentsList =
                      segmentListsData.length === 0 ? (
                        <div className={'card mb-2'}>
                          <div className={'card-body'}>
                            <span>Нет данных</span>
                          </div>
                        </div>
                      ) : (
                        segmentListsData.map((val_seg, index) => {
                          return (
                            <div className={'card mb-2'} key={val_seg.id}>
                              <div className={'card-body'}>
                                <a href={`./#/segment?id=${val_seg.id}`}>
                                  {`ст. ${val_seg.article.number}`}, {`п. ${val_seg.number}`}
                                </a>
                              </div>
                            </div>
                          )
                        })
                      )
                    return (
                      <CTableDataCell key={id}>
                        <CRow className={'me-2'}>
                          <b>{doc.short_name}</b>
                          {segmentsList}
                        </CRow>
                      </CTableDataCell>
                    )
                  })
          return (
            <CTableRow key={index}>
              {rowHeader}
              {documentList}
            </CTableRow>
          )
        })

  const selectedDocumentColumns =
    documentParams.filter((x) => x > 0).length > 0 && documents != null ? (
      documentParams
        .filter((x) => x > 0)
        .map((val, index) => {
          const value = documents.find((x) => x.id == val)
          console.log(`finding documents.id = ${val} = ${value}`)
          return <CTableHeaderCell key={index}>{value.short_name}</CTableHeaderCell>
        })
    ) : (
      <CTableHeaderCell>
        <div className={'card'}>
          <div className={'card-body'}>
            <h4>Нет данных</h4>
          </div>
        </div>
      </CTableHeaderCell>
    )

  return (
    <CRow>
      <CCol xs={3}>
        <div className="ps-2 pb-2">
          <b>Законы</b>
          <div className={'ps-2 pb-2'}>{documentsList}</div>
        </div>
        <div className="ps-2 pb-2">
          <b>Продукты</b>
          <div className={'ps-2 pb-2'}>{productsList}</div>
        </div>
        <div className="ps-2 pb-2">
          <b>Характеристики</b>
          <>{paramsFiltersRows}</>
        </div>
      </CCol>
      <CCol xs={9}>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              {selectedDocumentColumns}
            </CTableRow>
          </CTableHead>
          <CTableBody>{foundFeaturesList}</CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default Dashboard
