import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [ activeTraffic, setActiveTraffic ] = useState([])
    return (
        <DataContext.Provider value={[activeTraffic, setActiveTraffic]}>
            {props.children}
        </DataContext.Provider>
    )
}