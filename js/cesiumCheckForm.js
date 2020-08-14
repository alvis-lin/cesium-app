// This file holds functions to check all the data in the questoin setting form are filled and valid, 
// then the valid form data will be uploaded to the server


// CODE TO CREATE POINT
// only start uploading after all the data in the question setting form is confirmed as valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function submitPointClick() {
  if (formPointValidation()) {
  	insertPointData();
  	alert("Thank you for your time! Your point have been submitted!");
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
  //alert ("start point data upload"); 

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

  //alert(postString);

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
    alert("Thank you for your time! Your linestring have been submitted!");
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
  //alert ("start line data upload"); 

  // getting text values
  var model_name = document.getElementById("line_name").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  //getting geometry values
  var linestring_coords = document.getElementById("linestring_coords").value;
  //alert(linestring_coords + " ");

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name + "&tablename="+ tablename;
  postString = postString + "&linestring_coords="+ linestring_coords;
  //alert(postString);

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
    alert("Thank you for your time! Your polygon have been submitted!");
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
  //alert ("start polygon data upload"); 

  // getting text values
  var model_name = document.getElementById("polygon_name").value;
  var tablename = document.getElementById("working_layer").innerHTML;

  //getting geometry values
  var polygon_coords = document.getElementById("polygon_coords").value;

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name + "&tablename="+ tablename;
  postString = postString + "&polygon_coords="+ polygon_coords;
  //alert(postString);

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






// DELETE IT LATER
// CODE TO MOVE POINT TO NEW COORDS


// function submitEditClick() {
//   if (formEditValidation()) {
//     insertEditData();
//       alert("Thank you for your time! Your model have been edited!");
//       refreshModel();
//       return true;
//   } else {
//       return false;
//   }
// }


// function formEditValidation() {
//   flag = true;

//   // make sure the user fill in the blank, or an alert will show up
//   if (document.getElementById("model_id").value == "") {
//     alert("Please fill in Model ID!");
//     flag = false;
//   }

//   // if one of the blank is not filled in latitude or longitude part, an alert will show up 
//   if (document.getElementById("latitude_edit").value == "" || document.getElementById("longitude_edit").value == "" || document.getElementById("altitude_edit").value == "") {
//     alert("Please click on the map to set location!");
//     flag = false;
//   }  

//   return flag;
// }


// function insertEditData() { 
//   alert ("start Edit data upload"); 

//   // getting text values
//   var model_id = document.getElementById("model_id").value;
//   // geometry 
//   var latitude = document.getElementById("latitude_edit").value;
//   var longitude = document.getElementById("longitude_edit").value;
//   var altitude = document.getElementById("altitude_edit").value;
  

//   // PostString will hold all the parameters to pass to the server
//   var postString = "model_id=" + model_id;
//   postString = postString + "&latitude="+ latitude + "&longitude="+longitude + "&altitude="+ altitude;
//   //alert(postString);

//   processEditData(postString);
// }


// // post the data of the question setting form to database quizquestoin table
// // Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
// function processEditData(postString) { 
//   var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/editModel" 
//   $.ajax({ 
//     url: serviceUrl, 
//     crossDomain: true, 
//     type: "POST", 
//     success: function(data){
//       console.log(data); 
//       editDataUploaded(data);
//     }, 
//     data: postString 
//   }); 
// }


// // processing the response from the data server and show the result on the page
// // Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
// function editDataUploaded(data) { 
//   // change the DIV to show the response 
//   document.getElementById("dataEditResult").innerHTML = JSON.stringify(data); 
// }







// // CODE TO MOVE MODEL BY X, Y, Z DEGREE AND METER

function submitMoveClick() {
  if (formMoveValidation()) {
    insertMoveData();
    alert("Thank you for your time! Your model have been moved!");
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
  //alert ("start move data upload"); 

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
  //alert(postString);

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
      alert("Thank you for your time! Your model have been edited!");
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
  alert ("start Edit data upload"); 

  // getting text values
  var model_id = document.getElementById("edit_model_id").value;
  var tablename = document.getElementById("working_layer").innerHTML;
  // geometry 
  var edit_geomcolumn = document.getElementById("edit_geomcolumn").value;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id + "&tablename="+ tablename;
  postString = postString + "&edit_geomcolumn="+ edit_geomcolumn;
  //alert(postString);

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
    alert("Thank you for your time! Your model have been extruded!");
    refreshModel();
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
  //alert ("start extruded data upload"); 

  // getting text values
  var model_id = document.getElementById("extrude_model_id").value;
  // geometry 
  var extrude_height = document.getElementById("extrude_height").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id;
  postString = postString + "&extrude_height="+ extrude_height;
  //alert(postString);

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






function submitEditHeightClick() {
  submitEditHeight();
  
}





// CODE TO EDIT HEIGHT

function submitEditHeight() {
  if (formEditHeightValidation()) {
    insertEditHeightData();
    alert("Thank you for your time! Your model heigt have been modified!");
    refreshModel();
    return true;
  } else {
    return false;
  }
}

function formEditHeightValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("edit_height_model_id").value == "") {
    alert("Please fill in Model ID to extrude!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("extrude_height_edit").value == "") {
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
  // alert ("start height editing data upload"); 

  // getting text values
  var model_id = document.getElementById("edit_height_model_id").value;
  // geometry 
  var extrude_height_edit = document.getElementById("extrude_height_edit").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id;
  postString = postString + "&extrude_height_edit="+ extrude_height_edit;
  // alert(postString);

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
  document.getElementById("dataEditHeightResult").innerHTML = data;
}
















// // CODE TO ROTATE MODEL BY DEGREE

function submitRotateClick() {
  if (formRotateValidation()) {
    insertRotateData();
    alert("Thank you for your time! Your model have been rotated!");
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
    alert("Please enter the height to rotate the model!");
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
  //alert ("start extruded data upload"); 

  // getting text values
  var model_id = document.getElementById("rotate_model_id").value;
  // geometry 
  var rotate_degree = document.getElementById("rotate_degree").value;

  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id;
  postString = postString + "&rotate_degree="+ rotate_degree;
  //alert(postString);

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
}













function getGeom() {
  if (formGetGeomValidation()) {
    insertGetGeomData();
    alert("Retrived geometry column");
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

  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
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
  alert ("start getting geom"); 

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







      






// delete record using datadeleted function in this code
function deleteRecord(){

  // make sure working layer is selected, or an alert will show up
  if (document.getElementById("working_layer").innerHTML == "") {
    alert("Please select Working Layer!");
  }

  var deleteID = document.getElementById("deleteID").value;
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
  document.getElementById("deleteID").value = ""; // to clear ID form column when delete is clicked 
}