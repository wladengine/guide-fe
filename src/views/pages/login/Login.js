import React, { useContext } from 'react'
import AuthContext from '../../../components/AuthContext'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AppHeaderAdmin from '../../../components/AppHeaderAdmin'

const Login = () => {
  const [authToken, setAuthToken] = useContext(AuthContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const makeAuth = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/javascript' },
      body: `{ "Email": "${email}", "Pass": "${password}" }`,
      redirect: 'follow',
    }
    fetch('http://62.3.58.179:3333/login', requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert('Error while auth')
          return null
        }
        return response.json()
      })
      .then((data) => {
        setAuthToken(data.Token)
        document.cookie = `authToken=${data.Token}`
        console.log(authToken)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <AppHeaderAdmin>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol lg={6} md={8} sm={12}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Вход на сайт</h1>
                      <p className="text-medium-emphasis">Ваши учётные данные</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Имя пользователя"
                          autoComplete="username"
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Пароль"
                          autoComplete="current-password"
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={makeAuth}>
                            Войти
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Забыли пароль?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </AppHeaderAdmin>
  )
}

export default Login
