// This file is to track clicks on the map to insert latitude, longitude and altitude

// array to store click coords
var clickCoords = [];


// // a point coord
var ClickPoint = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

// // change the string format
ClickPoint.prototype.toString = function(){
   return this.x + " " + this.y + " " + this.z;
}

// Track mouse click coordinates
// Adapted from: https://stackoverflow.com/questions/36925075/save-mouse-coordinate-in-an-array [Accessed on 6 July, 2020]

function handleClick(e) {
  var mousePosition = new Cesium.Cartesian3(e.clientX, e.clientY, e.clientZ);

  var ellipsoid = viewer.scene.globe.ellipsoid;
  var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);


  if (cartesian) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian); //original
      var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian); // this is for testting
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);
      var altitudeString = cartographic.height.toFixed(5); // The unit for height is metre, so no need to convert to degrees


      // create click point and store it in array
      var aClick = new ClickPoint(longitudeString, latitudeString, altitudeString);
      clickCoords.push(aClick); 

      // update results
      showArrayCoords(clickCoords);
      } else {
        alert('Globe was not picked');
     }
}








function showArrayCoords(coords) {
  var innerHtml = '';
  // To update coords for linestring  
  for (i = 0; i < coords.length; i++) {
    innerHtml += coords[i] + ', ';
  }
  innerHtml = innerHtml.slice(0, -2);

  // To update coords for polygon
  var poly_innerHtml = '';
  for (i = 0; i < coords.length; i++) {
    poly_innerHtml += coords[i] + ', ';
  }
  poly_innerHtml += coords[0] // The first and last point of polygon should be the same point

  document.getElementById("linestring_coords").value = innerHtml; //parse linestring coords back to webpage
  document.getElementById("polygon_coords").value = poly_innerHtml; //parse polygon coords back to webpage
  //alert(innerHtml); // To check if get the latlng strings by clicks 
}

function clearLineCoords() {
  document.getElementById("linestring_coords").value = "";
  clickCoords = [];
  alert(clickCoords);
}

function clearPolygonCoords() {
  document.getElementById("polygon_coords").value = "";
  clickCoords = [];
  alert(clickCoords);
}

function showCoords() {
  alert("clickCoords: " + clickCoords);
}