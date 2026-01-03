
import { useEffect } from "react";
import { useMap } from "react-leaflet";
const Map=({data})=>{
  
    const map=useMap()  
    
        useEffect(()=>{
            if(data && data.coord){
            map.flyTo([data.coord.lat, data.coord.lon], 15, {
                animate:true,
                duration:1.5
                  }
            )
              }
        },[data, map])

return null;
}
export default Map;