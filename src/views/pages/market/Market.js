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
} from '@coreui/react'
import AppHeaderReduced from '../../../components/AppHeaderReduced'

const Market = () => {
  const [realms, setRealms] = React.useState(null)
  const [actors, setActors] = React.useState(null)
  const [foundClaims, setFoundClaims] = React.useState(null)
  const [realmsParams, setRealmsParams] = React.useState(-1)
  const [actorsParams, setActorsParams] = React.useState(-1)
  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  useEffect(() => {
    fetch(`${baseUrl}/realms`, {
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
        setRealms(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    fetch(`${baseUrl}/actors`, {
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
        setActors(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    if (realmsParams !== -1 && actorsParams !== -1) {
      let urlRealmsFilters = `&realm_id=${realmsParams}`
      let urlActorsFilters = `&actor_id=${actorsParams}`
      console.log(`${baseUrl}/claims?${urlRealmsFilters}${urlActorsFilters}`)
      fetch(`${baseUrl}/claims?${urlRealmsFilters}${urlActorsFilters}`, {
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
          setFoundClaims(data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [realmsParams, actorsParams])

  const realmsList =
    realms == null
      ? null
      : realms.map((val, index) => {
          return (
            <option key={index} value={val.id}>
              {val.description}
            </option>
          )
        })

  const actorsList =
    actors == null
      ? null
      : actors.map((val, index) => {
          return (
            <option key={index} value={val.id}>
              {val.name}
            </option>
          )
        })

  const foundFeaturesList =
    foundClaims == null
      ? null
      : foundClaims.map((val, index) => {
          return (
            <CTableRow key={index}>
              <CTableHeaderCell style={{ width: '50%' }} key={val.id}>
                <h6>
                  [{val.product.short_name}] {val.product.name}
                </h6>
              </CTableHeaderCell>
              <CTableDataCell>{val.fee.name}</CTableDataCell>
            </CTableRow>
          )
        })

  return (
    <AppHeaderReduced>
      <CRow>
        <CCol xs={11}>
          <div className="ps-4 pb-2">
            <b>Выберите realms</b>
            <select
              className="form-select"
              value={realmsParams}
              defaultValue={-1}
              onChange={(e) => {
                setRealmsParams(e.target.value)
              }}
              aria-label="Default select example"
            >
              <option value={-1}>Выберите значение...</option>
              {realmsList}
            </select>
          </div>
          <div className="ps-4 pb-2">
            <b>Выберите actors</b>
            <select
              className="form-select"
              value={actorsParams}
              defaultValue={-1}
              onChange={(e) => {
                setActorsParams(e.target.value)
              }}
              aria-label="Default select example"
            >
              <option value={-1}>Выберите значение...</option>
              {actorsList}
            </select>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={11}>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell></CTableHeaderCell>
                {null}
              </CTableRow>
            </CTableHead>
            <CTableBody>{foundFeaturesList}</CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </AppHeaderReduced>
  )
}

export default Market
