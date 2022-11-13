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

const Parameter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [groups, setGroups] = React.useState(null)

  const [authToken] = useContext(AuthContext)

  const baseUrl = 'http://487346.msk-kvm.ru:3333'
  const [isSuccessfullySaved, setIsSuccessfullySaved] = React.useState(false)
  const [isMessageUnauthorized, setIsMessageUnauthorized] = React.useState(false)
  const saveParameter = () => {
    const reqBody = {
      name: name,
      group: parseInt(group),
    }
    const reqJSON = JSON.stringify(reqBody)
    const isPOST = (id ?? -1) <= 0
    const requestOptions = {
      method: isPOST ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/javascript', token: authToken },
      body: reqJSON,
      redirect: 'follow',
    }
    const fetchUrl = isPOST ? `${baseUrl}/parameters` : `${baseUrl}/parameters/${id}`
    fetch(fetchUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status == '401') {
            setIsMessageUnauthorized(true)
          }
          console.log(response)
          console.log(response.status)
          alert('Error while save article')
          return null
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setIsSuccessfullySaved(true)
        setTimeout(setIsSuccessfullySaved, 5 * 1000, false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    fetch(`http://487346.msk-kvm.ru:3333/parameters/${id}`, {
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
        setName(data.name)
        setGroup(data.group.id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  // useEffect(() => {
  //   fetch(`http://487346.msk-kvm.ru:3333/segments`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //   })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       //setGroups(data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }, [])
  useEffect(() => {
    setGroups([
      {
        id: 1,
        name: 'Общие характеристики инструмента',
      },
      {
        id: 2,
        name: 'Описание требований к субъектам, участвующим в реализации инструмента',
      },
      {
        id: 3,
        name: 'Сферы, в которые возможно инвестировать в рамках инструмента. Объекты соглашений ',
      },
      {
        id: 4,
        name: 'Содержание соглашений',
      },
      {
        id: 5,
        name: 'Полномочия публичных субъектов по регулированию правоотношений, возникающих при использовании инструментов',
      },
      {
        id: 6,
        name: 'Характеристики этапов принятия решений при заключении соглашений ',
      },
      {
        id: 7,
        name: 'Характеристика конкурсных процедур',
      },
      {
        id: 8,
        name: 'Права и обязанности сторон при реализации соглашений',
      },
      {
        id: 9,
        name: 'Гарантии и преференции инвесторов',
      },
      {
        id: 10,
        name: 'Изменение и прекращение действия соглашений',
      },
      {
        id: 11,
        name: 'Контроль за исполнением и ответственность за ненадлежащее исполнение, рассмотрение споров',
      },
      {
        id: 12,
        name: 'Cоздание и фунционирование территорий со специальными режимами для инвесторов',
      },
      {
        id: 13,
        name: 'Управление территориями со специальными режимами для инвесторов',
      },
      {
        id: 14,
        name: 'Информационное обеспечение реализации инструмента',
      },
      {
        id: 15,
        name: 'Специальные характеристики инструмента ',
      },
    ])
  }, [])

  const [name, setName] = React.useState('')
  const [group, setGroup] = React.useState(-1)

  const optionsGroups =
    groups == null ? (
      <></>
    ) : (
      groups.map((val, index) => {
        return (
          <option key={index} value={val.id}>
            {val.name}
          </option>
        )
      })
    )
  return (
    <AppHeaderAdmin>
      <CContainer>
        <CRow>
          <CCol lg={12} md={12} sm={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./#/parameter-list">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {name}
                    </li>
                  </ol>
                  <CForm action={'./document'} method={'post'}>
                    <h1>Документ</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilHeader} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Название документа"
                        autoComplete="document_name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <select
                        className="form-select"
                        value={group}
                        defaultValue={-1}
                        onChange={(e) => {
                          setGroup(e.target.value)
                        }}
                        aria-label="Default select example"
                      >
                        <option value={-1}>Выберите значение...</option>
                        {optionsGroups}
                      </select>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={saveParameter}>
                          Сохранить
                        </CButton>
                      </CCol>
                    </CRow>
                    {isSuccessfullySaved ? (
                      <CRow className="mt-3">
                        <CCol xs={12}>
                          <div className="alert alert-success" role="alert">
                            Сохранено
                          </div>
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}
                    {isMessageUnauthorized ? (
                      <CRow className="mt-3">
                        <CCol xs={12}>
                          <div className="alert alert-danger" role="alert">
                            Пользователь не аутентифицирован. <br />
                            <a href={'./#/login'} className={'alert-link'}>
                              Войти
                            </a>
                          </div>
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </AppHeaderAdmin>
  )
}

export default Parameter
