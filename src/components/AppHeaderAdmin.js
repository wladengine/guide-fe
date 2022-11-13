import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavItem, CNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logo } from '../assets/brand/logo'
import React from 'react'

// eslint-disable-next-line react/prop-types
const AppHeaderAdmin = ({ children }) => {
  return (
    <>
      <CHeader>
        <CContainer fluid>
          <CHeaderBrand to="/">
            <h4>
              <CIcon icon={logo} height={32} alt="Logo" />
              Информационно-аналитическая система «Интерактивный справочник инвестора в публичные
              сферы»
            </h4>
          </CHeaderBrand>
          <CHeaderNav className="d-md-flex me-auto">
            <CNavItem>
              <CNavLink href="./#/start">На основной сайт</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/documents-list">Документы</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/parameter-list">Параметры</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/feature-list">Характеристики</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/login">Вход</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      {children}
    </>
  )
}

export default AppHeaderAdmin
