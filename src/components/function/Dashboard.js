import React, { useState, useContext } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/dashboard.css'

const Dashboard = () => {

    const [ activeTraffic, setActiveTraffic ] = useContext(DataContext)
    const [ dashboardShowing, setDashboardShowing ] = useState(false)
	const [ picture, setPicture ] = useState('')

    const onClickFunctionHandler = () => {
        setDashboardShowing(!dashboardShowing)
    }

    let myHeaders = new Headers();
	myHeaders.append("x-auth-token", process.env.REACT_APP_ACCESS_TOKEN);

	let requestOptions = {
	method: 'GET',
	headers: myHeaders
	};

	const fetchPicture = (hexCode) => {
		fetch(`https://api.planespotters.net/v1/photos/hex/${hexCode}` , requestOptions)
		.then(result => result.json())
		.then(resJson => setPicture(resJson.photos[0].thumbnail_large.src))
		.catch(error => console.log('error', error))
	}

    return (
        <div className={`dashboard-container ${dashboardShowing ? 'showing' : ''}`}>
            <div onClick={onClickFunctionHandler} className="glareshield">show panel</div>
            <div className="dashboard-data">		
                {<p onClick={() => fetchPicture(activeTraffic[0])}>load Image</p>}
                <img src={picture} alt='none available'></img>
                <h2>Callsign: {activeTraffic[1]}</h2>
                <p>Origin: {activeTraffic[2]}</p>
                <p>Speed Knts: {(activeTraffic[9] * 1.944).toFixed(2)} Knots</p>
                <p>Speed Kmh: {(activeTraffic[9] * 3.6).toFixed(2)} Km/h</p>
                <p>Altitude: {activeTraffic[13] ? `${activeTraffic[13]} m` : 'on ground'}</p>
                <p>Track: {Math.ceil(activeTraffic[10])} degrees</p>		
            </div>
        </div>
    )
}

export default Dashboard
