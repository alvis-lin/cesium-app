// This file holds the functions to track user's current location, 
// send the latitude and longitude to page for the question setting form and put a marker on the map

console.log("loading js file")

// get user location and show it on the map using a marker, then zoom in to the marker
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
var userLocationLayer; 
function addUserToMap(position) { 
	console.log("This is add mark func")

	var zoom = 16;
	// create a geoJSON feature  
	var geojsonFeature = { 
		"type": "Feature", 
		"properties": { 
			"name": "User", 
			"popupContent": "This is where you are." 
		}, 
		"geometry": { 
			"type": "Point", 
			"coordinates": [position.coords.longitude, position.coords.latitude] 
		} 
	}; 

	// and add it to the map 
	userLocationLayer = L.geoJSON(geojsonFeature, {
		pointToLayer: function (feature, latlng) { 
			return L.marker(latlng); 
		} 
	}).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.popupContent+"<b>");
	
	// centre the view with user location
	mymap.setView([position.coords.latitude, position.coords.longitude],zoom);


	console.log("added user location")
} // end code to add the basic markers


// to remove user marker from the map
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function removeUserData() { 
	mymap.removeLayer( userLocationLayer ); 
}


// check if it is allowed to get geolocation, 
// then run the function to get user current location if it is allowed, 
// or send the text to page telling user geolocation is not supported by this browser
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function trackLocation() { 
	if (navigator.geolocation) { 
		navigator.geolocation.watchPosition(showPosition); 
	} else { 
		document.getElementById('showUserLocationLat').innerHTML = "Geolocation is not supported by this browser.";
		document.getElementById('showUserLocationLng').innerHTML = "Geolocation is not supported by this browser.";
	} 
} 

// pass user location latitude and longitude to the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function showPosition(position) { 
	document.getElementById('showUserLocationLat').innerHTML = position.coords.latitude; // pass user latitude to page
	document.getElementById('showUserLocationLng').innerHTML = position.coords.longitude; // pass user longitude to page

	// update user location marker position when user location has changed
	if (userLocationLayer){
		removeUserData(); // remove the previous user location marker
	}
	addUserToMap(position); // add the new marker on the map
}





















