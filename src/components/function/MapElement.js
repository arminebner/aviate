import React, { useState, useContext, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import OwnIcon from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import { DataContext } from '../../global/DataContext'
import '../css/mapelement.css'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const MapElement = () => {

	const { selectedAircraft, allTraffic } = useContext(DataContext)
	const [ selectedTraffic, setSelectedTraffic ] = selectedAircraft
	const [ traffic, setTraffic ] = allTraffic

	const url =
	'https://opensky-network.org/api/states/all?lamin=49.7592&lomin=5.0144&lamax=51.9097&lomax=10.1358'
	const { data, error } = useSWR(url, { fetcher, refreshInterval: 11000 })
	const trafficTemp = data && !error ? data.states : []
	setTraffic(trafficTemp)

 /* 	useEffect(() => {
		if (selectedTraffic) {
			const updatedTraffic = selectedTraffic
			console.log(`before update: selectedTraffic: ${updatedTraffic[9]} trafficIndex: ${traffic[index][9]}`);
			updatedTraffic[9] = traffic[index][9]
			console.log(`after update ${updatedTraffic[9]}`);
			setSelectedTraffic(updatedTraffic)
		}
	}, [traffic])
 */

	const getIcon = (iconTrack) => (
		L.divIcon({
			html: ReactDOMServer.renderToString(<OwnIcon track={iconTrack} />),
			className: 'custom-icon',
		})
	)

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
							//change width of icon when a icon is clicked on
							//give width to getIcon function as a prop
							icon={getIcon(aircraft[10])}
							eventHandlers={{
								click: () => {
								  setSelectedTraffic(aircraft)
								},
							  }}
						/>
				  ))
				: 'loading traffic'}
		</MapContainer>
	)
}
export default MapElement