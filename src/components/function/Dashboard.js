import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/dashboard.css'

const Dashboard = () => {

    const { selectedAircraft, allTraffic } = useContext(DataContext)
	const [ selectedTraffic, setSelectedTraffic ] = selectedAircraft
	const [ traffic, setTraffic ] = allTraffic
    const [ picture, setPicture ] = useState('')

    useEffect(() => {

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
        fetchPicture(selectedTraffic[0])

    }, [selectedTraffic])

    const returnUpdated = () => {
        //here bugfix for transponder to off-position ((selectedTraffic &&  selectedTraffic[0][1] != undefined or so ))
        if(selectedTraffic) {
            let updatedTemp = traffic.filter(aircraft => aircraft[0] === selectedTraffic[0])
            return updatedTemp
        }
        //here bugfix for transponder to off-position (elseif (!selectedTraffic || selectedTraffic[0] === undefined ))
        else {
            let initialTemp = [
                [1,0],
                [2,0],
                [9,0],
                [10,0],
                [13,0],
            ]
            return initialTemp
        }
    }

    const closeHandler = () => {
        setSelectedTraffic(false)
    }

    return (
        <div className={`dashboard-container ${selectedTraffic ? 'showing' : ''}`}>
            <div onClick={closeHandler} className="glareshield">close</div>
            <div className="dashboard">
                <div className="dashboard-data">
                    <div className="general-data">
                        <div className="aircraft-image">
                            <img src={picture} alt='none available'></img>
                        </div>
                        <div className="current-position-info">
                            <h2>Callsign: {returnUpdated()[0][1]}</h2>
                            <p>Origin: {returnUpdated()[0][2]}</p>
                            <p>Speed Knts: {(returnUpdated()[0][9] * 1.944).toFixed(2)} Knots</p>
                            <p>Speed Kmh: {(returnUpdated()[0][9] * 3.6).toFixed(2)} Km/h</p>
                            <p>Altitude: {returnUpdated()[0][13] ? `${returnUpdated()[0][13]} m` : 'on ground'}</p>
                            <p>Track: {Math.ceil(returnUpdated()[0][10])} degrees</p>
                        </div>
                    </div>		
                </div>
            </div>
        </div>
    )
}

export default Dashboard
