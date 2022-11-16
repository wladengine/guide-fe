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
      : realms
          .sort((a, b) => {
            const nameA = a.description.toUpperCase()
            const nameB = b.description.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          })
          .map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.description}
              </option>
            )
          })

  const actorsList =
    actors == null
      ? null
      : actors
          .sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          })
          .map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.name}
              </option>
            )
          })

  const foundClaimsList =
    foundClaims == null
      ? null
      : foundClaims.map((val, index) => {
          return (
            <CTableRow key={index}>
              <CTableHeaderCell style={{ width: '50%' }} key={val.id}>
                <h6>
                  [{val.product.short_name}] {val.product.name}
                </h6>
                Минимальная сумма: {val.fee.name}
              </CTableHeaderCell>
            </CTableRow>
          )
        })

  return (
    <AppHeaderReduced>
      <CRow>
        <CCol xs={11}>
          <div className="ps-4 pb-2">
            <b>Выберите сферу инвестирования</b>
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
            <b>Выберите вид инвестора</b>
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
          <div className="ps-4 pb-2">
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{foundClaimsList}</CTableBody>
            </CTable>
          </div>
        </CCol>
      </CRow>
    </AppHeaderReduced>
  )
}

export default Market
