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
const Article = React.lazy(() => import('./views/pages/article/Article'))
const DocumentsList = React.lazy(() => import('./views/pages/document-list/DocumentList'))

const App = () => {
  const [authToken, setAuthToken] = React.useState(null)
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={<Login setAuthToken={setAuthToken} />}
            />
            <Route exact path="/document" name="Документ" element={<Document id={-1} />} />
            <Route exact path="/article" name="Статья" element={<Article id={-1} />} />
            <Route
              exact
              path="/documents-list"
              name="Документы"
              element={<DocumentsList id={-1} />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DocumentsList />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App
