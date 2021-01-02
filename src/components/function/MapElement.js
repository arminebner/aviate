import React, { useContext } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { OwnIcon } from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import { DataContext } from '../../global/DataContext'
import '../css/mapelement.css'

const MapElement = () => {

	const { selectedAircraft, allTraffic } = useContext(DataContext)
	const [ selectedTraffic, setSelectedTraffic ] = selectedAircraft
	const [ traffic, setTraffic ] = allTraffic

	const selectedAirport = JSON.parse(localStorage.getItem("selectedAirport"));
	const { icao, latitude, longitude } = selectedAirport[0]
	const lamin = latitude - 3 
	const lamax = latitude + 3
	const lomin = longitude - 6 
	const lomax = longitude + 6

	const fetcher = (...args) => {
		fetch(...args)
		.then(response => response.json())
		.then(responseJson => setTraffic(responseJson.states))
	}

	const url =
	`https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
	const { data, error } = useSWR(url, { revalidateOnFocus: false, fetcher, refreshInterval: 11000 })
	//const traffic = data && !error ? data.states : []

	//bad setState
	//setTraffic(trafficTemp)

	const getIcon = (iconTrack) => (
		//if selectedTraffic, make its icon bigger and blue
		//change said icon or just overlay a bigger icon?
		L.divIcon({
			html: ReactDOMServer.renderToString(<OwnIcon track={iconTrack} />),
			className: 'custom-icon',
		})
	)

	return (
		//onClick funnction here to set setSelectedIcon to false
		<MapContainer className='leaflet-container' center={[latitude, longitude]} zoom={9}>
			<Marker key={icao} position={[latitude, longitude]} />
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