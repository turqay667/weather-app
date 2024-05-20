
import './App.css';
import {BsSearch} from "react-icons/bs"
import { useEffect, useState } from 'react';

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
  console.log(data)
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
      <div className="container pt-5">
        <div className='app-title'>  
        <h1 className='text-white pb-4 text-center'>Get  the current weather</h1>     
        </div>
        <form onSubmit={handleSubmit} className='form-search pb-4'>
         
          <div className='search-box'>
<input type="search" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder="Enter city name" className='searchInput'/>
<butto className="btn btn-info text-white"><BsSearch/></butto>
</div>
        </form>
   
  <div className='text-white cardBox'>
<div className='heading'>


{(typeof data.main!= "undefined") ?   (   <h1 className='mb-4'>{data.name}</h1>) :(<div className='mb-3'>Search...</div>)}
 
  <h4>{day}, {month} {date}, {year}</h4>

  </div>

{(typeof data.main!= "undefined") ? (

  <>
  

<div className='details '>
<div className='temp'>
<h2>{data.main.temp}°F</h2>
</div>
<div className='weather mt-4 mb-4'>
 <h4>{data.weather[0].main}</h4> 
</div>
<div className='d-flex bottom justify-content-evenly'>
  <div className='feels'>
   <p className='bold'> {data.main.feels_like}°F</p>
    <p>Feels Like</p>
  </div>
<div className='humidity'>
<p className='bold'>{data.main.humidity}%</p>
  <p>Humidity</p>
</div>
<div className='wind'>
<p className='bold'> {data.wind.speed} MPH</p>
<p >Wind Speed</p>
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
