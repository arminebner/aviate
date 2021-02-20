import React from 'react'
import '../css/weather.css'

const Weather = () => {
	return (
		<div className='weather-container'>
			<iframe
				src='https://www.meteoblue.com/en/weather/maps/widget?windAnimation=0&windAnimation=1&gust=0&gust=1&satellite=0&satellite=1&coronaWeatherScore=0&coronaWeatherScore=1&geoloc=detect&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=10&autowidth=auto'
				frameborder='0'
				scrolling='NO'
				allowtransparency='true'
				sandbox='allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox'
				style={{ width: '20vw', height: '40vh' }}
				title='meteoblue'></iframe>
			<div className='meteo-link'>
				<a
					href='https://www.meteoblue.com/en/weather/webmap/beta?utm_source=weather_widget&utm_medium=linkus&utm_content=map&utm_campaign=Weather%2BWidget'
					target='_blank'
					rel='noreferrer'>
					meteoblue
				</a>
			</div>
		</div>
	)
}

export default Weather
