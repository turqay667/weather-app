import { FaCloud, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";
function Daily({daily, degree, temp}){
console.log(daily)
    return (
      <>
      <h2 className="mb-5 pt-5">5-Day Forecast </h2>
        <div className="daily mb-5 card_box col-md-4">
       { daily && daily.length>0 ? daily.map((data, index)=>{
         const date=new Date(data.dt*1000).toLocaleDateString("en-US", {
          weekday:"short",
          day:'numeric',
          month:"short",
      
        })
         const temp_min=data.main.temp_min-273.15
         const temp_max=data.main.temp_max-273.15
         const condition=data.weather[0].main
           return (
            
<div key={index} className="day">
<a className="icon">{condition==='Clouds' ? <FaCloud/> : <IoIosSunny/>}</a>
<div className="temperature">{((temp_max+273.15+temp).toFixed())}° / {((temp_min+273.15+temp).toFixed())} °{degree}</div>
<div className="date">{date}</div>

        </div>  
      
            );
        }) : <div className="text-center">No daily data available</div>}
    </div>
    </>
    )

}
export default Daily;