import React, { useEffect } from 'react'
import AppHeaderReduced from '../../../components/AppHeaderReduced'
import {
  CTableHead,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const Terms = () => {
  const baseUrl = 'http://487346.msk-kvm.ru:3333'

  const [terms, setTerms] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  const [btnSearchClick, setBtnSearchClick] = React.useState(0)
  useEffect(() => {
    let url = `${baseUrl}/terms?`
    if (searchText != null && searchText.length > 0) {
      url += 'q=' + searchText
    }
    fetch(url, {
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
        setTerms(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [btnSearchClick])

  const termsRows =
    terms == null
      ? null
      : terms.map((value, index) => {
          return (
            <CTableRow key={index}>
              <CTableDataCell>{value.name}</CTableDataCell>
              <CTableDataCell>{value.definition}</CTableDataCell>
            </CTableRow>
          )
        })

  return (
    <AppHeaderReduced>
      <CCol xs={11} className="ms-4">
        <h3>Глоссарий</h3>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            placeholder="Поиск"
            autoComplete="termSearch"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />
          <CButton
            onClick={(e) => {
              setBtnSearchClick(btnSearchClick + 1)
            }}
          >
            Поиск
          </CButton>
        </CInputGroup>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell>Описание</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>{termsRows}</CTableBody>
        </CTable>
      </CCol>
    </AppHeaderReduced>
  )
}

export default Terms
