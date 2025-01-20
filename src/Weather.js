import {BsSearch} from "react-icons/bs"
import { useEffect, useState } from 'react';

import { BsDroplet } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa";
import { BsInstagram } from 'react-icons/bs';
import {ImFacebook} from "react-icons/im"
import { IoIosSunny } from "react-icons/io";
import { FaLinkedinIn } from 'react-icons/fa';
import { MdMyLocation } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faWind,faSun, faDroplet, faTemperatureHalf, faCloud} from "@fortawesome/free-solid-svg-icons";
import NewsLetter from "./Newsletter";
import Error from "./Error";
import Hourly from "./Hourly";
import Daily from "./Daily";
import Footer from "./Footer";
const Weather=()=>{
const [data,setData]=useState([])
const [daily,setDaily]=useState([])
const [hourly, setHourly]=useState([])
const [location,setLocation]=useState('Baku')
const [input,setInput]=useState('')

let componentMounted=true



const d=new Date()
const date=d.getDate()
const day=d.toLocaleString("default",{weekday:'long'})
const year=d.getFullYear()
const month=d.toLocaleString("default",{month:'long'})
const time=d.toLocaleString("en-US",{hour:'2-digit', minute:'2-digit'})

useEffect(()=>{
const fetchWeather=async()=>{

const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`)
const currentData=await response.json()
const {lat, lon}=currentData.coord
   
const dailyResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
const dailyData=await dailyResponse.json()
const dailyForecast=dailyData.list.filter((item,index)=>index%8===0
);

const hourlyResponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_APII_KEY}&q=${location}`)
const hourlyData=await hourlyResponse.json()

setData(currentData)
console.log(data)
setDaily(dailyForecast)
setHourly(hourlyData.forecast.forecastday[0].hour)
}

  fetchWeather()
},[location])

const handleSubmit=(event)=>{
event.preventDefault()
setLocation(input)
}
const success=(position)=>{
console.log(position)
}
const error=(err)=>{
  console.log(err)
}
// const apiKey=AIzaSyDO85rBCHFPd120HMS6cxENbDjzuXbJsEw
// const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
// const userLocation=navigator.geolocation.getCurrentPosition(position);
// const {latitude, longitude}=position.coords;
// const currentLocation =fetch(url).then(response=>response.json)
// console.log(userLocation)
// console.log(data)
// console.log(daily)
return (
    <div>
    <div className="pt-3 container-fluid">
<div className='row'>
<div className='card_header text-center'>
 <div className='col-md-5'>
 <form onSubmit={handleSubmit} className='form-search'>
    <div className='search-box'>
<input type="text" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder="Enter city name" className='searchInput'/>
<i className='search-icon'><MdMyLocation/></i>
</div>

  </form>
 </div>
 <div className='col-md-7'>
  </div>
  </div>
    </div>


{ data.main ? (
<>
<div className="row align-items-center">
<div className='col-md-3'>
  <div className="current_box">
<div className="description">
<div className='behavior'>
{
data.weather[0].main==='Clouds' ? <a><FaCloud/> </a> :  data.weather[0].main==='Rain' ? <a><FaCloudRain/> </a>: <div><a><IoIosSunny/> </a></div>
}
</div>
<div className='temp'>
<h2>{(data.main.temp-273.15).toFixed()}°C</h2>
</div>
</div>
<div>
<h4 className='mb-4'>{data.name}</h4>
<h4>{day}, {month} {date}</h4>
</div>
</div>
</div>
<div className="col-md-2">

</div>
<div className='details mt-4 col-md-7'>
<div className='row features'>
<div className='feels card_box  cardBox  col-md-6'>
<FontAwesomeIcon icon={faTemperatureHalf} fontSize="3rem" />
<div>
<p>Feel like </p>
<p className='bold'> {(data.main.feels_like-273.15).toFixed(0)}°C</p>
</div>
</div>
<div className='humidity card_box col-md-6'>
<FontAwesomeIcon icon={data.weather[0].main.toLowerCase().includes('clear') ? faSun : faCloud} fontSize="3rem"/>
<div>
<p>Cloud cover</p>
<p className='bold'>{data.weather[0].main}</p>
</div>
</div>
</div>
<div className='row features'>
<div className='wind card_box col-md-6'>

<FontAwesomeIcon icon={faWind} fontSize="3rem"/>
<div><p >Wind Speed</p>
<p className='bold'> {data.wind.speed} MPH</p></div>

</div>
<div className='humidity card_box col-md-6'>

<FontAwesomeIcon icon={faDroplet} fontSize="3rem"/>
<div>
<p>Humidity</p>
<p className='bold'>{data.main.humidity}%</p>
</div>
</div>
</div>
</div>
</div>
</>
) : (<Error/>)
}
<div className="row mt-5">
<h2 className="text-center pt-5 pb-5 "> Today's Forecast</h2>
<Hourly hourly={hourly}/>
  </div>
<div className="row mt-5">
<h2 className="text-center">5-Day Forecast</h2>
<Daily daily={daily}/>
  </div>
{

}
</div>
<NewsLetter/>
<Footer/>
</div>

)
   
}
export default Weather;