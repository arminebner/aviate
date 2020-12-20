import React, { useState } from 'react'
import '../css/landing.css'
import OpenSkyLogo from '../../img/logos/opensky.png'
import PlanespottersLogo from '../../img/logos/planespotters.png'
import { NavLink } from 'react-router-dom'

const Landing = () => {

    const [ intro, setIntro ] = useState([])

    const introTimer = () => {
        setTimeout(() => {
            setIntro(false)
        }, 5000);
        
    }
    introTimer()

    return (
        <>
            {intro &&
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
            }
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
        </>
    )
}

export default Landing
