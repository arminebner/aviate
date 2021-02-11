<LayersControl name='Weather Layers' position='topleft'>
					
						<LayersControl.Overlay name='Clouds'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/clouds_cls/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Precipitation'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Barometric Pressure'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Pressure Conture'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Wind Speed'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Temperature'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name='Rain'>
							<TileLayer
								url={`https://tile.openweathermap.org/map/rain_cls/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OWM_API_KEY}`}
							/>
						</LayersControl.Overlay>
					</LayersControl>




?lamin=${-85}&lomin=${-180}&lamax=${85}&lomax=${180}


var icon = centerMarker.options.icon; icon.options.iconSize = [newwidth, newheight]; centerMarker.setIcon(icon); 

curl -s "https://opensky-network.org/api/flights/aircraft?icao24=3c675a&begin=1517184000&end=1517270400"




	/*   const  roundedLatArr_roundedLongUp = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const  roundedLatArr_roundedLongDown = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat up
        const  roundedLatArrUp = airports.filter(item => Math.round(item.latitude) === roundedLat + 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrUp_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrUp_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrUp_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

        //round lat down
        const  roundedLatArrDown = airports.filter(item => Math.round(item.latitude) === roundedLat - 1)
        //filter for all possible longs (round, up, down)
        const roundedLatArrDown_roundedLong = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong)
        const roundedLatArrDown_roundedLongUp = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong + 1)
        const roundedLatArrDown_roundedLongDown = roundedLatArrUp.filter(item => Math.round(item.longitude) === roundedLong - 1)

       const final = [...roundedLatArr_roundedLong, ...roundedLatArr_roundedLongUp, ...roundedLatArr_roundedLongDown, ...roundedLatArrUp_roundedLong, ...roundedLatArrUp_roundedLongUp, ...roundedLatArrUp_roundedLongDown, ...roundedLatArrDown_roundedLong, ...roundedLatArrDown_roundedLongUp, ...roundedLatArrDown_roundedLongDown] */

		// console.log(roundedLatArr_roundedLong);


