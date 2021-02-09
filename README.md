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