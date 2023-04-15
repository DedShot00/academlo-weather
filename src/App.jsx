import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Weather from './components/Weather'
import Loader from './components/Loader'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temps, setTemps] = useState()

  const success = (position) => { 
    const currentCoords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(currentCoords)
   }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)  
  }, [])
  


  useEffect(() => {
    if (coords) {
     const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=ee552535f4811bc725b6e1493386cb42`
      console.log(endpoint)
    axios
      .get(endpoint)
      .then((res) => {
        setWeather(res.data)
        const celsius = (res.data.main.temp -273.15).toFixed(1)
        const fahrenheit = (celsius * 9 /5 + 32).toFixed(1)
        const temps = {
          celsius,
          fahrenheit
        }
        setTemps(temps)
      })
      .catch((err) => { console.log(err) })
    }
  }, [coords])

    return (
    <div className={`App p-2 flex justify-center items-center min-h-screen bg-[url('/images/bg/09.png')]  bg-cover bg-center`}>
      {
        weather ? 
        (<Weather weather={weather} temps={temps}/>) :
        (<Loader/> )
      }
    </div>
  )
}

export default App
