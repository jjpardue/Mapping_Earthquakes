// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup();
    }
    
  }).addTo(map);

// Coordinates for each point to be used in the polyline.
let line = [
    [37.6213, -122.3790],
    [30.1899, -97.6686],
    [43.6775, -79.6308],
    [40.6417, -73.7809]
    
  ];

// Create a polyline using the line coordinates and make the line black.
L.polyline(line, {
    color: "blue",
    weight: "4",
    dashArray: '20, 20', dashOffset: '0',
    opacity: '0.5'

 }).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});

// Add a circle to the map
L.circleMarker([34.0522, -118.2437], {
    radius: 300, 
    color: "black", 
    fillColor: '#ffffa1'
}).addTo(map);

// Loop through the cities array and create one marker for each city.
cities.forEach(function(city) {
    console.log(city)
    L.marker(city.location).addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);