import React from 'react'
import '../css/own-icon.css'
import airplane from '../../img/Icons/airplane.svg'
import airplaneSelected from '../../img/Icons/airplane-selected.svg'
import airportIcon from '../../img/Icons/airport2.svg'
import compassRose from '../../img/Icons/compass_360.svg'

export const OwnIcon = ({ track }) => {
	const renderTrack = {
		transform: `rotate(${track}deg)`,
	}

	return (
		<div>
			<img
				src={airplane}
				width='30px'
				style={renderTrack}
				alt='airplane icon'></img>
		</div>
	)
}

export const OwnSelectedIcon = ({ track }) => {
	const renderTrack = {
		transform: `rotate(${track}deg)`,
	}

	return (
		<div>
			<img
				src={airplaneSelected}
				width='100px'
				style={renderTrack}
				alt='airplane icon'></img>
		</div>
	)
}

export const CustomAirportIcon = ({ name }) => {
	return (
		<div className='icon-container'>
			<img
				className='icon-airport'
				src={airportIcon}
				width='40px'
				alt='airport icon'></img>
			<hr className='line-separator' />
			<div className='icon-name'>{name}</div>
		</div>
	)
}

export const CompassRose = () => {
	return (
		<div>
			<img
				className='compass-rose'
				src={compassRose}
				alt='airport icon'></img>
		</div>
	)
}

//export default OwnIcon
