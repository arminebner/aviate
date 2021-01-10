import React from 'react'
import airplane from '../../img/Icons/airplane.svg'
import airplaneSelected from '../../img/Icons/airplane-selected.svg'
import airportIcon from '../../img/Icons/airport2.svg'

export const OwnIcon = ({track}) => {

	const renderTrack = {
		'transform': `rotate(${track}deg)`
	}

	return (
		<div>
			<img src={airplane} width='30px' style={renderTrack} alt='airplane icon'></img>
		</div>
	)
}

export const OwnSelectedIcon = ({track}) => {

	const renderTrack = {
		'transform': `rotate(${track}deg)`,
	}

	return (
		<div>
			<img src={airplaneSelected} width='50px' style={renderTrack}  alt='airplane icon'></img>
		</div>
	)
}

export const CustomAirportIcon = ({ name }) => {
	
	return (
		<div>
			<img src={airportIcon} width='30px'  alt='airporte icon'></img>
			<div>{name}</div>
		</div>
	)
}


//export default OwnIcon