function init(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFkZHlib3Vzc2EiLCJhIjoiY2xvcDZ6dWRzMDN2bzJxbHRxZXc4M2R6MiJ9.kaF0dcrCEqcXUCd5VF5mIQ';

    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-96, 37.8],
    zoom: 3
    });

    // code from the next step will go here!
    const geojson = {
    type: 'FeatureCollection',
    features: [
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
        },
        properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
        }
        },
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
        },
        properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
        }
        },
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77.601509, 43.152470]
        },
        properties: {
            title: 'Strong Museum of Play',
            description: 'Rochester, NY'
        }
        }
    ]
    };

    // add markers to map
    for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(map);
    }
}

export {init};