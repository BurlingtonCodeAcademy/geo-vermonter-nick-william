import "./styles/Info.css";
import { useState, useEffect } from "react";
import borderData from "../data/border";
import leafletPip from "leaflet-pip";
import { geoJSON } from "leaflet";
import GuessBox from "./GuessBox";
import DirectionButton from "./DirectionButton";

function Info(props) {
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [viewLat, setViewLat] = useState(0);
  const [viewLong, setViewLong] = useState(0);
  const [displayLat, setDisplayLat] = useState("???");
  const [displayLong, setDisplayLong] = useState("???");
  const [county, setCounty] = useState("???");
  const [town, setTown] = useState("???");
  const [displayCounty, setDisplayCounty] = useState("???");
  const [displayTown, setDisplayTown] = useState("???");
  const [geo, setGeo] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [guessDepth, setGuessDepth] = useState(-1);
  const [mapLines, setMapLines] = useState([]);

  useEffect(() => {
    if (shouldUpdate) {
      fetch(
        "https://nominatim.openstreetmap.org/reverse?lat=" +
          long +
          "&lon=" +
          lat +
          "&format=json"
      )
        .then((res) => res.json())
        .then((jsonRes) => setGeo(jsonRes));
      setShouldUpdate(false);
    }
  });

  function startGame() {
    if (props.mapObj) {
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
      props.mapObj.setView([randLong, randLat], 18);
      setViewLat(randLat);
      setViewLong(randLong);
      setDisplayLat("???");
      setDisplayLong("???");
      setDisplayCounty("???");
      setDisplayTown("???");
      setScore(100);
      setShouldUpdate(true);
    }
  }

  function quitGame() {
    setGameRunning(false);
    setDisplayLat(lat.toPrecision(4));
    setDisplayLong(long.toPrecision(4));
    console.log(geo);
    console.log(
      "https://nominatim.openstreetmap.org/reverse?lat=" +
        long +
        "&lon=" +
        lat +
        "&format=json"
    );
    setDisplayCounty(geo.address.county);
    setDisplayTown(
      geo.address.city ||
        geo.address.town ||
        geo.address.village ||
        geo.address.hamlet
    );
    mapLines.forEach((line) => {
      props.mapObj.removeLayer(line);
    });
    while (mapLines.length > 0) {
      mapLines.pop();
    }
  }

  function guess() {
    setGuessDepth(1);
    setCounty(geo.address.county);
    setTown(
      geo.address.city ||
        geo.address.town ||
        geo.address.village ||
        geo.address.hamlet
    );
  }

  return (
    <div id={"infoBox"}>
      <div id={'latLongContainer'}>
      <p id={'latDisplay'}>Lat: {displayLong}</p>
      <p id={'longDisplay'}>Long: {displayLat}</p>
      </div>
      <p id={"countyTownDisplay"}>
        {displayCounty}, {displayTown}
      </p>
      <p id={"scoreDisplay"}>Score: {score}</p>
      <div id={"directionButtons"}>
        <DirectionButton
          direction={"North"}
          viewLat={viewLat}
          viewLong={viewLong}
          setViewLat={setViewLat}
          setViewLong={setViewLong}
          mapObj={props.mapObj}
          score={score}
          setScore={setScore}
          gameRunning={gameRunning}
          mapLines={mapLines}
        />
        <DirectionButton
          direction={"East"}
          viewLat={viewLat}
          viewLong={viewLong}
          setViewLat={setViewLat}
          setViewLong={setViewLong}
          mapObj={props.mapObj}
          score={score}
          setScore={setScore}
          gameRunning={gameRunning}
          mapLines={mapLines}
        />
        <DirectionButton
          direction={"South"}
          viewLat={viewLat}
          viewLong={viewLong}
          setViewLat={setViewLat}
          setViewLong={setViewLong}
          mapObj={props.mapObj}
          score={score}
          setScore={setScore}
          gameRunning={gameRunning}
          mapLines={mapLines}
        />
        <DirectionButton
          direction={"West"}
          viewLat={viewLat}
          viewLong={viewLong}
          setViewLat={setViewLat}
          setViewLong={setViewLong}
          mapObj={props.mapObj}
          score={score}
          setScore={setScore}
          gameRunning={gameRunning}
          mapLines={mapLines}
        />
      </div>
      <button
        onClick={() => {
          props.mapObj.setView([long, lat]);
          setViewLong(long);
          setViewLat(lat);
        }}
        disabled={!gameRunning}
      >
        Return
      </button>
      <div id={"gameControlButtons"}>
        <button onClick={startGame} disabled={gameRunning}>
          Start
        </button>
        <button onClick={guess} disabled={!gameRunning}>
          Guess
        </button>
        <button onClick={quitGame} disabled={!gameRunning}>
          Quit
        </button>
      </div>
      <GuessBox
        depth={guessDepth}
        setDepth={setGuessDepth}
        county={county}
        quit={quitGame}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

export default Info;
