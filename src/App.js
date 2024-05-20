
import './App.css';
import {BsSearch} from "react-icons/bs"
import { useEffect, useState } from 'react';
import { FaWind } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa";
function App() {
  const [data,setData]=useState([])
  const [location,setLocation]=useState('London')
  const [input,setInput]=useState('')
  
let componentMounted=true

const d=new Date()
const date=d.getDate()
const day=d.toLocaleString("default",{weekday:'long'})
const year=d.getFullYear()
const month=d.toLocaleString("default",{month:'long'})

useEffect(()=>{
const fetchWeather=async()=>{
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ff2b0f18235b8cf43d40e92641f6aae1`)
if(componentMounted){
  setData(await response.json())

}
return ()=>{
componentMounted=false
}
}
fetchWeather()
},[location])

const handleSubmit=(event)=>{
  event.preventDefault()
  setLocation(input)
}
  return (
  
    <div className="App">
      <div className=" pt-5">
        <div className='app-title'>  
        <h1 className='text-white pb-4 text-center'>Get  the current weather</h1>     
        </div>
      
   
  <div className='text-white cardBox'>
  <form onSubmit={handleSubmit} className='form-search pb-4'>
         
         <div className='search-box'>
<input type="search" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder="Enter city name" className='searchInput'/>
<button className="btn btn-info text-white"><BsSearch/></button>
</div>
       </form>
<div className='heading'>


{(typeof data.main!= "undefined") ?   (   <h1 className='mb-4'>{data.name}</h1>) :(<div className='mb-3'>Search...</div>)}
 
  <h4>{day}, {month} {date}, {year}</h4>

  </div>

{(typeof data.main!= "undefined") ? (

  <>
  

<div className='details mt-4'>
<div className='temp'>
<h2>{data.main.temp}°F</h2>
</div>
<div className='weather mt-4 mb-4'>
 <h4>{data.weather[0].main}</h4> 
</div>
<div className='features d-flex justify-content-evenly'>
  <div className='feels card_box'>
<FaTemperatureLow fontSize={32}/>
    <div className='bottom'>
    <p>Feels </p>
    <p className='bold'> {data.main.feels_like}°F</p>
    </div>
  </div>
<div className='humidity card_box'>
<BsDroplet fontSize={32}/>
<div className='bottom'>
<p>Humidity</p>
<p className='bold'>{data.main.humidity}%</p>
</div>

</div>
<div className='wind card_box'>
  <FaWind fontSize={32}/>
  <div className='bottom'>
<p >Wind </p>
<p className='bold'> {data.wind.speed} MPH</p>
  </div>

</div>
</div>
</div>

</>
) : ('')
}
</div>
</div>
</div>

  );
}

export default App;
