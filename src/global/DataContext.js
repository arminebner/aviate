import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [ selectedTraffic, setSelectedTraffic ] = useState(false)
    const [ traffic, setTraffic ] = useState([])
    const [ airport, setAirport ] = useState("")
    const [ showAirports, setShowAirports ] = useState(true)

    return (
        <DataContext.Provider value={{selectedAircraft: [selectedTraffic, setSelectedTraffic], allTraffic: [traffic, setTraffic], selectedAirport: [airport, setAirport], airportIcons: [showAirports, setShowAirports]}}>
            {props.children}
        </DataContext.Provider>
    )
}