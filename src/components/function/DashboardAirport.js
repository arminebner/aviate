import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/dashboard-airport.css'

const DashboardAirport = () => {
	const { selectedAirport } = useContext(DataContext)
	const [airport, setAirport] = selectedAirport
	const [weather, setWeather] = useState()

	useEffect(() => {
		let requestOptions = {
			method: 'GET',
		}

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
							<h2>Name: {airport.name}</h2>
							<p>City: {airport.city}</p>
							<p>Country: {airport.country}</p>
							<p>Icao-Code: {airport.icao}</p>
							<p>Iata-Code: {airport.iata}</p>
							<p>
								Altitude:{' '}
								{(airport.altitude / 3.28084).toFixed(0)} m
							</p>
						</div>
						<div className='current-airport-weather'>
							<h2>Current Weather:</h2>
							<img
								src={`http://openweathermap.org/img/wn/${
									returnUpdated().weather[0].icon
								}@2x.png`}
								alt=''
							/>
							<p>
								Description:{' '}
								{returnUpdated().weather[0].description}
							</p>
							<p>Temperature: {returnUpdated().main.temp} °C</p>
							<p>
								Feels like: {returnUpdated().main.feels_like} °C
							</p>
							<p>
								Airpressure: {returnUpdated().main.pressure} hPa
							</p>
							<p>Visibility: {returnUpdated().visibility}</p>
							<p>
								Wind:
								<ul>
									<li>{returnUpdated().wind.speed} m/s</li>
									<li>{returnUpdated().wind.deg} deg</li>
								</ul>
							</p>
							<p>
								Sunrise:{' '}
								{
									new Date(returnUpdated().sys.sunrise * 1000)
										.toLocaleString
								}{' '}
								/ Sunset: {returnUpdated().sys.sunset}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardAirport
