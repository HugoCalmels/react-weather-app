import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react'
import Day from './components/Day'
import './style.css'
import neige from './assets/images/neige.png'
import pluvieuxLight from './assets/images/pluvieuxLight.png'
import nuageux from './assets/images/nuageux.png'
import nuage from './assets/images/nuage.png'
import nualeil from './assets/images/nualeil.png'
import tempete from './assets/images/tempete.png'
import pluvieux from './assets/images/pluvieux.png'
import soleil from './assets/images/soleil.png'


const weekday = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
const URL = `https://api.openweathermap.org/data/2.5/weather`

const API_KEY = `&appid=${process.env.REACT_APP_API_KEY}`

console.log(API_KEY)

const App = () => {

  const [weatherArray, setWeatherArray] = useState([])
  const [newArray, setNewArray] = useState([])

  const [currentLat, setCurrentLat] = useState('')
  const [currentLong, setCurrentLong] = useState('')

  const getCurrentPosition = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    })
  })

  const getCurrentDay = () => {

    return weekday[new Date().getDay()-1];

  }
  console.log(getCurrentDay())


  const addDays = (days) => {
    var today = new Date().getDay()-1
    var tomorrow = today + days;
    if (tomorrow > 6 && tomorrow) {
      let rest = tomorrow - 7
      tomorrow = rest
    } else {

    }
    return weekday[tomorrow];
  }

  getCurrentDay()
  console.log(addDays(1))
  

  const getCurrentWeather = async (position) => {
    const response = await fetch(`${URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric${API_KEY}`)
    const data = await response.json()
     return data
  }

  const getNextDaysWeather = async (position) => {
    const numberOfDays = 5
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric${API_KEY}`)

    const data = await response.json()
    console.log('999999999999999999999999')
    console.log(data)
    console.log('999999999999999999999999')
    return data
  }

  const getWeatherImage = (desc) => {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
    let image
    switch (desc) {
      case "clear sky":
        image = soleil
        break;
      case "few clouds":
        image = nualeil
        break;
      case "scattered clouds":
      case "overcast clouds" :
        image = nuage
        break;
      case "broken clouds":
        image = nuageux
        break;
      case "shower rain":
      case "light rain" :
        image = pluvieuxLight
        break;
      case "rain":
        image = pluvieux
        break;
      case "thunderstorm":
        image = tempete
        break;
      case "snow":
        image = neige
        break;
      case "mist":
        image = nuageux
        break;
      
    }
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLL")
 
 
    return image
    console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
    console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
  }
 

    useEffect(() => {
      getCurrentPosition.then((position) => {
        getCurrentWeather(position).then((data) => {
          console.log(data)
     
          setWeatherArray(weatherArray.push({image: getWeatherImage(data.weather[0].description), weather: data.weather[0].description,min: data.main.temp_min, max: data.main.temp_max, day: getCurrentDay()}));
        })
        getNextDaysWeather(position).then((data) => {
          
  
            for (let i = 1; i < 5; i++) {
              console.log(data.daily[i])
              setWeatherArray(weatherArray.push({image: getWeatherImage(data.daily[i].weather[0].description),weather: data.daily[i].weather[0].description,min: data.daily[i].temp.min, max: data.daily[i].temp.max, day: addDays(i)}))
              //setWeatherArray(weatherArray.push(data.daily[i]))
            }
            
          console.log(weatherArray)
          console.log('/////////////////////////')
          weatherArray.map((el) => console.log(el))
          console.log('/////////////////////////')
          setNewArray(weatherArray)
 
        })
  
          

     
      })
     
    }, [])
  
  
  useEffect(() => {
    console.log('((((((((((((((((((((((((((((((((((((((((')
    console.log(newArray)
    console.log('((((((((((((((((((((((((((((((((((((((((')
  },[newArray])


  
 



  /*
   
  getCurrentWeather().then((data) => {
    weatherArray.push(data)
    console.log(weatherArray)
  })
  */
  
 // <p>{weatherArray? weatherArray : ""}</p>
  // <p>latitude : {currentPosition.lat}</p>
  //<p>longitude : {currentPosition.long}</p>

  /*
    {weatherArray.map((el, index) => (
        (<Day key={index} weather={el} />)
      ))}

  */
 

  return (
    <div className="app">
      <div className="container">
      {newArray.map((el, index) => ( 
        <Day key={index} min={el.min} max={el.max} day={el.day} weather={el.weather} image={el.image} />
      ))}
    </div>
     
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));