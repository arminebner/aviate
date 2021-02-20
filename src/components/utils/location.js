
import airports from 'airport-data'



export const airportUserInput = (e) => {
    let airport = ''
    const airportTemp = (e.target.value).toUpperCase()
    airport = airportTemp
    console.log(airport);
    return airport
}

/* export const airportSet = (e) => {
    e.preventDefault()
    if(airportInput) {
        const [ location ] = airports.filter(items => items.icao === airportInput)
        localStorage.setItem('selectedLocation', JSON.stringify(location))
        findNearestAirports(location)
        setAnimate(true)
        redirect()
    }   
}

export const useGeoPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(convertGeoPosition)
        setAnimate(true)
        redirect()
        }else{
            alert('could not retrieve geolocation')
    }     
}

export const convertGeoPosition = (location) => {
    const position = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    } 
    findNearestAirports(position)
    localStorage.setItem('selectedLocation', JSON.stringify(position))
}

export const findNearestAirports = (location) => {
    //round numbers to closest integer
    const roundedLat = Math.round(location.latitude)
    const roundedLong = Math.round(location.longitude)
    
    //round lat and filter with rounded long
    const  roundedLatArr = airports.filter(item => Math.round(item.latitude) === roundedLat)
    const  roundedLatArr_roundedLong = roundedLatArr.filter(item => Math.round(item.longitude) === roundedLong)
    localStorage.setItem('nearestAirports', JSON.stringify(roundedLatArr_roundedLong))
} */




