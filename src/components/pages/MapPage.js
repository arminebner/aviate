import React from 'react'
import MapElement from '../function/MapElement'
import Dashboard from '../function/Dashboard'
import DashboardAirport from '../function/DashboardAirport'
import Menu from '../function/Menu'
import '../css/mappage.css'

const MapPage = () => {
	return (
		<div className='mappage-wrapper'>
			<MapElement />
			<Dashboard />
			<DashboardAirport />
			<Menu />
		</div>
	)
}

export default MapPage
