import React from 'react'
import MapElement from '../function/MapElement'
import Dashboard from '../function/Dashboard'
import Menu from '../function/Menu'
import '../css/mappage.css'

const MapPage = () => {
    return (
        <div className='mappage-wrapper'>
           <MapElement /> 
           <Dashboard />
           <Menu />
        </div>
    )
}

export default MapPage
