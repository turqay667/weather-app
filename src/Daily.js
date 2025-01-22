import { FaCloud, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";
function Daily({daily}){

    return (
      
        <div className="daily mt-4 mb-5 col">
            <Swiper slidesPerView={2}
            spaceBetween={5}
           pagination={true}>

       { daily && daily.length>0 ? daily.map((data, index)=>{
         const date=new Date(data.dt*1000).toLocaleDateString("en-US", {weekday:"long"})
         const temperature=data.main.temp-273.15
         const condition=data.weather[0].main
           return (
            
<SwiperSlide className="card_box" key={index}>
<div className="day">{date}</div>
<a className="icon">{condition==='Clouds' ? <FaCloud/> : <IoIosSunny/>}</a>
<div className="temperature">{(temperature.toFixed(0))}°C</div>
        </SwiperSlide>  
      
            );
        }) : <div className="text-center">No daily data available</div>}
   </Swiper>
    </div>
   
    )

}
export default Daily;