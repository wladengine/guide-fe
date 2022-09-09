import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export const items = [
  {
    id: 1,
    name: 'ФЗ №111',
    date: '01.05.2020',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet, odio sit amet ullamcorper sollicitudin, nisi mi mattis nunc, non bibendum dolor magna eu justo. Cras placerat eros eu efficitur pretium. Fusce id ante sit amet ante condimentum dignissim ac vel ante. Phasellus dapibus eros nec nibh bibendum, ac volutpat arcu venenatis. Quisque dignissim enim erat, eu malesuada velit euismod sed. Curabitur molestie nunc sit amet leo accumsan, quis mattis sapien tempor. Phasellus semper dapibus aliquet. Proin et ipsum quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis est non egestas ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '\n',
    _cellProps: { id: { scope: 'row' } },
  },
  {
    id: 2,
    name: 'ФЗ №222',
    date: '01.09.2021',
    description:
      'Nullam eget est aliquam, porttitor tortor ac, bibendum nisl. Praesent sed urna mi. Ut libero turpis, facilisis ac neque ac, suscipit tincidunt urna. Aliquam lobortis turpis id sapien lobortis lacinia. Morbi tincidunt leo eget libero efficitur rutrum. Vestibulum varius ac metus elementum mattis. Aenean rhoncus eu nisl vitae euismod. Sed semper mollis venenatis. Morbi non finibus mauris. Sed diam ex, gravida at nunc eu, placerat congue quam. Nulla vitae quam at dui condimentum lobortis. Morbi mattis bibendum congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque vitae tellus a metus auctor posuere. Cras sagittis accumsan tellus, in blandit velit dignissim sed. Integer pretium vestibulum dui, id tristique diam.\n' +
      '\n',
    _cellProps: { id: { scope: 'row' } },
  },
  {
    id: 3,
    name: 'ФЗ №333',
    date: '01.04.2022',
    description:
      'Sed eu mattis enim. Donec fermentum quis enim non suscipit. Sed egestas dolor quis dui vestibulum, at dictum ipsum vehicula. Cras est ex, pulvinar sed massa sollicitudin, volutpat elementum augue. Vivamus tempor ornare nulla, in suscipit dui luctus non. Curabitur convallis at ipsum ac maximus. In hac habitasse platea dictumst. Sed tincidunt, metus rutrum laoreet suscipit, leo orci sollicitudin nulla, ut accumsan mi diam eu massa. Mauris efficitur mattis dolor, eget blandit tellus pretium at.\n' +
      '\n',
    _cellProps: { id: { scope: 'row' } },
  },
  {
    id: 4,
    name: 'ФЗ №333/2',
    date: '02.04.2022',
    description:
      'In hac habitasse platea dictumst. Nam sed mi ipsum. Quisque mattis ut dolor a mollis. Donec luctus lacus nulla, vitae pharetra ante gravida ac. Donec egestas ipsum non erat mollis, et rhoncus nulla tincidunt. Donec aliquam auctor tortor eu sodales. In egestas nunc risus, ac porta nibh pretium sed. Vestibulum dignissim erat ultrices dapibus hendrerit. Nullam at augue et orci imperdiet cursus. Cras tincidunt lectus orci, non auctor enim volutpat ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet purus sodales, vehicula lacus in, vulputate eros.\n' +
      '\n',
    _cellProps: { id: { scope: 'row' } },
  },
]

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Document = React.lazy(() => import('./views/pages/document/Document'))
const DocumentsList = React.lazy(() => import('./views/pages/document-list/DocumentList'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/document" name="Документ" element={<Document id={-1} />} />
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
    )
  }
}

export default App
