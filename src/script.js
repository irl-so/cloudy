//setting the map
var map = L.mapbox.map('map', 'lifewinning.map-0lnszm21', {zoomControl: false})
    .setView([38.9258, -77.2236], 11);
var ui = document.getElementById('map-ui');

new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
//now when we scroll down through text the map won't zoom all crazylike unless we tell it to
//map.scrollWheelZoom.disable();

var markerIcon = L.icon({
			    iconURL:"src/marker.png",
			    iconSize:     [20, 20], 
			    iconAnchor:   [10,10], 
			});

L.geoJson(phone_data, {
	onEachFeature: function (feature, layer){
		icon: markerIcon;
	}
}).addTo(map);

var hash = new L.Hash(map);
