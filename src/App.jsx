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
      // console.log(endpoint)
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

  const bgImages = {
    '01d':'https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg',
    '01n':'https://images.pexels.com/photos/15176629/pexels-photo-15176629/free-photo-of-naturaleza-cielo-espacio-estrellas.jpeg',
    '02d':'https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg',
    '02n':'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg',
    '03d':'https://images.pexels.com/photos/14920821/pexels-photo-14920821.jpeg',
    '03n':'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg',
    '04d':'https://images.pexels.com/photos/14059358/pexels-photo-14059358.png',
    '04n':'https://images.pexels.com/photos/416920/pexels-photo-416920.jpeg',
    '09d':'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg',
    '09n':'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg',
    '10d':'https://images.pexels.com/photos/8808952/pexels-photo-8808952.jpeg',
    '10n':'https://images.pexels.com/photos/1643793/pexels-photo-1643793.jpeg',
    '11d':'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
    '11n':'https://images.pexels.com/photos/66867/norman-oklahoma-lightning-dangerous-66867.jpeg',
    '13d':'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg',
    '13n':'https://images.pexels.com/photos/1417642/pexels-photo-1417642.jpeg',
    '50d':'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg',
    '50n':'https://images.pexels.com/photos/207985/pexels-photo-207985.jpeg', 
}

    return (
    <div>
      <img className='absolute -z-10 h-screen w-screen object-cover blur-[0px] bg-black' src={`${bgImages[weather?.weather[0].icon]}`} alt="" />
      <div className={`App p-2 flex justify-center items-center min-h-screen`}>
        
        {
          weather ? 
          (<Weather weather={weather} temps={temps}/>) :
          (<Loader/> )
        }
      </div>
    </div>
  )
}

export default App
