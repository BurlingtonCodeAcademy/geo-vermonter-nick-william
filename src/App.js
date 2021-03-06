import './components/styles/App.css';
import { useState } from 'react'

import GameController from "./components/GameController";

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])

  return (
    <div>
      <GameController center={center} setCenter={setCenter} />
    </div>
  );
}

export default App;
