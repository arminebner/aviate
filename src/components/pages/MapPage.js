import React from 'react'
import MapElement from '../function/MapElement'
import Dashboard from '../function/Dashboard'
import '../css/mappage.css'

const MapPage = () => {
    return (
        <div className='mappage-wrapper'>
           <MapElement /> 
           <Dashboard />
        </div>
    )
}

export default MapPage
