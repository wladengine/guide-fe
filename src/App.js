import React, { Component, Suspense } from 'react'
import AuthContext from './components/AuthContext'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Document = React.lazy(() => import('./views/pages/document/Document'))
const Feature = React.lazy(() => import('./views/pages/feature/Feature'))
const Article = React.lazy(() => import('./views/pages/article/Article'))
const Segment = React.lazy(() => import('./views/pages/segment/Segment'))
const Parameter = React.lazy(() => import('./views/pages/parameter/Parameter'))
const DocumentsList = React.lazy(() => import('./views/pages/document-list/DocumentList'))
const FeatureList = React.lazy(() => import('./views/pages/feature-list/FeatureList'))
const ParameterList = React.lazy(() => import('./views/pages/parameter-list/ParameterList'))
const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Start = React.lazy(() => import('./views/pages/start/Start'))

const App = () => {
  let token = getCookie('authToken')
  const authToken = React.useState(token)
  return (
    <AuthContext.Provider value={authToken}>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/document" name="Документ" element={<Document id={-1} />} />
            <Route exact path="/feature" name="Характеристика" element={<Feature id={-1} />} />
            <Route exact path="/parameter" name="Характеристика" element={<Parameter id={-1} />} />
            <Route exact path="/article" name="Статья" element={<Article id={-1} />} />
            <Route exact path="/segment" name="Абзац" element={<Segment id={-1} />} />
            <Route
              exact
              path="/documents-list"
              name="Документы"
              element={<DocumentsList id={-1} />}
            />
            <Route
              exact
              path="/feature-list"
              name="Характеристики"
              element={<FeatureList id={-1} />}
            />
            <Route
              exact
              path="/parameter-list"
              name="Характеристики"
              element={<ParameterList id={-1} />}
            />
            <Route exact path="/dashboard" name="Витрина" element={<Dashboard />} />
            <Route exact path="/start" name="Витрина" element={<Start />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<Start />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthContext.Provider>
  )
}

function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default App
