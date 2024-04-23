import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cloudy from '../assets/icons/cloudy.png'
import rainy from '../assets/icons/rainy.png'
// import clear_sky from '../assets/icons/clear_sky.png'
import snowey from '../assets/icons/snowey.png'
import sunny from '../assets/icons/sunny.png'

import clear from '../assets/images/clear.jpg'
import clouds from '../assets/images/cloudy.jpg'
import rain from '../assets/images/rainy.jpg'
import snow from '../assets/images/snow.jpg'
import sun from '../assets/images/sunny.jpg'

const WeatherPage = () => {
  // Importing environment variable
  const APIKEY = import.meta.env.VITE_WEATHER_API;

  const {cityName} = useParams();

  // console.log(cityName);

  const [weatherData, setWeatherData] = useState(null)

  const [icons, setIcons] = useState()

  const [backgroundimage, setBackgroungImage] = useState ()

  const [date, setDate] = useState ("")

  useEffect(() => {

    const FetchWeather = async ()=>{
      try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`)
        setWeatherData(res.data);
      } catch (err) {
        console.log("Something isn't Right", err);
      }
    }
   FetchWeather();

  }, [APIKEY]); // Dependency added to useEffect to re-fetch data when APIKEY changes

  useEffect(()=>{

    if(weatherData && weatherData.weather){

      const weatherIcon = weatherData.weather[0].main

      if(weatherIcon == "Clouds"){
        setIcons(cloudy)
        setBackgroungImage(clouds)
      }else if (weatherIcon == "Rain"){
        setIcons(rainy)
        setBackgroungImage(rain)
      }else if(weatherIcon == "Clear"){
        setIcons(sunny)
        setBackgroungImage(sun)
      }else if(weatherIcon == "Snow"){
        setIcons(snowey)
        setBackgroungImage(snow)
      }
      
    }
   
    const newdate = new Date

    const standarddate = {weekday:"long", year:"numeric", month:"long", day:"numeric"}
    setDate(newdate.toLocaleDateString("en-Us", standarddate))

  },[weatherData])

 console.log("Weatherdata", weatherData);

  return (
    <div>
      <>
      {
        weatherData && (
          <div className="min-h-screen flex items-center justify-center" 
          style={{backgroundImage:`url(${backgroundimage})`, backgroundSize:"100% 100%", backgroundPosition:"center"}}>
  <div className="flex flex-col bg-white rounded-lg p-4 w-full max-w-xs border border-red-500 border-4">
      <div className="font-bold text-xl">{cityName}</div>
      <div className="text-sm text-gray-500">{date}</div>
      <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
     <img src={icons} alt="" />
      </div>
      <div className="flex flex-row items-center justify-center mt-6">
        <div className="font-medium text-6xl">{(weatherData.main.temp -273.15).toFixed(1)}°C</div>
        <div className="flex flex-col items-center ml-6">
          <div>{weatherData.weather[0].main}</div>
          <div className="mt-1">
            <span className="text-sm">
              {/* <i className="far fa-long-arrow-up" /> */}
            </span>
            <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_max -273.15).toFixed(1)}°C</span>
          </div>
          <div>
            <span className="text-sm">
              {/* <i className="far fa-long-arrow-down" /> */}
            </span>
            <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_min -273.15).toFixed(1)}°C</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Wind</div>
          <div className="text-sm text-gray-500">{weatherData.wind.speed} m/s</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Humidity</div>
          <div className="text-sm text-gray-500">{weatherData.main.humidity} %</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Pressure</div>
          <div className="text-sm text-gray-500">
            {weatherData.main.pressure}
            </div>
        </div>
      </div>
    </div>
  </div>
        )
      }
  
</>

    </div>
  );
};

export default WeatherPage;
