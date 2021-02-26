import { polyline } from "leaflet";

function DirectionButton(props) {
    function changeView(changeLat, changeLong) {
        props.mapObj.setView([props.viewLong + changeLong, props.viewLat + changeLat]);
        let newLine = polyline([[props.viewLong, props.viewLat],[props.viewLong + changeLong, props.viewLat + changeLat]], {color: 'darkred', dashArray: '4'});
        newLine.addTo(props.mapObj);
        props.mapLines.push(newLine);
        props.setViewLat(props.viewLat + changeLat);
        props.setViewLong(props.viewLong + changeLong);
        props.setScore(props.score - 1);
    }
    function move() {
        switch(props.direction){
            case 'North':
                changeView(0, 0.002);
                break;
            case 'East':
                changeView(0.002, 0);
                break;
            case 'South':
                changeView(0, -0.002);
                break;
            case 'West':
                changeView(-0.002, 0);
                break;
        }
    }
    return <button id={'move' + props.direction} onClick={move} disabled={!props.gameRunning}>{props.direction}</button>;
}

export default DirectionButton;