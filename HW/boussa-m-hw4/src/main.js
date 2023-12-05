import * as map from "./map.js";
import * as ajax from "./ajax.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = ["p20","p79","p180","p43"];
let currentId = "";

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};
	
	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	};
	
	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatUSA);
	};

	// favorite button
	document.querySelector("#btn-favorite").onclick = () => {
		console.log("fav clicked")

		// create favorite element for this
		const favoritesContainer = document.querySelector("#favorites-list");
		favoritesContainer.appendChild(createFavoriteElement(currentId));

		// add this id to the favoriteIds list
		favoriteIds.push(currentId);

		refreshButtons(currentId);
	}

	// delete button
	document.querySelector("#btn-delete").onclick = () => {
		console.log("delete clicked");

		// reomve favorite element for this

		// remove this id from the favoriteIds list
	}


	refreshFavorites();

}

const getFeatureById = (id) => {
	// search geojson features for the park feature with the id we want
	for (const feature of geojson.features)
	{
		if (feature.id == id)
		{
			return feature;
		}
	}
}

const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);

	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;

	// show park contact info
	document.querySelector("#details-2").innerHTML = `
		<b>Address: </b> ${feature.properties.address}<br>
		<b>Phone: </b> <a href="${feature.properties.phone}">${feature.properties.phone}</a><br>
		<b>Website: </b> <a href="${feature.properties.url}" target="_blank">${feature.properties.url}</a>
	`;

	// show park details
	document.querySelector("#details-3").innerHTML = feature.properties.description;

	// update value of currentId to reflect that this feature is selected
	currentId = id;

	refreshButtons(id);
};

const refreshButtons = (id) => {
	// show appropriate favorite/delete buttons
	if (getIsFavorite(id))
	{
		// if its already a favorite, enable delete button and disable favorite
		document.querySelector("#btn-delete").disabled = false;
		document.querySelector("#btn-favorite").disabled = true;
	}
	else
	{
		// if not a favorite, enable favorite button and disable delete
		document.querySelector("#btn-favorite").disabled = false;
		document.querySelector("#btn-delete").disabled = true;
	}
}

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a;
};

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds)
	{
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
};

const getIsFavorite = (id) => {
	for (const listId of favoriteIds)
	{
		if (id == listId)
		{
			return true;
		}
	}
	return false;
}

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		// add markers to map
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	})
};

init();