import { FaCloud, FaCloudRain, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";

const Hourly=({hourly})=>{
 
    return (

  <div>
        { hourly && hourly.length>0 ? (
             
            
            <Swiper slidesPerView={2}
            spaceBetween={5}
           pagination={true}
            >
             {hourly.map((data, index)=>{
              const current=new Date()
              const time=new Date(data.time)
             if(time>=current){
                    const hour=time.getHours()
                  return (
                    <>
                      <SwiperSlide  className="hours card_box" key={index}>
        <div className="day">{hour}:00</div>   
        <a className="icon">{data.condition.text.includes('rain') ? <FaCloudRain/> : data.condition.text.includes('cloudy')  ? ( <FaCloud/> ) : <IoIosSunny/>}</a>
<div className="temperature">{(data.temp_c).toFixed(0)}°C</div>
                      </SwiperSlide>      
              </>
                   );
                  }
                   
               })} 
                   </Swiper>
          
        ) : (
   <div className="text-center">No hourly data available</div>
        
        )}
        </div>
       )
      
}
export default Hourly;