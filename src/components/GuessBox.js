function GuessBox(props) {
  //stored jsx for county radio buttons in a function so it's collapsible
  function counties() {
    if (props.depth !== 1) {
      return null;
    }
    return (
      <div id={'guessRadio'}>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Addison County"}
          ></input>
          <label>Addison County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Bennington County"}
          ></input>
          <label>Bennington County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Caledonia County"}
          ></input>
          <label>Caledonia County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Chittenden County"}
          ></input>
          <label>Chittenden County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Essex County"}
          ></input>
          <label>Essex County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Franklin County"}
          ></input>
          <label>Franklin County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Grand Isle County"}
          ></input>
          <label>Grand Isle County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Lamoille County"}
          ></input>
          <label>Lamoille County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Orange County"}
          ></input>
          <label>Orange County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Orleans County"}
          ></input>
          <label>Orleans County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Rutland County"}
          ></input>
          <label>Rutland County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Washington County"}
          ></input>
          <label>Washington County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Windham County"}
          ></input>
          <label>Windham County</label>
        </div>
        <div>
          <input
            type={"radio"}
            name={"counties"}
            value={"Windsor County"}
          ></input>
          <label>Windsor County</label>
        </div>
      </div>
    );
  }
  //find checked radio button and check if it matches the correct county, change score or quit game as appropriate
  function makeGuess() {
    let radioButtons = Array.from(document.getElementsByName("counties"));
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        props.setDepth(-1);
        if (radio.value === props.county) {
          props.quit();
          alert("Correct!");
          return;
        } else {
          props.setScore(props.score - 10);
          alert("Wrong!");
        }
      }
    });
  }
  //stored jsx for buttons in function to make it easy to hide if guess box is not open
  function buttons() {
    if (props.depth !== 1) {
      return null;
    }
    return (
      <div id={'guessButtons'}>
        <button onClick={makeGuess}>Guess</button>
        <button onClick={() => props.setDepth(-1)}>Cancel</button>
      </div>
    );
  }

  return (
    <div id={'guessBox'} style={{ zIndex: props.depth }}>
      {counties()}
      {buttons()}
    </div>
  );
}

export default GuessBox;
