import React from 'react'
import {
  CContainer,
  CHeader,
  CHeaderToggler,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logo } from '../../../assets/brand/logo'
import { useSelector, useDispatch } from 'react-redux'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

const Start = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CHeader>
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={null} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink href="./#/start">Главная</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="./#/dashboard">Витрина</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
      <div className={'mt-4 me-4 mb-4 ms-4'}>
        <p>
          Повышение доверия частных инвесторов к совместным проектам с участием государственных
          субъектов в публичных целях – одна из важных публичных задач. Открытость и понятность
          административных процедур в рамках разных инвестиционных инструментов на всех уровнях
          власти от федерального до муниципального оказывает влияние на рост инвестиционной
          активности.
        </p>
        <p>
          В действующем законодательстве установлены разные правовые инструменты взаимодействия
          частных инвесторов и органов публичного управления в связи с инвестированием в сферы,
          отнесенные к ведению органов публичного управления, однако выбор оптимальной модели с
          точки зрения инвестора и одновременно достижения публичных задач органами управления
          предполагает сопоставление правовых инструментов по разным основаниям.
        </p>
        <p>
          Функционал ИАС «Интерактивный справочник инвестора в публичные сферы» позволит сравнивать
          инструменты привлечения частных инвестиций по срокам, по количеству и содержанию
          документов, необходимых для оформления сотрудничества, по преференциям, получаемым
          инвестором в рамках сотрудничества с публичным субъектом, по системе публичного управления
          в рамках моделей сотрудничества и другим критериям, позволяющим оценить привлекательность
          инструментов для инвесторов.
        </p>
        <p>
          ИАС снабжена также вспомогательными разделами: Глоссарий, карта размещения ИНТЦ, ОЭЗ,
          ТОСЭР.
        </p>
        <p>
          Использование данной ИАС может быть актуально для юридических и физических лиц,
          заинтересованных в инвестировании в сферы, связанные с реализацией публичных задач, и
          готовых к сотрудничеству с органами публичного управления, а также, для органов публичной
          власти, в чью компетенцию входит развитие регионов, отраслей экономики или привлечение
          инвестиций.
        </p>
        <p>
          Данные, размещенные в ИАС, являются актуальными и могут использоваться в подготовке
          аналитических материалов, в совершенствовании правового регулирования, оказании
          консультационных и экспертных услуг инвесторам, органам публичной власти.
        </p>
      </div>
    </>
  )
}

export default Start
