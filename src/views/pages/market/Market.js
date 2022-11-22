import React, { useEffect } from 'react'
import {
  CTable,
  CCol,
  CRow,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react'
import AppHeaderReduced from '../../../components/AppHeaderReduced'

const Market = () => {
  const [realms, setRealms] = React.useState(null)
  const [actors, setActors] = React.useState(null)
  const [foundClaims, setFoundClaims] = React.useState(null)
  const [realmsParams, setRealmsParams] = React.useState(-1)
  const [actorsParams, setActorsParams] = React.useState(-1)
  const [sumParams, setSumParams] = React.useState(0)
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
    if (realmsParams != -1 || actorsParams != -1 || sumParams != 10) {
      let urlRealmsFilters = ''
      if (realmsParams != -1) {
        urlRealmsFilters = `&realm_id=${realmsParams}`
      }
      let urlActorsFilters = ''
      if (actorsParams != -1) {
        urlActorsFilters = `&actor_id=${actorsParams}`
      }
      let urlSumParams = ''
      if (sumParams != 10) {
        urlSumParams = `&max=${sumsValues[sumParams]}`
      }
      let fetchUrl = `${baseUrl}/claims?${urlRealmsFilters}${urlActorsFilters}${urlSumParams}`
      console.log(fetchUrl)
      fetch(fetchUrl, {
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
    } else {
      setFoundClaims(null)
    }
  }, [realmsParams, actorsParams, sumParams])

  const sumsValues = [
    10_000_000, 50_000_000, 100_000_000, 250_000_000, 500_000_000, 1_000_000_000, 2_000_000_000,
    3_000_000_000, 5_000_000_000, 10_000_000_000,
  ]
  const sumsValuesText = [
    '10 млн',
    '50 млн',
    '100 млн',
    '250 млн',
    '500 млн',
    '1 млрд',
    '2 млрд',
    '3 млрд',
    '5 млрд',
    '5 млрд',
  ]

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
                {realmsParams == -1 ? <h6>{val.realm.description}</h6> : ''}
                Минимальная сумма: {val.fee.name}
                <h6>{val.clause}</h6>
                <hr />
              </CTableHeaderCell>
            </CTableRow>
          )
        })
  const foundClaimsCount =
    foundClaims == null ? 'не найдено' : `найдено ${foundClaims.length} вариантов`

  const sumParamsView =
    typeof sumParams == 'undefined' || typeof sumsValues[sumParams] == 'undefined'
      ? 'любой'
      : `от ${sumsValuesText[sumParams]} рублей`

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
            <b>Выберите организационно-правовую форму</b>
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
          <div className="ps-4 pb-2">
            <b htmlFor="customRange2" className="form-label">
              Укажите объём инвестирования
            </b>
            <input
              type="range"
              className="form-range"
              min="0"
              max="10"
              id="customRange2"
              onChange={(e) => {
                setSumParams(e.target.value)
              }}
            />
            <span>{sumParamsView}</span>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={11}>
          <div className="ps-4 pb-2">
            <b>{foundClaimsCount}</b>
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
