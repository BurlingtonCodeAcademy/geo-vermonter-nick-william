import { useMap } from "react-leaflet";

function ReturnMap(props){
    props.setMapObj(useMap())
    return null;
}

export default ReturnMap;