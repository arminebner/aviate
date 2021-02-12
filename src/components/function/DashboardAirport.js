import React, { useState, useContext, useEffect } from 'react'
import airports from 'airport-data'
import { DataContext } from '../../global/DataContext'
import '../css/dashboard-airport.css'

const DashboardAirport = () => {
	const {
		selectedAirport,
		newLocation,
		nearest,
		change,
		departures,
		arrivals,
	} = useContext(DataContext)
	const [airport, setAirport] = selectedAirport
	const [weather, setWeather] = useState()
	//const [arrivals, setArrivals] = useState()
	const [depHistory, setDepHistory] = departures
	const [arrHistory, setArrHistory] = arrivals
	const [location, setLocation] = newLocation
	const [nearestAirport, setNearestAirport] = nearest
	const [locationChanged, setLocationChanged] = change

	useEffect(() => {
		const fetchWeather = airport => {
			let requestOptions = {
				method: 'GET',
			}

			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${airport.city}&units=metric&appid=${process.env.REACT_APP_OWM_API_KEY}`,
				requestOptions
			)
				.then(result => result.json())
				.then(resJson => setWeather(resJson))
				.catch(error => console.log('error', error))
		}
		if (airport) {
			fetchWeather(airport)
		}
	}, [airport])

	const returnUpdated = () => {
		//here bugfix for transponder to off-position ((selectedTraffic &&  selectedTraffic[0][1] != undefined or so ))
		if (weather) {
			return weather
		}
		//here bugfix for transponder to off-position (elseif (!selectedTraffic || selectedTraffic[0] === undefined ))
		else {
			let initialTemp = {
				weather: [{ description: 'no weather-data', icon: '10d' }],
				main: {
					temp: 'no weather-data',
					feels_like: 'no weather-data',
					pressure: 'no weather-data',
				},
				visibility: 'no weather-data',
				wind: {
					deg: 'no weather-data',
					speed: 'no weather-data',
				},
				sys: {
					sunrise: 1612782366,
					sunset: 1612782366,
				},
			}
			return initialTemp
		}
	}

	const closeHandler = () => {
		setAirport(false)
		setWeather(null)
		setArrHistory([])
		setDepHistory([])
	}

	const fetchArrHistory = icao => {
		let begin = Math.floor(new Date().getTime() / 1000.0) - 259200
		let end = Math.floor(new Date().getTime() / 1000.0)
		console.log('getArrHistory')
		console.log(icao)

		const header = {
			Authorization: `Basic ${btoa(process.env.REACT_APP_OPEN_SKY)}`,
		}

		fetch(
			`https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${begin}&end=${end}`,
			header
		)
			.then(result => result.json())
			.then(resJson => setArrHistory(resJson))
			.catch(error => console.log('error', error))
	}

	const fetchDepHistory = icao => {
		let begin = Math.floor(new Date().getTime() / 1000.0) - 259200
		let end = Math.floor(new Date().getTime() / 1000.0)
		console.log('getDepHistory')
		console.log(icao)

		const header = {
			Authorization: `Basic ${btoa(process.env.REACT_APP_OPEN_SKY)}`,
		}

		fetch(
			`https://opensky-network.org/api/flights/departure?airport=${icao}&begin=${begin}&end=${end}`,
			header
		)
			.then(result => result.json())
			.then(resJson => setDepHistory(resJson))
			.catch(error => console.log('error', error))
	}

	const changeLocation = newDest => {
		closeHandler()
		const [location] = airports.filter(items => items.icao === newDest)
		setLocation(location)
		setLocationChanged(true)
		findNearestAirports(location)
	}

	const findNearestAirports = location => {
		const roundedLat = Math.round(location.latitude)
		const roundedLong = Math.round(location.longitude)
		const roundedLatArr = airports.filter(
			item => Math.round(item.latitude) === roundedLat
		)
		const roundedLatArr_roundedLong = roundedLatArr.filter(
			item => Math.round(item.longitude) === roundedLong
		)
		setNearestAirport(roundedLatArr_roundedLong)
	}

	return (
		<div className={`dashboard-container2 ${airport ? 'showing' : ''}`}>
			<div
				onClick={closeHandler}
				className={`${airport ? 'glareshield2' : ''}`}>
				close
			</div>
			<div className='dashboard2'>
				<div className='dashboard-data2'>
					<div className='general-data2'>
						<div className='current-airport-info'>
							<p>
								<span className='current-details-headline'>
									Current Airport
								</span>
							</p>
							<p>
								<span className='current-details'>Name: </span>
								{airport.name}
							</p>
							<p>
								<span className='current-details'>City: </span>
								{airport.city}
							</p>
							<p>
								<span className='current-details'>
									Country:{' '}
								</span>
								{airport.country}
							</p>
							<p>
								<span className='current-details'>
									Icao-Code:{' '}
								</span>
								{airport.icao}
							</p>
							<p>
								<span className='current-details'>
									Iata-Code:{' '}
								</span>
								{airport.iata}
							</p>
							<p>
								<span className='current-details'>
									Altitude:{' '}
								</span>{' '}
								{(airport.altitude / 3.28084).toFixed(0)} m
							</p>
						</div>
						<div className='current-airport-weather'>
							<p>
								<span className='current-details-headline'>
									Current Weather{' '}
								</span>
							</p>
							<img
								src={`http://openweathermap.org/img/wn/${
									returnUpdated().weather[0].icon
								}@2x.png`}
								alt='weather-indicator-icon'
							/>
							<p>
								<span className='current-details'>
									Description:{' '}
								</span>{' '}
								{returnUpdated().weather[0].description}
							</p>
							<p>
								<span className='current-details'>
									Temperature:{' '}
								</span>
								{returnUpdated().main.temp} °C
							</p>
							<p>
								<span className='current-details'>
									Feels like:{' '}
								</span>
								{returnUpdated().main.feels_like} °C
							</p>
							<p>
								<span className='current-details'>
									Airpressure:{' '}
								</span>
								{returnUpdated().main.pressure} hPa
							</p>
							<p>
								<span className='current-details'>
									Visibility:{' '}
								</span>
								{returnUpdated().visibility}
							</p>
							<p>
								<span className='current-details'>Wind: </span>
								{returnUpdated().wind.speed} m/s{' '}
								{returnUpdated().wind.deg} deg
							</p>
						</div>
						<div className='arrival-history'>
							<p
								className='current-details-headline'
								onClick={e => fetchArrHistory(airport.icao)}>
								Arrival-History
							</p>
							{arrHistory.map(flight => (
								<div className='arrivals'>
									<p>{flight.callsign}</p>
									<div className='date-location'>
										<p>
											FROM:{' '}
											<span
												onClick={e =>
													changeLocation(
														flight.estDepartureAirport
													)
												}
												className='location'>
												{flight.estDepartureAirport}
											</span>
										</p>
										<p>
											@
											{new Date(
												flight.firstSeen * 1000
											).toLocaleDateString()}
										</p>
									</div>
									<div className='date-location'>
										<p>
											TO:{' '}
											<span
												onClick={e =>
													changeLocation(
														flight.estArrivalAirport
													)
												}
												className='location'>
												{flight.estArrivalAirport}
											</span>
										</p>
										<p>
											{new Date(
												flight.lastSeen * 1000
											).toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className='departure-history'>
							<p
								className='current-details-headline'
								onClick={e => fetchDepHistory(airport.icao)}>
								Departure-History
							</p>
							{depHistory.map(flight => (
								<div className='departures'>
									<p>{flight.callsign} </p>
									<div className='date-location'>
										<p>
											FROM:{' '}
											<span
												onClick={e =>
													changeLocation(
														flight.estDepartureAirport
													)
												}
												className='location'>
												{flight.estDepartureAirport}
											</span>
										</p>
										<p>
											@
											{new Date(
												flight.firstSeen * 1000
											).toLocaleDateString()}
										</p>
									</div>
									<div className='date-location'>
										<p>
											TO:{' '}
											<span
												onClick={e =>
													changeLocation(
														flight.estArrivalAirport
													)
												}
												className='location'>
												{flight.estArrivalAirport}
											</span>
										</p>
										<p>
											{new Date(
												flight.lastSeen * 1000
											).toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardAirport
