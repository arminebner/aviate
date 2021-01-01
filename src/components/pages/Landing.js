import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import flybySfx from '../../audio/flyby.mp3'
import '../css/landing.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'


const Landing = () => {

    const [ page, setPage ] = useState({ intro: true, setup: false})

    useEffect(() => {
        setTimeout(() => {
            setPage({ intro: false, setup: true})
        }, 2000);
    }, [])

    const playSound = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play()
            setTimeout(() => {
                window.location.href = '/map'
            }, 4000);
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
                            <input type="text" value="" placeholder="e.g. EDDK"/>
                            <p className='lower-p' onClick={playSound} >Just show me planes, pls!</p>
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
