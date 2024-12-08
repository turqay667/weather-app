import { FaCloud, FaCloudRain, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";

const Hourly=({hourly})=>{
 
    return (
  <div>
        { hourly && hourly.length>0 ? (
            
            <Swiper slidesPerView={4}
            spaceBetween={10}
           pagination={true}
            >
             {hourly.map((data, index)=>{
                  return (
                    <>
                      <SwiperSlide  className="hours card_box" key={index}>
        <div className="day">{data.time.replace(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm, '')}</div>
   
        <a className="icon">{data.condition.text.includes('rain') ? <FaCloudRain/> : data.condition.text.includes('cloudy')  ? ( <FaCloud/> ) : <IoIosSunny/>}</a>
<div className="temperature">{(data.temp_c).toFixed(0)}°C</div>
                      </SwiperSlide>      
              </>
                   );
                   
               })} 
                   </Swiper>
          
        ) : (
   <>No hourly data available</>
        
        )}
        </div>
       )
      
}
export default Hourly;