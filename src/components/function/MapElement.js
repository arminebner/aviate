import React, { useContext } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import OwnIcon from './OwnIcon'
import * as L from 'leaflet'
import useSWR from 'swr'
import { DataContext } from '../../global/DataContext'
import '../css/mapelement.css'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const MapElement = () => {

	const [ activeTraffic, setActiveTraffic ] = useContext(DataContext)

	const url =
	'https://opensky-network.org/api/states/all?lamin=49.7592&lomin=5.0144&lamax=51.9097&lomax=10.1358'
	const { data, error } = useSWR(url, { fetcher, refreshInterval: 11000 })
	const traffic = data && !error ? data.states : [] 


	

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
							//change size of icon when a icon is clicked on
							icon={getIcon(aircraft[10])}
							eventHandlers={{
								click: () => {
								  setActiveTraffic(aircraft)
								},
							  }}
						/>
				  ))
				: 'loading traffic'}
		</MapContainer>
	)
}
export default MapElement