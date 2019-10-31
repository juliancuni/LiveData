"use strict";

const lFMap = L.map("liveDataMap").setView([41.3409818, 20.2289261], 8);
const attrib = '<a href="http://rallyalbania.org">Rally Albania</a> | © <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors';
const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attrib });

tiles.addTo(lFMap);


const api_uri = 'http://localhost:3000/api/mjetetgps';

let pilotMarkers = [];


async function getMjetetPosition() {

    const response = await fetch(api_uri);
    const mjetetData = await response.json();
    for (let i = 0; i < mjetetData.length; i++) {

        let marker = L.marker([mjetetData[i].CordY, mjetetData[i].CordX]).bindTooltip(mjetetData[i].Pilot).openTooltip().on('click', clickZoom).addTo(lFMap);

        pilotMarkers.push(marker);
    }

}
let featureGroup = L.featureGroup(pilotMarkers);
lFMap.fitBounds(featureGroup.getBounds());

function clickZoom(e) {
    lFMap.setView(e.target.getLatLng());
}

getMjetetPosition();
setInterval(getMjetetPosition, 5000);
