import { useState, useEffect } from "react";
import borderData from "../data/border";
import leafletPip from "leaflet-pip";
import { geoJSON } from "leaflet";

function Info(props) {
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [displayLat, setDisplayLat] = useState('???');
  const [displayLong, setDisplayLong] = useState('???');
  const [county, setCounty] = useState('???');
  const [town, setTown] = useState('???');
  const [geo, setGeo] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  //const [insideBorder, setInsideBorder] = useState(false);

  useEffect(() => {
    if(shouldUpdate){
      fetch('https://nominatim.openstreetmap.org/reverse?lat=' + long + '&lon=' + lat + '&format=json').then(res => res.json()).then(jsonRes => setGeo(jsonRes))
      setShouldUpdate(false);
    }
  })

  function startGame() {
    if(props.mapObj){
      setGameRunning(true);
    let inVermont = false;
    let randLat = 0;
    let randLong = 0;
    while (!inVermont) {
      randLat = (Math.random() * 2 + 71.5) * -1; //-73.5 to -71.5
      randLong = Math.random() * 3.4 + 41.7; //45.1 to 41.7
      inVermont =
        leafletPip.pointInLayer([randLat, randLong], geoJSON(borderData))
          .length > 0;
    }
    props.setMark([randLong, randLat]);
    setLat(randLat);
    setLong(randLong);
    props.mapObj.setView([randLong, randLat],18);
    setDisplayLat('???');
    setDisplayLong('???');
    setCounty('???');
    setTown('???');
    setShouldUpdate(true);
    }
  }

  function quitGame() {
    setGameRunning(false);
    setDisplayLat(lat.toPrecision(4));
    setDisplayLong(long.toPrecision(4));
    console.log(geo);
    console.log('https://nominatim.openstreetmap.org/reverse?lat=' + long + '&lon=' + lat + '&format=json')
    setCounty(geo.address.county);
    setTown(geo.address.city || geo.address.town || geo.address.village);
  }

  return (
    <div>
      {/*<h3>Mark is inside border: {insideBorder ? 'true' : 'false'}</h3>*/}
      <p>Lat: {displayLong}, Long: {displayLat}</p>
      <p>{county}, {town}</p>
      <div>Direction Buttons</div>
      <div>
        <button onClick={startGame} disabled={gameRunning}>
          Start
        </button>
        <button disabled={!gameRunning}>Guess</button>
        <button onClick={quitGame} disabled={!gameRunning}>
          Quit
        </button>
      </div>
    </div>
  );
}

export default Info;
