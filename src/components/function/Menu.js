import React, { useState, useContext, useEffect } from 'react'
import airports from 'airport-data'
import { DataContext } from '../../global/DataContext'
import '../css/menu.css'

const Menu = () => {
	const {
		airportIcons,
		newLocation,
		nearest,
		change,
		winddata,
		selectedAircraft,
		compass,
		allTraffic,
	} = useContext(DataContext)
	const [showAirports, setShowAirports] = airportIcons
	const [selectedTraffic, setSelectedTraffic] = selectedAircraft
	const [location, setLocation] = newLocation
	const [nearestAirport, setNearestAirport] = nearest
	const [locationChanged, setLocationChanged] = change
	const [showWindMap, setShowWindMap] = winddata
	const [showCompass, setShowCompass] = compass
	const [timer, setTimer] = useState()
	const [traffic, setTraffic] = allTraffic
	const [airportInput, setAirportInput] = useState(null)

	useEffect(() => {
		setTimer(0)
		setTime()
	}, [traffic])

	const setTime = () => {
		let time = 20
		setInterval(() => {
			if (time > 0) {
				time--
				setTimer(time)
			}
		}, 1000)
	}

	const toggleAirports = () => setShowAirports(!showAirports)
	const toggleWindMap = () => setShowWindMap(!showWindMap)
	const toggleCompass = () => setShowCompass(!showCompass)

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
			setSelectedTraffic(false)
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
						set new location
					</button>
				</form>
			</div>
			<div className='timer'>Timer: {timer}</div>
		</div>
	)
}

export default Menu
