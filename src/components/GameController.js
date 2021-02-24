import { useState } from "react";

import Map from './Map'
import Info from './Info'

function GameController(props) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [county, setCounty] = useState('');
  const [town, setTown] = useState('');

  const [mark, setMark] = useState(props.center);

  return (
    <div>
      <Map center={props.center} mark={mark} />
      <Info setMark={setMark}/>
    </div>
  );
}

export default GameController