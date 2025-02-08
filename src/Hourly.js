import { FaCloud, FaCloudRain, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide,}  from "swiper/react";
import {Autoplay} from "swiper/modules"
const Hourly=({hourly, degree, temp})=>{
 
    return (
      <>
<h2 className="pt-4 pb-4 text-center"> Today at</h2>  
  <div className="row">
  
        { hourly && hourly.length>0 ? (
             
            
            <Swiper 
            slidesPerView={7}
           pagination={true}
           loop={true}
           autoplay={{ delay:1000, disableOnInteraction:false }}
            modules={[ Autoplay ]}
            initialSlide={0}
        
      
            >
             {hourly.map((data, index)=>{
              // for (let i=0; i<8;i++){

              // }
              const current=new Date()
              const time=new Date(data.dt_txt)
             if(time>=current){
                    const hour=time.getHours()
                  return (
                    <>
                      <SwiperSlide  className="hours card_box" key={index}>
        <div className="day">{hour}:00</div>   
        <a className="icon">{data.weather[0].description.includes('rain') ? <FaCloudRain/> : data.weather[0].description.includes('clouds')  ? ( <FaCloud/> ) : <IoIosSunny/>}</a>
<div className="temperature">{(data.main.temp+temp).toFixed(0)}°{degree}</div>
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
        </>
       )
      
}
export default Hourly;