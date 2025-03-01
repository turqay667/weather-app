import {BsSearch} from "react-icons/bs"
import { useEffect, useState } from 'react';
import { FaCloud } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {faWind,faSun, faDroplet, faTemperatureHalf, faCloud, faMoon} from "@fortawesome/free-solid-svg-icons";
import Error from "./Error";
import Hourly from "./Hourly";
import Daily from "./Daily";
import Footer from "./Footer";
import { MdContactless, MdOutlineVisibility, MdOutlineWbSunny } from "react-icons/md";

import Map from "./Map";
import About from "./About";
const Weather=({lat,lon})=>{
const [data,setData]=useState([])
const [daily,setDaily]=useState([])
// const [coords,setCoords]=useState({
//    lat:0,
//    lan:0
// })
const [hourly, setHourly]=useState([])
const [uvi,setUvi]=useState('')
const [degree,setDegree]=useState('C')
const [location,setLocation]=useState('Baku')
const [input,setInput]=useState('')
const d=new Date()
const date=d.getDate()
const day=d.toLocaleString("default",{weekday:'long'})
const month=d.toLocaleString("default",{month:'long'})
//  const handleLocation=()=>{

//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((position)=>{
//       let {coords}=position
//       let filteredData={
//         latitude:coords.latitude,
//         longitude:coords.longitude
//       } 
//       setCoords(filteredData)
//     })
//   }
// }
  useEffect(()=>{

const fetchWeather=async()=>{
 const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`)
const currentData=await response.json()
// setCoords({
//   lat:currentData.coord.lat,
//   lon:currentData.coord.lon
// })
let {lat, lon}=currentData.coord
const dailyResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)

const dailyData=await dailyResponse.json()
console.log(dailyData)
const dailyForecast=dailyData.list.slice(0,5)
setData(currentData)
// setUvi(dailyData.current.uvi)
setDaily(dailyForecast)
setHourly(dailyData.list)
}

  fetchWeather()
},[location, lat, lon])
const handleSubmit=(event)=>{
event.preventDefault()
setLocation(input)
}

let temp=0;
  if(degree==='K'){
       temp+=273.15
  }
let position=[49.892, 40.3777]
if(!data){
 position = [data.coord.lat, data.coord.lon]
}
else{
  position=[49.892, 40.3777]
}
return (
    <div>
    <div className="pt-4 mt-3 container">
<div className='row'>
  <div className="col-md-8">
  <div className="degrees d-flex gap-2">
<button className="btn btn-primary" onClick={()=>setDegree('C')}>C</button>
<button className="btn btn-success" onClick={()=>setDegree('K')}>K</button>
</div>
  </div>
<div className="col-md-4">
 <form onSubmit={handleSubmit} className='form-search' >
    <div className='search-box'>
<input type="text" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder="Enter city name" className='searchInput'  autoComplete="yess"/>
<i className='search-icon'><BsSearch/></i>
{/* <ul>
  {
    input ? <li> <a>Use my location</a></li> 
    : <></>
    
  }

</ul> */}
</div>

  </form>

    </div>
    </div>

{ data.main ? (
<>
<div className="container">
<div className="row gap-1 mt-4">
<div className='col-md-4 current'>
  <div className=" current_box card_box">
    <h4>Now</h4>
<div className="description">
<div className='temp'>
<h2>
  
  {(data.main.temp-273.15+temp).toFixed()}°{degree}
  
  </h2>
</div>
<div className='behavior'>
{
data.weather[0].main==='Clouds' ? <a><FaCloud/> </a> :  data.weather[0].main==='Rain' ? <a><FaCloudRain/> </a>: <div><a><IoIosSunny/> </a></div>
}
</div>
</div>
<div>
<p className="pb-2">{data.weather[0].description}</p>
<div className="card_bottom">
<h5 className='mb-4'>{data.name}</h5>
<h5>{day}, {month} {date}</h5>
</div>

</div>
</div>
</div>
<div className='details col-md-8 cardbox'>
<h4 className="pt-4 text-center">Todays Highlights</h4>
<div className='row features card_box'>
<p className="details-title text-info">Sunrise & Sunset</p>
<div className="detail col-md-4">
<MdOutlineWbSunny />
<div>
<p >Sunrise</p>
<p className='bold'>{new Date(data.sys.sunrise*1000).toLocaleTimeString('en-US',{
  hour:"2-digit",
  minute:'2-digit'
})}</p>
</div>
</div>

<div className="detail col-md-4">
<FontAwesomeIcon icon={faMoon} />
<div>
<p >Sunset</p>
<p className='bold'>{new Date(data.sys.sunset*1000).toLocaleTimeString('en-US',{
  hour:"2-digit",
  minute:'2-digit'
})}</p>
</div>
</div>
{/* <div className="detail col-md-4">
<FontAwesomeIcon icon={faSun} />
<div>
<p >UV index</p>
<p className='bold'>{uvi}</p>
</div>
</div> */}
</div>

<div className="row features card_box pt-3">
<div className='feels col-md-4'>
<div className="detail">
<FontAwesomeIcon icon={faTemperatureHalf}  />
<div>
<p >Feel like </p>
<p className='bold'> {(data.main.feels_like-273.15+temp).toFixed(0)}°{degree}</p>
</div>
</div>
</div>
<div className="humidity col-md-4">
<div className="detail">
<FontAwesomeIcon icon={faDroplet} />
<div>
<p>Humidity </p>
<p className='bold'>{data.main.humidity}%</p>
</div>
</div>
</div>

 <div className="visibility col-md-4">
<div className="detail">
<MdOutlineVisibility/>
<div>
<p >Visibility</p>
<p className='bold'>{data.visibility/1000}km</p>
</div>
</div> 
</div>  
</div>
</div>
</div>
</div>
</>
) : (<Error/>)
}
<div className="container mt-5">

<Hourly hourly={hourly} degree={degree} temp={temp}/> 
<div className="mt-5 row">
<Daily daily={daily} degree={degree} temp={temp}/>
<div className="col-md-8">
<MapContainer className="rounded-3"  center={position} zoom={13} scrollWheelZoom={false} style={{height:'390px'}}  >
<TileLayer attribution=''
url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
<Map data={data}/>
</MapContainer>
</div>
</div>
</div>
</div>
{/* <NewsLetter/> */}
<About/>
<Footer/>
</div>

)
   
}
{/* <div className="col-md-4">
<div className='wind'>
<p className="details-title">Wind</p>
<div className="detail">
<FontAwesomeIcon icon={faWind} fontSize="3rem"/>
<div>
<p className="text-muted">Wind Speed</p>
<p className='bold'> {data.wind.speed} MPH</p>
</div>
</div>
</div>
</div> */}

export default Weather;