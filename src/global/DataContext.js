import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = props => {
	const [selectedTraffic, setSelectedTraffic] = useState(false)
	const [traffic, setTraffic] = useState([])
	const [airport, setAirport] = useState('')
	const [showAirports, setShowAirports] = useState(true)
	const [location, setLocation] = useState(null)
	const [nearestAirports, setNearestAirports] = useState(null)
	const [locationChanged, setLocationChanged] = useState(false)
	const [picture, setPicture] = useState(null)

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
			}}>
			{props.children}
		</DataContext.Provider>
	)
}
