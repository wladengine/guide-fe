//import React from 'react'

//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', exact: true, name: 'Login' },
  { path: '/document', exact: true, name: 'Documents' },
  { path: '/documents-list', exact: true, name: 'DocumentList' },
  { path: '/article', exact: true, name: 'Article' },
  //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
