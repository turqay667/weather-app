import { FaCloud, FaCloudRain, FaRainbow } from "react-icons/fa"
import { IoIosSunny } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Hourly=({hourly, degree, temp})=>{
  const currentTime=new Date()
  const hours=new Date(currentTime.getTime()+24*60*60*1000)
    const hourlyData=hourly.filter((item)=>{
    const time=new Date(item.dt*1000)
    return time>currentTime && time <=hours
    })
    var settings = {
      dots: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive:[
        {
          breakpoint:1024,
          settings:{
            slidesToShow:3

          }       
        
        },
        {
          breakpoint:600,
          settings:{
            slidesToShow:2

          }       
        
        },
        {
          breakpoint:480,
          settings:{
            slidesToShow:1
          
          }       
        
        }
      ]
    
    };
    return (
      <>
<h2 className="pt-4 pb-4 text-center"> Today at</h2>  
  <div className="row">
        { hourlyData && hourlyData.length>0 ? (       
        <Slider  {...settings}>
        {hourlyData.map((data, index)=>{
              const time=new Date(data.dt*1000)
                const hour=time.getHours()
                  return (
                    <>
                      <div className="hours card_box" key={index}>
        <div className="day">{hour}:00</div>   
        <a className="icon">{data.weather[0].description.includes('rain') ? <FaCloudRain/> : data.weather[0].description.includes('clouds')  ? ( <FaCloud/> ) : <IoIosSunny/>}</a>
<div className="temperature">{(data.temp-272+temp).toFixed(0)}°{degree}</div> 
                      </div>      
              </>
                   );
               })} 
              </Slider>     
          
        ) : (
   <div className="text-center">No hourly data available</div>
        
        )}
        </div>
        </>
       )
      
}
export default Hourly;