import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../global/DataContext'
import airports from 'airport-data'
import '../css/dashboard.css'

const Dashboard = () => {
	const {
		selectedAircraft,
		allTraffic,
		aircraftImage,
		newLocation,
		nearest,
		change,
		followMode,
		history,
	} = useContext(DataContext)
	const [selectedTraffic, setSelectedTraffic] = selectedAircraft
	const [traffic, setTraffic] = allTraffic
	const [picture, setPicture] = aircraftImage
	const [location, setLocation] = newLocation
	const [nearestAirport, setNearestAirport] = nearest
	const [locationChanged, setLocationChanged] = change
	const [follow, setFollow] = followMode
	const [flightHistory, setFlightHistory] = history
	const [photographer, setPhotographer] = useState('')

	useEffect(() => {
		let myHeaders = new Headers()
		myHeaders.append('x-auth-token', process.env.REACT_APP_ACCESS_TOKEN)

		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		}

		const fetchPicture = hexCode => {
			fetch(
				`https://api.planespotters.net/v1/photos/hex/${hexCode}`,
				requestOptions
			)
				.then(result => result.json())
				.then(resJson => [
					setPhotographer(resJson.photos[0].photographer),
					setPicture(resJson.photos[0].thumbnail_large.src),
				])
				.catch(error => console.log('error', error))
		}
		fetchPicture(selectedTraffic[0])
	}, [selectedTraffic])

	const returnUpdated = () => {
		//here bugfix for transponder to off-position ((selectedTraffic &&  selectedTraffic[0][1] != undefined or so ))
		if (selectedTraffic && selectedTraffic[1] !== undefined) {
			let updatedTemp = traffic.filter(
				aircraft => aircraft[0] === selectedTraffic[0]
			)
			return updatedTemp
		}
		//here bugfix for transponder to off-position (elseif (!selectedTraffic || selectedTraffic[0] === undefined ))
		else {
			let initialTemp = [
				[1, 0],
				[2, 0],
				[9, 0],
				[10, 0],
				[13, 0],
			]
			return initialTemp
		}
	}

	const closeHandler = () => {
		setSelectedTraffic(false)
		setFollow(false)
		//setPicture(null) to placeholder-image
	}

	const fetchHistory = hexCode => {
		let begin = Math.floor(new Date().getTime() / 1000.0) - 259200
		let end = Math.floor(new Date().getTime() / 1000.0)
		console.log('getHistory')
		console.log(hexCode)

		const header = {
			Authorization: `Basic ${btoa(process.env.REACT_APP_OPEN_SKY)}`,
		}

		fetch(
			`https://opensky-network.org/api/flights/aircraft?icao24=${hexCode}&begin=${begin}&end=${end}`,
			header
		)
			.then(result => result.json())
			.then(resJson => setFlightHistory(resJson))
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

	useEffect(() => {
		if (follow) {
			const location = {
				latitude: returnUpdated()[0][6],
				longitude: returnUpdated()[0][5],
			}
			setLocation(location)
			setLocationChanged(true)
		}
	}, [traffic])

	return (
		<div
			className={`dashboard-container ${
				selectedTraffic ? 'showing' : ''
			}`}>
			<div
				onClick={closeHandler}
				className={`${selectedTraffic ? 'glareshield' : ''}`}>
				close
			</div>
			<div className='dashboard'>
				<div className='dashboard-data'>
					<div className='general-data'>
						<div className='aircraft-image'>
							<img src={picture} alt='none available'></img>
							<p>
								&copy;{photographer} |{' '}
								<a href='https://www.planespotters.net/'>
									Planespotters.net
								</a>
							</p>
						</div>
						{follow ? (
							<p
								onClick={e => setFollow(false)}
								className='unfollow'>
								<span className='current-details-headline'>
									UNFOLLOW
								</span>
							</p>
						) : (
							<p
								onClick={e => setFollow(true)}
								className='follow-me'>
								<span className='current-details-headline'>
									FOLLOW ME!
								</span>
							</p>
						)}
						<div className='current-position-info'>
							<p>
								<span className='current-aircraft-headline'>
									Callsign: {returnUpdated()[0][1]}
								</span>
							</p>
							<p>
								<span className='current-aircraft-info'>
									Origin:{' '}
								</span>
								{returnUpdated()[0][2]}
							</p>
							<p>
								<span className='current-aircraft-info'>
									Speed Knts:{' '}
								</span>{' '}
								{(returnUpdated()[0][9] * 1.944).toFixed(2)}{' '}
								Knots
							</p>
							<p>
								<span className='current-aircraft-info'>
									Speed Kmh:{' '}
								</span>{' '}
								{(returnUpdated()[0][9] * 3.6).toFixed(2)} Km/h
							</p>
							<p>
								<span className='current-aircraft-info'>
									Altitude ft:{' '}
								</span>{' '}
								{returnUpdated()[0][13]
									? `${(
											returnUpdated()[0][13] * 3.281
									  ).toFixed(2)} feet`
									: 'on ground'}
							</p>
							<p>
								<span className='current-aircraft-info'>
									Altitude m:{' '}
								</span>{' '}
								{returnUpdated()[0][13]
									? `${returnUpdated()[0][13]} m`
									: 'on ground'}
							</p>
							<p>
								<span className='current-aircraft-info'>
									Track:{' '}
								</span>
								{Math.ceil(returnUpdated()[0][10])} degrees
							</p>
						</div>
						<div className='flight-history'>
							<p
								className='fetch-history'
								onClick={e =>
									fetchHistory(returnUpdated()[0][0])
								}>
								<span className='current-aircraft-headline'>
									Flight-History (last 3 days)
								</span>
							</p>
							{flightHistory.map(flight => (
								<div className='flights'>
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

export default Dashboard
