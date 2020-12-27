import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../css/login.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'

const Login = () => {
    return (
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
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
    )
}

export default Login
