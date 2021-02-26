
import { useState } from "react";

import Map from './Map'
import Info from './Info'

function GameController(props) {
  const [mapObj, setMapObj] = useState(null);

  const [mark, setMark] = useState(props.center);

  return (
    <div>
      <Map center={props.center} mark={mark} setMapObj={setMapObj}/>
      <Info setMark={setMark} mapObj={mapObj}/>
    </div>
  );
}

export default GameController