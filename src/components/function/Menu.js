import React, { useState, useContext } from 'react'
import airports from 'airport-data'
import { DataContext } from '../../global/DataContext'
import '../css/menu.css'

const Menu = () => {
	const { airportIcons, newLocation, nearest, change, winddata } = useContext(
		DataContext
	)
	const [showAirports, setShowAirports] = airportIcons
	const [location, setLocation] = newLocation
	const [nearestAirport, setNearestAirport] = nearest
	const [locationChanged, setLocationChanged] = change
	const [showWindMap, setShowWindMap] = winddata

	const [airportInput, setAirportInput] = useState(null)

	const toggleAirports = () => setShowAirports(!showAirports)
	const toggleWindMap = () => setShowWindMap(!showWindMap)

	const airportUserInput = e => {
		const airportTemp = e.target.value.toUpperCase()
		setAirportInput(airportTemp)
	}

	const airportSet = e => {
		e.preventDefault()
		if (airportInput) {
			const [location] = airports.filter(
				items => items.icao === airportInput
			)
			setLocation(location)
			setLocationChanged(true)
			findNearestAirports(location)
		}
	}

	const findNearestAirports = location => {
		//round numbers to closest integer
		const roundedLat = Math.round(location.latitude)
		const roundedLong = Math.round(location.longitude)

		//round lat and filter with rounded long
		const roundedLatArr = airports.filter(
			item => Math.round(item.latitude) === roundedLat
		)
		const roundedLatArr_roundedLong = roundedLatArr.filter(
			item => Math.round(item.longitude) === roundedLong
		)
		setNearestAirport(roundedLatArr_roundedLong)

		/*   const  roundedLatArr_roundedLongUp = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const  roundedLatArr_roundedLongDown = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat up
        const  roundedLatArrUp = airports.filter(item => Math.round(item.latitude) === roundedLat + 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrUp_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrUp_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrUp_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat down
        const  roundedLatArrDown = airports.filter(item => Math.round(item.latitude) === roundedLat - 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrDown_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrDown_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrDown_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

       const final = [...roundedLatArr_roundedLong, ...roundedLatArr_roundedLongUp, ...roundedLatArr_roundedLongDown, ...roundedLatArrUp_roundedLong, ...roundedLatArrUp_roundedLongUp, ...roundedLatArrUp_roundedLongDown, ...roundedLatArrDown_roundedLong, ...roundedLatArrDown_roundedLongUp, ...roundedLatArrDown_roundedLongDown] */

		// console.log(roundedLatArr_roundedLong);
	}

	return (
		<div className='menu-container'>
			<div className='menu-item toggle-airports' onClick={toggleAirports}>
				Toggle Airports
			</div>
			<div className='menu-item toggle-windmap' onClick={toggleWindMap}>
				Toggle Windmap
			</div>
			<div className='menu-item new-location'>
				<form className='set-airport-form-menu'>
					<input
						className='menu-item location-input'
						onChange={airportUserInput}
						type='text'
						placeholder='set airport to (ICAO)'></input>
					<button
						className='menu-item location-button'
						onClick={airportSet}>
						setNewLocation
					</button>
				</form>
			</div>
		</div>
	)
}

export default Menu
