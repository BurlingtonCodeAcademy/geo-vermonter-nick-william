
import { useState } from "react";
import"./styles/Info.css"
import Map from './Map'
import Info from './Info'

function GameController(props) {
  const [zoom, setZoom] = useState(8);
  const [mapObj, setMapObj] = useState(null);

  const [mark, setMark] = useState(props.center);

  return (
    <>
      <div id="header">geoVermonter</div>
      <div id="gameContainer">
        <Map center={props.center} mark={mark} zoom={zoom} setMapObj={setMapObj}/>
        <div id="infoContainer">
        <Info setMark={setMark} mapObj={mapObj}/>
      </div>
      </div>
    </>
  );
}

export default GameController