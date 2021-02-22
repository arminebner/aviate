import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../global/DataContext'
import airports from 'airport-data'
import '../css/dashboard.css'
import arminLogo from '../../img/logos/garmin.svg'
import loader from '../../img/Icons/ajax-loader.gif'
import placeholderImage from '../../img/fullHD/placeholder-aircraft.png'

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
		showPastFlights,
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
	const [link, setLink] = useState('')
	const [showFlightHistory, setShowFlightHistory] = showPastFlights
	const [maximized, setMaximized] = useState(true)
	const [historyLoading, setHistoryLoading] = useState(false)
	const [tempFlightHistory, showTempFlightHistory] = useState([
		{
			firstSeen: 1612828311,
			lastSeen: 1612834311,
			estDepartureAirport: 'EDDK',
			estArrivalAirport: 'EHAM',
		},
		{
			firstSeen: 1612828311,
			lastSeen: 1612834311,
			estDepartureAirport: 'EDDF',
			estArrivalAirport: 'KORD',
		},
		{
			firstSeen: 1612828311,
			lastSeen: 1612834311,
			estDepartureAirport: 'KJFK',
			estArrivalAirport: 'ZGSZ',
		},
	])

	useEffect(() => {
		const fetchPicture = hexCode => {
			fetch(`https://aviate-backend.herokuapp.com/image/${hexCode}`)
				.then(result => result.json())
				.then(resJson => [
					setPhotographer(resJson.data.photos[0].photographer),
					setPicture(resJson.data.photos[0].thumbnail_large.src),
					setLink(resJson.data.photos[0].link),
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
		setMaximized(true)
		//setPicture(null) to placeholder-image
	}

	const maximizeHandler = () => {
		setMaximized(false)
	}

	const glareshieldToggleHandler = () => {
		setMaximized(true)
	}

	const fetchHistory = hexCode => {
		setHistoryLoading(true)
		let begin = Math.floor(new Date().getTime() / 1000.0) - 259200
		let end = Math.floor(new Date().getTime() / 1000.0)
		console.log('getHistory')
		console.log(hexCode)
		setShowFlightHistory(true)

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
				selectedTraffic && maximized ? 'showing' : ''
			}`}>
			<div
				onClick={glareshieldToggleHandler}
				className={`glareshield ${
					!maximized ? 'glareshield-showing' : ''
				}`}>
				extend
			</div>
			<div className='dashboard'>
				<div className='dashboard-data'>
					<div className='general-data'>
						<div className='first-row'>
							<div className='aircraft-image'>
								<a href={link}>
									<img
										src={
											picture ? picture : placeholderImage
										}
										alt='none available'
										target='_blank'
										rel='noreferrer'></img>
								</a>
								{picture ? (
									<p>
										&copy;{photographer} |{' '}
										<a
											href='https://www.planespotters.net/'
											target='_blank'
											rel='noreferrer'>
											Planespotters.net
										</a>
									</p>
								) : (
									''
								)}
							</div>
							<div className='first-row-buttons'>
								<a
									href='https://www.arminebner.com'
									target='_blank'
									rel='noreferrer'>
									<div className='armin-logo'>
										Avionics by:
										<img src={arminLogo} alt='armin-logo' />
									</div>
								</a>
								{follow ? (
									<p
										onClick={e => setFollow(false)}
										className='follow-mode unfollow'>
										unfollow
									</p>
								) : (
									<p
										onClick={e => setFollow(true)}
										className='follow-mode follow'>
										follow me!
									</p>
								)}
							</div>
						</div>
						<div className='second-row'>
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
									{(returnUpdated()[0][9] * 3.6).toFixed(2)}{' '}
									Km/h
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
							{!showFlightHistory ? (
								<div
									className='flight-history-button'
									onClick={e =>
										fetchHistory(returnUpdated()[0][0])
									}>
									Flight History
								</div>
							) : (
								<div className='flight-history'>
									<p className='fetch-history'>
										<span className='current-aircraft-headline'>
											Flight-History
										</span>
									</p>
									{!flightHistory ? (
										<>
											<div className='loading-spinner'>
												<img
													src={loader}
													alt='loading-spinner'
												/>
											</div>
											<div className='prefilled-flights'>
												{tempFlightHistory.map(item => (
													<div className='flights'>
														<div className='date-location'>
															<p>
																FROM:{' '}
																<span
																	onClick={e =>
																		changeLocation(
																			item.estDepartureAirport
																		)
																	}
																	className='location'>
																	{
																		item.estDepartureAirport
																	}
																</span>
															</p>
															<p>
																@
																{new Date(
																	item.firstSeen *
																		1000
																).toLocaleDateString()}
															</p>
														</div>
														<div className='date-location'>
															<p>
																TO:{' '}
																<span
																	onClick={e =>
																		changeLocation(
																			item.estArrivalAirport
																		)
																	}
																	className='location'>
																	{
																		item.estArrivalAirport
																	}
																</span>
															</p>
															<p>
																{new Date(
																	item.lastSeen *
																		1000
																).toLocaleDateString()}
															</p>
														</div>
													</div>
												))}
											</div>
										</>
									) : (
										flightHistory.map(flight => (
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
															{
																flight.estDepartureAirport
															}
														</span>
													</p>
													<p>
														@
														{new Date(
															flight.firstSeen *
																1000
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
															{
																flight.estArrivalAirport
															}
														</span>
													</p>
													<p>
														{new Date(
															flight.lastSeen *
																1000
														).toLocaleDateString()}
													</p>
												</div>
											</div>
										))
									)}
								</div>
							)}
						</div>

						<div className='controlls-container'>
							<div
								onClick={maximizeHandler}
								className='controlls minimize'>
								__
							</div>
							<div
								onClick={closeHandler}
								className='controlls close'>
								X
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
