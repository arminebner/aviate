import React, { useContext } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/menu.css'


const Menu = () => {

    const { airportIcons } = useContext(DataContext)
    const [ showAirports, setShowAirports ] = airportIcons
    
    const toggleAirports = () =>  setShowAirports(!showAirports)

    return (
        <div className='menu-container'>
            <div className='menu-item toggle-airports' onClick={toggleAirports}>showAirports</div>
            <div className='menu-item new-location'>
                <input className='menu-item location-input' type='text' placeholder='change airport to'></input>
                <div className='menu-item location-button' onClick={toggleAirports}>setNewLocation</div>
            </div>
        </div>
    )
}

export default Menu
