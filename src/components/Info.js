import { useState } from "react";
import borderData from "../data/border";

function Info(props) {
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  const [insideBorder, setInsideBorder] = useState(false);
  
  function startGame() {
    setGameRunning(true);
    let randLat = (Math.random() * 2 + 71.5) * -1//-73.5 to -71.5
    let randLong = Math.random() * 3.4 + 41.7 //45.1 to 41.7
    props.setMark([randLong, randLat]);
  }

  function quitGame() {
      setGameRunning(false);
  }

  return (
    <div>
        <h3>Mark is inside border: {insideBorder}</h3>
      <p>Lat and Long</p>
      <p>County and Town</p>
      <div>Direction Buttons</div>
      <div>
        <button onClick={startGame} disabled={gameRunning}>
          Start
        </button>
        <button disabled={!gameRunning}>Guess</button>
        <button onClick={quitGame} disabled={!gameRunning}>Quit</button>
      </div>
    </div>
  );
}

export default Info;
