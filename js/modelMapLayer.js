// This file holds functions to load leafletmap to the page, 
// show the latitude and longitude where user click on the map and pass the value to question setting form, 
// show/hide map layer with the questions created by the user in question setting app
// show/hide map layer with the questions created by all users in the last week in question setting app



// load the map 
var mymap; // global variable to store the map 

// create a custom popup as a global variable 
var popup = L.popup(); 


// create an event detector to wait for the user's click event and then use the popup to show them where they clicked 
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you 
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function onMapClick(e) { 
	console.log("This func shows latlng when click on map")
	popup 
		.setLatLng(e.latlng) 
		.setContent("You clicked the map at " + e.latlng.toString()) 
		.openOn(mymap);

	// Pass the latlng value to form when user click on the map
	// Adapted from: https://gis.stackexchange.com/questions/283028/add-coordinates-after-click-into-form
	// Accessed on 5 April 2020
	var lat = e.latlng.lat;
	var lng = e.latlng.lng;
	document.getElementById("latitude").value = lat;
	document.getElementById("longitude").value = lng;
}



// the function to load leaflet map to the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function loadLeafletMap() { 
	console.log("This is loadLeafletMap func")
	mymap = L.map('mapid').setView([51.505, -0.09], 13);

	// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { 
		maxZoom: 18, 
		attribution: 
			'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + 
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 
			'Imagery © <a href="http://mapbox.com">Mapbox</a>', 
		id: 'mapbox.streets' 
	}).addTo(mymap);
	console.log("Map loaded")

	// now add the click event detector to the map 
	mymap.on('click', onMapClick);

} //end code to add the leaflet map function 




// to get the questions set by myself (according to port_id)
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function getMyData(position) { 
	$.ajax({
		url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/" +httpsPortNumberAPI, 
		crossDomain: true, 
		success: function(result){
			console.log("my questions:", result);
			loadMyData(result); 
		}
	}); 
} 



// get questions I have created to a map layer and show them on the map
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
var myLayer; 
function loadMyData(myData) { 
	// convert the text received from the server to JSON 
	//var formJSON = JSON.parse(formData); 

	// load the geoJSON layer 
	myLayer = L.geoJson(myData, { 
		// use point to layer to create the points 
		pointToLayer: function (feature, latlng) {

			var markerBlue = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'blue' });
			// build a HTML div string using the values in data
			var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>"; 
			htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1' checked='yes'/>"+feature.properties.answer_1+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
			htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";

			// include a hidden element with the answer
			// the correct answer is set to the 1st one
			// can use feature.properties.correct answer
			htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>"+feature.properties.correct_answer+"</div>"; 
			htmlString = htmlString + "</div>"; 
			return L.marker(latlng,{icon:markerBlue}).bindPopup(htmlString); 
		}, 
	}).addTo(mymap); 
	mymap.fitBounds(myLayer.getBounds()); 
	
}



// check if it is allowed to get user location for getting the questions near them and start getting the questions,
// or tell the user when geolocation is not supported by the browser
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function showNearQuestions(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(queryNearQuestions);
		alert("getting nearest questions")
	}else{
		alert("Geolocation is not supported by this browser.");
	}
}



// get the 5 questions near user to a map layer and add to map
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
var nearLayer;
function queryNearQuestions(position){
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+httpsPortNumberAPI+ "/getNearQuestions/" +position.coords.latitude+ "/" +position.coords.longitude;
	$.ajax({ 
		url: serviceUrl, 
		crossDomain: true, 
		success: function(result){
			nearLayer = L.geoJson(result, { 
				// use point to layer to create the points 
				pointToLayer: function (feature, latlng) {
					var markerPurple = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'purple' });
					console.log(latlng);
					return L.marker(latlng,{icon:markerPurple}).bindPopup(feature.properties.question_text); 
				}, 
			}).addTo(mymap); 
			mymap.fitBounds(nearLayer.getBounds()); 
		}
	}); 
} 



// to remove the 5 questions near the user
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function removeNearQuestions(){
	mymap.removeLayer(nearLayer);
}




// get the questions added in the last week to a map layer
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
var weekLayer;
function showWeekQuestions(){
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+httpsPortNumberAPI+ "/getWeeklyQuestions";
	$.ajax({ 
		url: serviceUrl, 
		crossDomain: true, 
		success: function(result){
			weekLayer = L.geoJson(result, { 
				// use point to layer to create the points 
				pointToLayer: function (feature, latlng) {
					var markerOrange = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'orange' });
					console.log(latlng);
					return L.marker(latlng,{icon:markerOrange}).bindPopup(feature.properties.question_text); 
				}, 
			}).addTo(mymap); 
			mymap.fitBounds(weekLayer.getBounds()); 
		}
	}); 
} 


// remove the questions added in the last week from the map
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function removeWeekQuestions(){
	mymap.removeLayer(weekLayer);
}




// get the last 5 questions user answered to a map layer
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
var lastFiveLayer;
function showLastFive(){
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+httpsPortNumberAPI+ "/getLastFive/"+httpsPortNumberAPI;
	$.ajax({ 
		url: serviceUrl, 
		crossDomain: true, 
		success: function(result){
			console.log("5 answer:",result);
			lastFiveLayer = L.geoJson(result, { 
				// use point to layer to create the points 
				pointToLayer: function (feature, latlng) {

					// build a HTML div string using the values in data
					var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>"; 
					htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>"; 
					htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1' checked='yes'/>"+feature.properties.answer_1+"<br>"; 
					htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>"; 
					htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>"; 
					htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
					htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
					htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>"+feature.properties.correct_answer+"</div>"; 
					htmlString = htmlString + "</div>"; 

					var markerGreen = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'green' });
					var markerRed = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'red' });
					if(feature.properties.answer_correct){
						return L.marker(latlng,{icon:markerGreen}).bindPopup("You got it RIGHT last time" + htmlString); 
					}else{
						return L.marker(latlng,{icon:markerRed}).bindPopup("You got it WRONG last time"+ htmlString); 
					}
				}, 
			}).addTo(mymap); 
			mymap.fitBounds(lastFiveLayer.getBounds()); 
		}
	}); 
} 

