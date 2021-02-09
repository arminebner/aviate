import React, { useContext, useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import {
	MapContainer,
	Marker,
	TileLayer,
	useMap,
	LayersControl,
} from 'react-leaflet'
import { OwnIcon, CustomAirportIcon } from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import { DataContext } from '../../global/DataContext'
import Weather from '../function/Weather'
import '../css/mapelement.css'

const MapElement = () => {
	const {
		selectedAircraft,
		allTraffic,
		airportIcons,
		newLocation,
		nearest,
		change,
		aircraftImage,
		winddata,
		selectedAirport,
	} = useContext(DataContext)
	const [selectedTraffic, setSelectedTraffic] = selectedAircraft
	const [traffic, setTraffic] = allTraffic
	const [showAirports, setShowAirports] = airportIcons
	const [location, setLocation] = newLocation
	const [nearestAirports, setNearestAirports] = nearest
	const [locationChanged, setLocationChanged] = change
	const [picture, setPicture] = aircraftImage
	const [lamin, setLamin] = useState()
	const [lamax, setLamax] = useState()
	const [lomin, setLomin] = useState()
	const [lomax, setLomax] = useState()
	const [firstPaint, setFirstPaint] = useState(true)
	const [showWindMap, setShowWindMap] = winddata
	const [airport, setAirport] = selectedAirport

	const setApiBorders = location => {
		setLamin(location.latitude - 3)
		setLamax(location.latitude + 3)
		setLomin(location.longitude - 3)
		setLomax(location.longitude + 3)
	}

	if (firstPaint) {
		//get location-data from local-storage
		const selectedLocation = JSON.parse(
			localStorage.getItem('selectedLocation')
		)
		//const { latitude, longitude } = selectedLocation
		setLocation(selectedLocation)
		console.log('set location state')
		//set borders for api call to open-sky
		setApiBorders(selectedLocation)
		// setLamin(latitude - 3)
		// setLamax(latitude + 3)
		// setLomin(longitude - 3)
		// setLomax(longitude + 3)
		//get surrounding airports from local storage
		const nearestAirports = JSON.parse(
			localStorage.getItem('nearestAirports')
		)
		setNearestAirports(nearestAirports)
		console.log('set nearest state')
		setFirstPaint(false)
	}

	const fetcher = (...args) => {
		fetch(...args)
			.then(response => response.json())
			.then(responseJson => setTraffic(responseJson.states))
	}

	const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
	const { data, error } = useSWR(url, {
		revalidateOnFocus: false,
		fetcher,
		refreshInterval: 11000,
	})
	//const traffic = data && !error ? data.states : []

	//bad setState
	//setTraffic(trafficTemp)

	const getIcon = iconTrack =>
		//if selectedTraffic, make its icon bigger and blue
		//change said icon or just overlay a bigger icon?
		L.divIcon({
			html: ReactDOMServer.renderToString(<OwnIcon track={iconTrack} />),
			className: 'custom-icon',
		})

	const getAirportIcon = name =>
		L.divIcon({
			html: ReactDOMServer.renderToString(
				<CustomAirportIcon name={name} />
			),
			className: 'custom-icon',
		})

	function ChangeCenter() {
		const map = useMap()
		if (locationChanged) {
			map.setView([location.latitude, location.longitude], 10)
			setApiBorders(location)
			setLocationChanged(false)
		}
		return null
	}

	return (
		<>
			{location && nearestAirports ? (
				//onClick funnction here to set setSelectedIcon to false
				<MapContainer
					className='leaflet-container'
					center={[location.latitude, location.longitude]}
					zoom={12}>
					<ChangeCenter />
					<Marker
						position={[location.latitude, location.longitude]}
					/>

					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>

					{traffic
						? traffic.map(aircraft => (
								<Marker
									key={aircraft[0]}
									position={[aircraft[6], aircraft[5]]}
									//change width of icon when a icon is clicked on
									//give width to getIcon function as a prop - but then all icons get bigger
									//transfer id as prop as well to specifiy?
									icon={getIcon(aircraft[10])}
									eventHandlers={{
										click: e => {
											setAirport(false)
											setPicture(null)
											setSelectedTraffic(aircraft)
										},
									}}
								/>
						  ))
						: 'loading traffic'}
					{showAirports
						? nearestAirports.map((airport, index) => (
								<Marker
									key={index}
									position={[
										airport.latitude,
										airport.longitude,
									]}
									icon={getAirportIcon(airport.name)}
									eventHandlers={{
										click: e => {
											setSelectedTraffic(false)
											setAirport(airport)
										},
									}}
								/>
						  ))
						: 'loading airports'}
					{showWindMap ? <Weather /> : ''}
				</MapContainer>
			) : (
				'loading'
			)}
		</>
	)
}
export default MapElement
