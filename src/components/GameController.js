
import { useState } from "react";
import"./styles/Info.css"
import Map from './Map'
import Info from './Info'

//primary container component
function GameController(props) {
  //State to hold map for later manipulation
  const [mapObj, setMapObj] = useState(null);
  //State to hold coordinates for mark
  const [mark, setMark] = useState(props.center);

  return (
    <>
      <div id="header">GeoVermonter</div>
      <div id="gameContainer">
        <Map center={props.center} mark={mark} setMapObj={setMapObj}/>
        <div id="infoContainer">
        <Info setMark={setMark} mapObj={mapObj}/>
      </div>
      </div>
    </>
  );
}

export default GameController