import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../global/DataContext'
import '../css/dashboard.css'

const Dashboard = () => {

   /*  const [ selectedTraffic, setSelectedTraffic ] = useContext(DataContext) */
    const { selectedAircraft, allTraffic } = useContext(DataContext)
	const [ selectedTraffic, setSelectedTraffic ] = selectedAircraft
	const [ traffic, setTraffic ] = allTraffic
    const [ picture, setPicture ] = useState('')
    const [ updated, setUpdated ] = useState([])
    
    //compare hex of selected with traffic

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

    useEffect(() => {
         let updatedTemp = traffic.filter(aircraft => aircraft[0] === selectedTraffic[0])
         setUpdated(updatedTemp)
    }, [traffic])


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
                            <h2>Callsign: {updated[0][1]}</h2>
                            <p>Origin: {updated[0][2]}</p>
                            <p>Speed Knts: {(updated[0][9] * 1.944).toFixed(2)} Knots</p>
                            <p>Speed Kmh: {(updated[0][9] * 3.6).toFixed(2)} Km/h</p>
                            <p>Altitude: {updated[0][13] ? `${updated[0][13]} m` : 'on ground'}</p>
                            <p>Track: {Math.ceil(updated[0][10])} degrees</p>
                        </div>
                    </div>		
                </div>
            </div>
        </div>
    )
}

export default Dashboard
