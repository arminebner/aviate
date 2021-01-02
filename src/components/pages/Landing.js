import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import airports from 'airport-data'
import flybySfx from '../../audio/flyby.mp3'
import '../css/landing.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'


const Landing = () => {

    const [ page, setPage ] = useState({ intro: true, setup: false})
    const [ airportInput, setAirportInput ] = useState(null)

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
        const filteredData = airports.filter(items => items.icao === airportInput)
        localStorage.setItem('selectedAirport', JSON.stringify(filteredData))
        redirect()
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
                        <div className="setup-box">
                            <h2>welcome</h2>
                            <p className='upper-p'>set your airport (icao)</p>
                            <form className='set-airport-form'>
                                <input className='set-airport-input' onChange={airportUserInput} type="text" placeholder="e.g. EDDK"/>
                                <button className='set-airport-button' onClick={airportSet} type='submit'>set Airport</button>
                            </form>
                            <p className='lower-p' onClick={redirect} >Just show me planes, pls!</p>
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
