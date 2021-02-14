import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = props => {
	const [selectedTraffic, setSelectedTraffic] = useState(false)
	const [traffic, setTraffic] = useState([])
	const [airport, setAirport] = useState('')
	const [showAirports, setShowAirports] = useState(false)
	const [location, setLocation] = useState(null)
	const [nearestAirports, setNearestAirports] = useState(null)
	const [locationChanged, setLocationChanged] = useState(false)
	const [picture, setPicture] = useState(null)
	const [showWindMap, setShowWindMap] = useState(false)
	const [follow, setFollow] = useState(false)
	const [showCompass, setShowCompass] = useState(false)
	const [depHistory, setDepHistory] = useState([])
	const [arrHistory, setArrHistory] = useState([])
	const [flightHistory, setFlightHistory] = useState([
		{
			firstSeen: 1612828311,
			lastSeen: 1612834311,
			estDepartureAirport: 'EDDK',
			estArrivalAirport: 'EHAM',
		},
	])
	const [showArrHistory, setShowArrHistory] = useState(false)
	const [showDepHistory, setShowDepHistory] = useState(false)
	const [showFlightHistory, setShowFlightHistory] = useState(false)

	return (
		<DataContext.Provider
			value={{
				selectedAircraft: [selectedTraffic, setSelectedTraffic],
				allTraffic: [traffic, setTraffic],
				selectedAirport: [airport, setAirport],
				airportIcons: [showAirports, setShowAirports],
				newLocation: [location, setLocation],
				nearest: [nearestAirports, setNearestAirports],
				change: [locationChanged, setLocationChanged],
				aircraftImage: [picture, setPicture],
				winddata: [showWindMap, setShowWindMap],
				followMode: [follow, setFollow],
				history: [flightHistory, setFlightHistory],
				compass: [showCompass, setShowCompass],
				departures: [depHistory, setDepHistory],
				showDepartures: [showDepHistory, setShowDepHistory],
				arrivals: [arrHistory, setArrHistory],
				showArrivals: [showArrHistory, setShowArrHistory],
				showPastFlights: [showFlightHistory, setShowFlightHistory],
			}}>
			{props.children}
		</DataContext.Provider>
	)
}
