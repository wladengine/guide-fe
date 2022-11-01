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
  const [documents, setDocuments] = React.useState(null)
  const [foundFeatures, setFoundFeatures] = React.useState(null)
  const [filterParams, setFilterParams] = React.useState([-1])
  const [documentParams, setDocumentParams] = React.useState([-1])
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
    setDocumentParams([])
  }, [])
  useEffect(() => {
    console.log(
      `call filterFeatures(): filterParams = ${typeof filterParams}, documentParams = ${typeof documentParams}`,
    )
    if (typeof filterParams == 'undefined' || typeof documentParams == 'undefined') {
      console.log(
        `typeof filterParams = ${typeof filterParams}, typeof documentParams = ${typeof documentParams}`,
      )
    } else if (filterParams == null || documentParams == null) {
      console.log(`filterParams = ${filterParams}, documentParams = ${documentParams}`)
    } else {
      console.log(`filterParams = ${[...filterParams]}, documentParams = ${[...documentParams]}`)
      let urlParamFilters = ''
      let urlDocumentFilters = ''
      let hasValidFilters = false
      if (typeof filterParams != 'undefined' && filterParams.length > 0) {
        hasValidFilters = true
        filterParams.map((val, index) => {
          urlParamFilters = urlParamFilters + `&segment_id=${val}`
        })
      }
      if (typeof documentParams != 'undefined' && documentParams.length > 0) {
        hasValidFilters = true
        documentParams.map((val, index) => {
          console.log(val)
          urlDocumentFilters = urlDocumentFilters + `&product_id=${val}`
        })
      }
      if (!hasValidFilters) {
        setFoundFeatures(null)
        return
      }
      console.log(`${baseUrl}/features?${urlParamFilters}${urlDocumentFilters}`)
      fetch(`${baseUrl}/features?${urlParamFilters}${urlDocumentFilters}`, {
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
  }, [filterParams, documentParams])

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
  const updateDocumentParams = (paramId) => {
    console.log('updateDocumentParams(', paramId)
    if (typeof documentParams == 'undefined') {
      console.log(`updateDocumentParams(${documentParams}): typeof documentParams == 'undefined'`)
    } else if (documentParams == null) {
      console.log(`updateDocumentParams(${documentParams}): documentParams == ${documentParams}`)
    } else if (typeof documentParams == 'number' && documentParams == paramId) {
      setDocumentParams([])
    } else if (documentParams.includes(paramId)) {
      setDocumentParams([...documentParams.filter((element) => element !== paramId)])
      console.log(`updateDocumentParams(${documentParams}): removed element`)
    } else {
      setDocumentParams([...documentParams, paramId])
      console.log(
        `updateDocumentParams(${filterParams}): added element. ${[...documentParams, paramId]}`,
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
            <div key={index} className="ps-2 pb-2">
              <b>{val.name}</b>
              <>{filteredParams}</>
            </div>
          )
        })

  const documentsList =
    documents == null
      ? null
      : documents.map((val, index) => {
          const htmlId = `checkBox_${val.id}`
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

  const foundFeaturesList =
    foundFeatures == null
      ? null
      : foundFeatures.map((val, index) => {
          const rowHeader = (
            <CTableHeaderCell key={val.id}>
              <h6>{val.product.short_name}</h6>
              <h6>{val.parameter.name}</h6>
            </CTableHeaderCell>
          )
          const documentList =
            val.segments == null || documentParams.length == 0
              ? null
              : documentParams.map((doc, index) => {
                  const id = `${doc.id}_${index}`
                  const segmentsList = val.segments
                    .filter((a) => a.document.id == doc)
                    .map((val_seg, index) => {
                      return (
                        <div key={val_seg.id}>
                          <b>{val_seg.document.short_name}</b>
                          <br />
                          <b>{`ст. ${val_seg.article.number}`}</b>
                          <br />
                          <b>{`п. ${val_seg.number}`}</b>
                        </div>
                      )
                    })
                  return <CTableDataCell key={id}>{segmentsList}</CTableDataCell>
                })
          return (
            <CTableRow key={index}>
              {rowHeader}
              {documentList}
            </CTableRow>
          )
        })

  const selectedProductColumns =
    documentParams.length > 0 && documents != null && foundFeatures != null ? (
      documentParams.map((val, index) => {
        const value = documents.find((x) => x.id == val)
        return <CTableHeaderCell key={index}>{value.short_name}</CTableHeaderCell>
      })
    ) : (
      <CTableHeaderCell>no data</CTableHeaderCell>
    )

  return (
    <CRow>
      <CCol xs={3}>
        <div className="ps-2 pb-2">
          <b>Продукты</b>
          <>{documentsList}</>
        </div>
        <div className="ps-2 pb-2">
          <b>Характеристики</b>
          <>{paramsFiltersRows}</>
        </div>
      </CCol>
      <CCol xs={9}>
        <CTable>
          <CTableHead>
            <CTableHeaderCell></CTableHeaderCell>
            {selectedProductColumns}
          </CTableHead>
          <CTableBody>{foundFeaturesList}</CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default Dashboard
