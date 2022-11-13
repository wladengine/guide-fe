import React from 'react'
import AppHeaderReduced from '../../../components/AppHeaderReduced'

const Map = () => {
  return (
    <AppHeaderReduced>
      <iframe src={'map.html'} style={{ width: 600, height: 500 }}></iframe>
    </AppHeaderReduced>
  )
}

export default Map
