// This file holds functions to check all the data in the questoin setting form are filled and valid, 
// then the valid form data will be uploaded to the server


// CODE TO CREATE POINT
// only start uploading after all the data in the question setting form is confirmed as valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function submitPointClick() {
  if (formPointValidation()) {
  	insertPointData();
  	alert("Point has been created!");
    refreshModel();
  	return true;
  } else {
    return false;
  }
}

// check if all the blanks in the form are filled and data is valid when user clicks submit button
// and start to upload data to server only if all the data is valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function formPointValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("point_name").value == "") {
    alert("Please fill in Model Name!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("latitude").value == "" || document.getElementById("longitude").value == "" || document.getElementById("altitude").value == "") {
    alert("Please click on the map to set location!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertPointData() { 

  // getting text values
  var model_name = document.getElementById("point_name").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  

  //getting geometry values
  var latitude = document.getElementById("latitude").value;
  var longitude = document.getElementById("longitude").value;
  var altitude = document.getElementById("altitude").value;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name + "&tablename="+ tablename;
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude + "&altitude="+ altitude;

  processPointData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processPointData(postString) { 
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/insertPoint" 
	$.ajax({ 
		url: serviceUrl, 
		crossDomain: true, 
		type: "POST", 
		success: function(data){
			console.log(data); 
			pointDataUploaded(data);
		}, 
		data: postString 
	}); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function pointDataUploaded(data) { 
	// change the DIV to show the response 
	// document.getElementById("pointDataUploadResult").innerHTML = JSON.stringify(data);
  document.getElementById("pointDataUploadResult").innerHTML = data;

  // clear columns after upload
  document.getElementById("point_name").value = ""; 
  document.getElementById("latitude").value = ""; 
  document.getElementById("longitude").value = "";
  document.getElementById("altitude").value = "";
}







// CODE TO CREATE LINESTRING
function submitLineClick() {
  if (formLineValidation()) {
    insertLineData();
    alert("Line has been created!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

// check if all the blanks in the form are filled and data is valid when user clicks submit button
// and start to upload data to server only if all the data is valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function formLineValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("line_name").value == "") {
    alert("Please fill in Line Name!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("linestring_coords").value == "") {
    alert("Please click on the map to set insert linestring coordinates!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertLineData() { 
  
  // getting text values
  var model_name = document.getElementById("line_name").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  //getting geometry values
  var linestring_coords = document.getElementById("linestring_coords").value;

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name + "&tablename="+ tablename;
  postString = postString + "&linestring_coords="+ linestring_coords;
 
  processLineData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processLineData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/insertLinestring" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      lineDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function lineDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("lineDataUploadResult").innerHTML = data;

  // clear columns after upload
  document.getElementById("line_name").value = ""; 
  document.getElementById("linestring_coords").value = ""; 
}
















// CODE TO CREATE POLYGON
function submitPolygonClick() {
  if (formPolygonValidation()) {
    insertPolygonData();
    alert("Polygon has been created!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

function formPolygonValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("polygon_name").value == "") {
    alert("Please fill in Polygon Name!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("polygon_coords").value == "") {
    alert("Please click on the map to set insert polygon coordinates!");
    flag = false;
  } 

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  } 

  return flag;
}

// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertPolygonData() { 
  
  // getting text values
  var model_name = document.getElementById("polygon_name").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  //getting geometry values
  var polygon_coords = document.getElementById("polygon_coords").value;

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name + "&tablename="+ tablename;
  postString = postString + "&polygon_coords="+ polygon_coords;
  
  processPolygonData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processPolygonData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/insertPolygon" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      polygonDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function polygonDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("polygonDataUploadResult").innerHTML = data;
  
  // clear columns after upload
  document.getElementById("polygon_name").value = ""; 
  document.getElementById("polygon_coords").value = ""; 
}







// // CODE TO MOVE MODEL BY X, Y, Z DEGREE AND METER

function submitMoveClick() {
  if (formMoveValidation()) {
    insertMoveData();
    alert("Model has been moved!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}


function formMoveValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("move_model_id").value == "") {
    alert("Please fill in Model ID to move!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("move_x").value == "" || document.getElementById("move_y").value == "" || document.getElementById("move_z").value == "") {
    alert("Please enter the parameters to move the model!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}


function insertMoveData() { 
  
  // getting text values
  var model_id = document.getElementById("move_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  // geometry 
  var latitude = document.getElementById("move_y").value;
  var longitude = document.getElementById("move_x").value;
  var altitude = document.getElementById("move_z").value;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude + "&altitude="+ altitude;
 
  processMoveData(postString);
}


// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processMoveData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/moveModel" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      moveDataUploaded(data);
    }, 
    data: postString 
  }); 
}


// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function moveDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataMoveResult").innerHTML = data;

  // clear columns after upload
  document.getElementById("move_model_id").value = ""; 
  document.getElementById("move_y").value = ""; 
  document.getElementById("move_x").value = ""; 
  document.getElementById("move_z").value = ""; 
}









function submitEditClick() {
  if (formEditValidation()) {
    insertEditData();
      alert("Model has been edited!");
      refreshModel();
      return true;
  } else {
      return false;
  }
}


function formEditValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("edit_model_id").value == "") {
    alert("Please fill in Model ID!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("edit_geomcolumn").value == "") {
    alert("Please fill the geometry column!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}


function insertEditData() { 
  
  // getting text values
  var model_id = document.getElementById("edit_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var edit_geomcolumn = document.getElementById("edit_geomcolumn").value;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&edit_geomcolumn="+ edit_geomcolumn;
  
  processEditData(postString);
}


// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processEditData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/editModel" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      editDataUploaded(data);
    }, 
    data: postString 
  }); 
}


// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function editDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataEditResult").innerHTML = data;

  // clear columns after upload
  document.getElementById("edit_model_id").value = ""; 
  document.getElementById("edit_geomcolumn").value = ""; 
}










// CODE TO EXTRUDE MODEL BY HEIGHT

function submitExtrudeClick() {
  if (formExtrudeValidation()) {
    insertExtrudeData();
    alert("Model has been extruded!");
    refreshModel();
    submitEditHeight(); // edit height again
    return true;
  } else {
    return false;
  }
}

function formExtrudeValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("extrude_model_id").value == "") {
    alert("Please fill in Model ID to extrude!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("extrude_height").value == "") {
    alert("Please enter the height to extruded the model!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

function insertExtrudeData() { 
 
  // getting text values
  var model_id = document.getElementById("extrude_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var extrude_height = document.getElementById("extrude_height").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&extrude_height="+ extrude_height;
  
  processExtrudeData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processExtrudeData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/extrudeModel" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      extrudeDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function extrudeDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataExtrudeResult").innerHTML = data;
}






// CODE TO EDIT HEIGHT

function submitEditHeight() {
  if (formEditHeightValidation()) {
    insertEditHeightData();
    alert("Model heigt has been modified!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

function formEditHeightValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("extrude_model_id").value == "") {
    alert("Please fill in Model ID to extrude!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("extrude_height").value == "") {
    alert("Please enter the height to modify the model!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

function insertEditHeightData() { 
  alert("start height edidting");
  
  // getting text values
  var model_id = document.getElementById("extrude_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var extrude_height = document.getElementById("extrude_height").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&extrude_height="+ extrude_height;
 
  alert("p2" + postString);

  processEditHeightData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processEditHeightData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/editModelHeight" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      editHeightDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function editHeightDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataExtrudeResult").innerHTML = data;
}
















// CODE TO ROTATE MODEL BY DEGREE

function submitRotateClick() {
  if (formRotateValidation()) {
    insertRotateData();
    alert("Model has been rotated!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

function formRotateValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("rotate_model_id").value == "") {
    alert("Please fill in Model ID to rotate!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("rotate_degree").value == "") {
    alert("Please enter the degree to rotate the model!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

function insertRotateData() { 
  
  // getting text values
  var model_id = document.getElementById("rotate_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var rotate_degree = document.getElementById("rotate_degree").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&rotate_degree="+ rotate_degree;
  
  processRotateData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processRotateData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/rotateModel" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      rotateDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function rotateDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataRotateResult").innerHTML = data; 

  // clear columns after upload
  document.getElementById("rotate_model_id").value = ""; 
  document.getElementById("rotate_degree").value = ""; 
}












// to get buffer with radius in metre
function submitBufferClick() {
  if (formBufferValidation()) {

    insertBufferData();
    alert("Buffer has been generated!");
    refreshModel();
    
    // tick model buffer layer in control panel to show buffer
    if (document.getElementById("working_layer").innerHTML == "models" && !checkboxModelBuffer.checked) {
      document.getElementById('Checkbox_model_buffer').click();
    }

    // tick os buffer layer in control panel to show buffer
    else if (document.getElementById("working_layer").innerHTML == "buildings_tq2580" && !checkboxOSBuffer.checked) {
      document.getElementById('Checkbox_OS_buffer').click();
    }
    return true;
  } else {
    return false;
  }
}

function formBufferValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("buffer_model_id").value == "") {
    alert("Please fill in Model ID to generate buffer!");
    flag = false;
  }

  // make sure the radius column is filled
  if (document.getElementById("buffer_radius").value == "") {
    alert("Please enter the radius to generate buffer!");
    flag = false;
  }  

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }
  return flag;
}

function insertBufferData() { 
  
  // getting text values
  var model_id = document.getElementById("buffer_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var buffer_radius = document.getElementById("buffer_radius").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&buffer_radius="+ buffer_radius;
  
  processBufferData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processBufferData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/bufferModel" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      bufferDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function bufferDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataBufferResult").innerHTML = data; 

  // clear columns after upload
  document.getElementById("buffer_model_id").value = ""; 
  document.getElementById("buffer_radius").value = ""; 
}














// to delete buffer 
function deleteBufferClick() {
  if (formDeleteBufferValidation()) {
    insertDeleteBufferData();
    alert("Buffer has been deleted!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

function formDeleteBufferValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("buffer_model_id").value == "") {
    alert("Please fill in Model ID to generate buffer!");
    flag = false;
  }

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

function insertDeleteBufferData() { 
  
  // getting text values
  var model_id = document.getElementById("buffer_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  
  processDeleteBufferData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processDeleteBufferData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/bufferDelete" 
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "POST", 
    success: function(data){
      console.log(data); 
      bufferDeleteDataUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function bufferDeleteDataUploaded(data) { 
  // change the DIV to show the response 
  document.getElementById("dataDeleteBufferResult").innerHTML = data; 

  // clear columns after upload
  document.getElementById("buffer_model_id").value = ""; 
}





























// to retrieve the geometry string of the model
function getGeom() {
  if (formGetGeomValidation()) {
    insertGetGeomData();
    return true;
  } else {
    return false;
  }
}

// check if all the blanks in the form are filled and data is valid when user clicks submit button
// and start to upload data to server only if all the data is valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function formGetGeomValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("edit_model_id").value == "") {
    alert("Please fill in Model ID!");
    flag = false;
  }

  
  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}

// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertGetGeomData() { 
  
  // getting text values
  var edit_model_id = document.getElementById("edit_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  // PostString will hold all the parameters to pass to the server
  var postString = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSONgeom/"+ tablename + "/geom/" + edit_model_id;

  processGetGeomData(postString);
}

// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processGetGeomData(postString) {
  var serviceUrl= postString;
  console.log("serviceUrl:" ,serviceUrl);
  $.ajax({ 
    url: serviceUrl, 
    crossDomain: true, 
    type: "GET", 
    success: function(data){
      console.log("data:", data); 
      dataGetGeomUploaded(data);
    }, 
    data: postString 
  }); 
}

// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function dataGetGeomUploaded(data) { 
  
  //data = JSON.stringify(data)
  // remove the doubel quotation mark, adapted from: https://stackoverflow.com/questions/11233498/json-stringify-without-quotes-on-properties [Accessed on 4 August, 2020]
  // change the DIV to show the response 
  document.getElementById("edit_geomcolumn").value = data; 
  //document.getElementById("edit_geomcolumn").value = data.replace(/['"]+/g, ''); 
}







      
function deleteModel() {
  if (formDeleteValidation()) {
    deleteRecord();
    alert("Model has been Deleted");
    return true;
  } else {
    return false;
  }
}

// check if all the blanks in the form are filled and data is valid when user clicks submit button
// and start to upload data to server only if all the data is valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function formDeleteValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("delete_id").value == "") {
    alert("Please fill in Model ID!");
    flag = false;
  }

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
    flag = false;
  }

  return flag;
}





// delete record using datadeleted function in this code
function deleteRecord(){

  var deleteID = document.getElementById("delete_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  var deleteString = "model_id="+deleteID+"&port_id="+httpsPortNumberAPI+ "&tablename="+ tablename; // original
  //var deleteString = "model_id="+deleteID;
  var serviceUrl = "https://developer.cege.ucl.ac.uk:"+httpsPortNumberAPI+"/deleteModels";
  $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){
      console.log(data);
      dataDeleted(data);
    },
    data: deleteString
  });
  refreshModel();
}

function dataDeleted(data){
  document.getElementById("dataDeleteResult").innerHTML = data;
  document.getElementById("delete_id").value = ""; // to clear ID form column when delete is clicked 
}