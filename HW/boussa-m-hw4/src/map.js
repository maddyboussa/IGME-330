// I. Variables & constants
const accessToken = "pk.eyJ1IjoibWFkZHlib3Vzc2EiLCJhIjoiY2xvcDZ6dWRzMDN2bzJxbHRxZXc4M2R6MiJ9.kaF0dcrCEqcXUCd5VF5mIQ";
let map;

// An example of how our GeoJSON is formatted
// This will be replaced by the GeoJSON loaded from parks.geojson
let geojson = {
	type: "FeatureCollection",
	features: [{
		"type": "Feature",
		"id" : "p79",
		"properties": {
			"title": "Letchworth State Park",
			"description": "Letchworth State Park, renowned as the \"Grand Canyon of the East,\".",
			"url": "https://parks.ny.gov/parks/letchworth",
			"address": "1 Letchworth State Park, Castile, NY 14427",
			"phone": "(585) 493-3600"
		},
		"geometry": {
			"coordinates": [
				-78.051170,
				42.570148
			],
			"type": "Point"
		}
	}]
};

// II. "private" - will not be exported
const initMap = (center) => {
	mapboxgl.accessToken = accessToken;

	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11",
		center: center,
		zoom: 5.2
	});
	map.addControl(new mapboxgl.NavigationControl({showCompass:false}));
};

const addMarker = (feature, className, clickHandler) => {
	// create a map marker using feature (ie "park") data
	// the marker is a div and the classname will be "poi"
	const el = document.createElement('div');
	el.className = className;
	el.id = feature.id;

	// this is the html for the popup
	const html = `
	<b>${feature.properties.title}</b><br>
	${feature.properties.address}<br>
	<b>Phone: </b>${feature.properties.phone}
	`;

	// make the marker, add a popup, and add to map
	const marker = new mapboxgl.Marker(el)
		.setLngLat(feature.geometry.coordinates)
		.setPopup(new mapboxgl.Popup({offset: 10}).setHTML(html))
		.addTo(map);

	// call this method when marker is clicked on
	el.addEventListener("click", () => clickHandler(marker._element.id));
		
}


// III. "public" - will be exported
const addMarkersToMap = (json, clickHandler) => {
	geojson = json;	// replaces hard-coded json data

	// loop through features array and for each one add a marker to the map
	for (const feature of geojson.features)
	{
		addMarker(feature, "poi", clickHandler);
	}
};

const flyTo = (center = [0,0]) => {
	//https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto
	map.flyTo({ center: center });
};

const setZoomLevel = (value=0) => {
	// https://docs.mapbox.com/help/glossary/zoom-level/
	map.setZoom(value);
};

const setPitchAndBearing = (pitch=0,bearing=0) => {
	// https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/
	// https://docs.mapbox.com/mapbox-gl-js/example/set-perspective/
	map.setPitch(pitch);
	map.setBearing(bearing);
};

export { initMap, flyTo, setZoomLevel, setPitchAndBearing, addMarkersToMap };