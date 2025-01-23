import { FaCloud, FaCloudRain, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import  {Swiper,SwiperSlide}  from "swiper/react";

const Hourly=({hourly})=>{
 
    return (
      <>
{/* <h2 className="pt-4 pb-4 text-center"> Today at</h2>  */}
  <div className="col-md-8">
  
        { hourly && hourly.length>0 ? (
             
            
            <Swiper slidesPerView={3}
           pagination={true}
           grid={{
            rows:2
           }}
            >
             {hourly.map((data, index)=>{
              console.log(data)
              const current=new Date()
              const time=new Date(data.dt_txt)
             if(time>=current){
                    const hour=time.getHours()
                  return (
                    <>
                      <SwiperSlide  className="hours card_box" key={index}>
        <div className="day">{hour}:00</div>   
        <a className="icon">{data.weather[0].description.includes('rain') ? <FaCloudRain/> : data.weather[0].description.includes('clouds')  ? ( <FaCloud/> ) : <IoIosSunny/>}</a>
<div className="temperature">{(data.main.temp).toFixed(0)}°C</div>
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