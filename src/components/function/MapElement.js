import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import OwnIcon from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import '../css/mapelement.css'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const MapElement = () => {

	const [ picture, setPicture ] = useState('')

	const url =
	'https://opensky-network.org/api/states/all?lamin=49.7592&lomin=5.0144&lamax=51.9097&lomax=10.1358'
	const { data, error } = useSWR(url, { fetcher, refreshInterval: 11000 })
	const traffic = data && !error ? data.states : [] 

	let myHeaders = new Headers();
	myHeaders.append("x-auth-token", process.env.REACT_APP_ACCESS_TOKEN);

	let requestOptions = {
	method: 'GET',
	headers: myHeaders
	};

	const fetchPicture = (hexCode) => {
		fetch(`https://api.planespotters.net/v1/photos/hex/${hexCode}` , requestOptions)
		.then(result => result.json())
		.then(resJson => setPicture(resJson.photos[0].thumbnail.src))
		.catch(error => console.log('error', error))
	}
	

/* 	let config = {
	  method: 'get',
	  url: 'https://api.planespotters.net/v1/photos/hex/3e350c',
	  headers: { 
		'x-auth-token': 'SspIL3LTsKpQMYSbMRPt7sAVEFVZQY5s'
	  }
	};

	const fetchPicture = () => {
		axios(config)
		.then(function (response) {
		console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
		console.log(error);
		});
	} */


const getIcon = (iconTrack) => (
	L.divIcon({
		html: ReactDOMServer.renderToString(<OwnIcon track={iconTrack} />),
		className: 'custom-icon',
	})
)

const markerOnClick = () => {
	alert('click on marker')
}

	return (
		<MapContainer className='leaflet-container' center={[50.935173, 6.953101]} zoom={9}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{traffic
				? traffic.map((aircraft) => (
						<Marker
							key={aircraft[0]}
							position={[aircraft[6], aircraft[5]]}
							icon={getIcon(aircraft[10])}
							eventHandlers={{
								click: () => {
								  console.log('marker clicked')
								},
							  }}
						>
						{/* 	<Popup>
								<h2>Callsign: {aircraft[1]}</h2>
								{<p onClick={() => fetchPicture(aircraft[0])}>load Image</p>}
								<img src={picture} alt='none available'></img>
								<p>{aircraft[0]}</p>
								<p>Origin: {aircraft[2]}</p>
								<p>Speed Knts: {(aircraft[9] * 1.944).toFixed(2)} Knots</p>
								<p>Speed Kmh: {(aircraft[9] * 3.6).toFixed(2)} Km/h</p>
								<p>
									Altitude: {aircraft[13] ? `${aircraft[13]} m` : 'on ground'}
								</p>
								<p>Track: {Math.ceil(aircraft[10])} degrees</p>
							</Popup> */}
						</Marker>
				  ))
				: 'loading traffic'}
		</MapContainer>
	)
}
export default MapElement