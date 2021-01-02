import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [ selectedTraffic, setSelectedTraffic ] = useState(false)
    const [ traffic, setTraffic ] = useState([])
    const [ airport, setAirport ] = useState("")

    return (
        <DataContext.Provider value={{selectedAircraft: [selectedTraffic, setSelectedTraffic], allTraffic: [traffic, setTraffic], selectedAirport: [airport, setAirport]}}>
            {props.children}
        </DataContext.Provider>
    )
}