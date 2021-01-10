import React, { useContext } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/menu.css'


const Menu = () => {

    const { airportIcons } = useContext(DataContext)
	const [ showAirports, setShowAirports ] = airportIcons

    return (
        <div className='menu-container'>
            <button>showAirports</button>
        </div>
    )
}

export default Menu
