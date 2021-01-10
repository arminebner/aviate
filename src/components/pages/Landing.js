import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import airports from 'airport-data'
import flybySfx from '../../audio/flyby.mp3'
import planeIcon from '../../img/Icons/airplane.svg'
import '../css/landing.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'


const Landing = () => {

    const [ page, setPage ] = useState({ intro: true, setup: false})
    const [ airportInput, setAirportInput ] = useState(null)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPage({ intro: false, setup: true})
        }, 2000);
    }, [])

    const redirect = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play()
        setTimeout(() => {
            window.location.href = '/map'
        }, 4000);
    }

    const airportUserInput = (e) => {
        const airportTemp = (e.target.value).toUpperCase()
        setAirportInput(airportTemp)
    }

    const airportSet = (e) => {
        e.preventDefault()
        if(airportInput) {
            const [ location ] = airports.filter(items => items.icao === airportInput)
            localStorage.setItem('selectedLocation', JSON.stringify(location))
            searchNearestAirportICAO(location)
            setAnimate(true)
            redirect()
        }   
    }

    const searchNearestAirportICAO = (location) => {

        //round numbers to closest integer
        const roundedLat = Math.round(location.latitude)
        const roundedLong = Math.round(location.longitude)
        
        //round lat
        const  roundedLatArr = airports.filter(item => Math.round(item.latitude) === roundedLat)
        //filter for all possible longs (round, up, down)
        const  roundedLatArr_roundedLong = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong)
        localStorage.setItem('nearestAirports', JSON.stringify(roundedLatArr_roundedLong))
    }

    const findNearestAirport = () => {
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(searchNearestAirportGeo, setLocation)
           setAnimate(true)
           redirect()
            }else{
                alert('could not retrieve geolocation')
        }     
    }

    const setLocation = (location) => {
        const position = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        } 
        localStorage.setItem('selectedLocation', JSON.stringify(position))
    }

    const searchNearestAirportGeo = (location) => {

        //round numbers to closest integer
        const roundedLat = Math.round(location.coords.latitude)
        const roundedLong = Math.round(location.coords.longitude)
        
        //round lat
        const  roundedLatArr = airports.filter(item => Math.round(item.latitude) === roundedLat)
        //filter for all possible longs (round, up, down)
        const  roundedLatArr_roundedLong = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong)
        localStorage.setItem('nearestAirports', JSON.stringify(roundedLatArr_roundedLong))

      /*   const  roundedLatArr_roundedLongUp = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const  roundedLatArr_roundedLongDown = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat up
        const  roundedLatArrUp = airports.filter(item => Math.round(item.latitude) === roundedLat + 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrUp_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrUp_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrUp_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat down
        const  roundedLatArrDown = airports.filter(item => Math.round(item.latitude) === roundedLat - 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrDown_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrDown_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrDown_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

       const final = [...roundedLatArr_roundedLong, ...roundedLatArr_roundedLongUp, ...roundedLatArr_roundedLongDown, ...roundedLatArrUp_roundedLong, ...roundedLatArrUp_roundedLongUp, ...roundedLatArrUp_roundedLongDown, ...roundedLatArrDown_roundedLong, ...roundedLatArrDown_roundedLongUp, ...roundedLatArrDown_roundedLongDown] */

      // console.log(roundedLatArr_roundedLong);
       
    }

    const pageTransition = {
        duration: 1,
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <audio className="audio-element">
                <source src={flybySfx}></source>
            </audio>
            { page.intro &&
                <motion.div 
                key={1}
                animate={{ opacity: 1 }} 
                initial={{ opacity: 0.3 }} 
                exit={{ opacity: 0.1 }} 
                transition={pageTransition}>
                    <div className='intro'>
                        <div className="logo-box">
                            <h1>Aviate</h1>
                            <h2>...live</h2>
                        </div>
                        <div className="landing-footer">
                            <h3>powered by</h3>
                            <div className="logo-container">
                                <img src={OpenSkyLogo} alt="logo from open sky network"/>
                                <img src={PlanespottersLogo} alt="logo from planespotters.net"/>
                            </div>
                        </div>
                    </div>
                </motion.div> 
            }

            { page.setup &&
                <motion.div 
                    key={2}
                    animate={{ opacity: 1 }} 
                    initial={{ opacity: .1 }} 
                    exit={{ opacity: 0.5 }} 
                    transition={pageTransition}>
                    <div className="setup">
                            <img src={planeIcon} className={`login-icon ${animate ? 'logo-icon-anim' : ''}`} alt='plane icon'></img>
                            <img src={planeIcon} className={`login-icon2 ${animate ? 'logo-icon-anim2' : ''}`} alt='plane icon'></img>
                            <img src={planeIcon} className={`login-icon3 ${animate ? 'logo-icon-anim3' : ''}`} alt='plane icon'></img>
                        <div className="setup-box">
                            <h2>welcome</h2>
                            <p className='upper-p'>set your airport (icao)</p>
                            <form className='set-airport-form'>
                                <input className='set-airport-input' onChange={airportUserInput} type="text" placeholder="e.g. EDDK"/>
                                <button className='set-airport-button' onClick={airportSet} type='submit'>set Airport</button>
                            </form>
                            <p className='lower-p' onClick={findNearestAirport} >Just show me planes, pls!</p>
                        </div>
                        <div className="setup-footer">
                            <h3>powered by</h3>
                            <div className="logo-container">
                                <img src={OpenSkyLogo} alt="logo from open sky network"/>
                                <img src={PlanespottersLogo} alt="logo from planespotters.net"/>
                            </div>
                        </div>

                    </div>
                </motion.div>
            }
       </AnimatePresence>
    )
}

export default Landing
