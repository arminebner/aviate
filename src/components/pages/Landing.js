import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../css/landing.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'


const Landing = () => {

    const [ page, setPage ] = useState({ intro: true, setup: false})

    useEffect(() => {
        setTimeout(() => {
            setPage({ intro: false, setup: true})
        }, 5000);
    }, [])

    return (
        <>
            { page.intro &&
                <motion.div exit={{ opacity: 0.1 }} animate={{ opacity: 1 }} initial={{ opacity: 0.1 }}>
                    <div className='intro'>
                        <div className="logo-box">
                            <h1>Aviate</h1>
                            <h2>...live</h2>
                            <NavLink to='/login'><p>start</p></NavLink>
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
                <motion.div exit={{ opacity: 0.1 }} animate={{ opacity: 1 }} initial={{ opacity: 0.1 }}>
                    <div className="setup">
                        <div className="setup-box">
                            <h2>welcome</h2>
                            <p className='upper-p'>set your airport (icao)</p>
                            <input type="text" value="" placeholder="e.g. EDDK"/>
                            <NavLink to='/map'><p className='lower-p'>just show me planes, pls!</p></NavLink>
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
       </>
    )
}

export default Landing
