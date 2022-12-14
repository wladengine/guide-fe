import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavItem, CNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logo } from '../assets/brand/logo'
import React from 'react'

// eslint-disable-next-line react/prop-types
const AppHeaderReduced = ({ children }) => {
  return (
    <>
      <CHeader>
        <CContainer fluid>
          <CHeaderBrand to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
            <b>
              Информационно-аналитическая система «Интерактивный справочник инвестора в публичные
              сферы»
            </b>
          </CHeaderBrand>
          <CHeaderNav className="d-md-flex me-auto">
            <CNavItem>
              <CNavLink href="./#/start">Главная</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/dashboard">Сравнение инвест.инструментов</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/terms">Глоссарий</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/map">Карта</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/market">ИнвестМаркет</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Контакты</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      {children}
    </>
  )
}

export default AppHeaderReduced
