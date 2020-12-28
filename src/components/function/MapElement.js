import React, { useState, useContext } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { OwnIcon, OwnSelectedIcon } from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import { DataContext } from '../../global/DataContext'
import '../css/mapelement.css'



const MapElement = () => {

	const { selectedAircraft, allTraffic } = useContext(DataContext)
	const [ selectedTraffic, setSelectedTraffic ] = selectedAircraft
	const [ traffic, setTraffic ] = allTraffic
	const [ selectedIcon, setSelectedIcon ] = useState(false)

	const fetcher = (...args) => {
		fetch(...args)
		.then(response => response.json())
		.then(responseJson => setTraffic(responseJson.states))
	}

	const url =
	'https://opensky-network.org/api/states/all?lamin=49.7592&lomin=5.0144&lamax=51.9097&lomax=10.1358'
	const { data, error } = useSWR(url, { revalidateOnFocus: false, fetcher, refreshInterval: 11000 })
	//const traffic = data && !error ? data.states : []
	

	//bad setState
	//setTraffic(trafficTemp)

	const getIcon = (iconTrack) => {
		if (!selectedIcon) {
			return L.divIcon({
				html: ReactDOMServer.renderToString(<OwnIcon track={iconTrack} />),
				className: 'custom-icon',
			})
		} if (selectedIcon) {
			console.log(`Icon ID from getIcon: ${selectedIcon.options}`);
			//selectedIcon.options.icon.options.html = ReactDOMServer.renderToString(<OwnSelectedIcon track={iconTrack} />)
		}		
	}

	//markersLayer[markersIndex].setIcon(myCustomIcon);

	const  getSelectedIcon = (e) => {
		var icon = e.target
		console.log(icon); 
	  }

	return (
		//onClick funnction here to set setSelectedIcon to false
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
							//give width to getIcon function as a prop - but then all icons get bigger
							//transfer id as prop as well to specifiy?
							icon={getIcon(aircraft[10])}
							eventHandlers={{
								click: (e) => {
									getSelectedIcon(e)
								  setSelectedIcon(e.target)
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