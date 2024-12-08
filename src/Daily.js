import { FaCloud, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
function Daily({daily}){

    return (
        <div className="daily mt-4 mb-5">
       { daily && daily.length>0 ? daily.map((data, index)=>{
         const date=new Date(data.dt*1000).toLocaleDateString("en-US", {weekday:"long"})
         const temperature=data.main.temp-273.15
         const condition=data.weather[0].main
           return (
                
<div className="card_box" key={index}>
<div className="day">{date}</div>
<a className="icon">{condition==='Clouds' ? <FaCloud/> : <IoIosSunny/>}</a>
<div className="temperature">{(temperature.toFixed(0))}°C</div>
        </div>
       
            );
        }) : <div className="text-center">No daily data available</div>}
    </div>
    )

}
export default Daily;