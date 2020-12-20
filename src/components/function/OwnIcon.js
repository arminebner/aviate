import React from 'react'
import airplane from '../../img/Icons/airplane.svg'

const OwnIcon = ({track}) => {

	const renderTrack = {
		'transform': `rotate(${track}deg)`
	}

	return (
		<div>
			<img src={airplane} width='30px' style={renderTrack} alt='airplane icon'></img>
		</div>
	)
}

export default OwnIcon