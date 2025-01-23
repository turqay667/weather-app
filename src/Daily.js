import { FaCloud, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";
function Daily({daily}){

    return (
      <>
      <h2 className="mb-5">5-Day Forecast </h2>
        <div className="daily mb-5 card_box col-md-4">
       { daily && daily.length>0 ? daily.map((data, index)=>{
         const date=new Date(data.dt*1000).toLocaleDateString("en-US", {weekday:"long"})
         const temperature=data.main.temp-273.15
         const condition=data.weather[0].main
           return (
            
<div key={index} className="day">
<a className="icon">{condition==='Clouds' ? <FaCloud/> : <IoIosSunny/>}</a>
<div className="temperature">{((temperature+273).toFixed())}°C</div>
<div className="date">{date}</div>

        </div>  
      
            );
        }) : <div className="text-center">No daily data available</div>}
    </div>
    </>
    )

}
export default Daily;