import React, { useState } from 'react'
import '../css/dashboard.css'

const Dashboard = () => {

    const [ dashboardShowing, setDashboardShowing ] = useState(false)

    const onClickFunctionHandler = () => {
        setDashboardShowing(!dashboardShowing)
    }

    return (
        <div className={`dashboard-container ${dashboardShowing ? 'showing' : ''}`}>
            <div onClick={onClickFunctionHandler} className="glareshield">show panel</div>
        </div>
    )
}

export default Dashboard
