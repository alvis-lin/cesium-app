// This file holds functions to check all the data in the questoin setting form are filled and valid, 
// then the valid form data will be uploaded to the server


// only start uploading after all the data in the question setting form is confirmed as valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function submitClick() {
  if (formValidation()) {
  	insertData();
    	alert("Thank you for your time! Your model have been submitted!");
    	return true;
  } else {
    	return false;
  }
}

// check if all the blanks in the form are filled and data is valid when user clicks submit button
// and start to upload data to server only if all the data is valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function formValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("model_name").value == "") {
    alert("Please fill in Model Name!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("latitude").value == "" || document.getElementById("longitude").value == "" || document.getElementById("altitude").value == "") {
    alert("Please click on the map to set location!");
    flag = false;
  }  

  return flag;
}


// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertData() { 
  alert ("start data upload"); 

  // getting text values
  var model_name = document.getElementById("model_name").value;
  alert(model_name + " ");

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name;

  //getting geometry values
  var latitude = document.getElementById("latitude").value;
  var longitude = document.getElementById("longitude").value;
  var altitude = document.getElementById("altitude").value;
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude + "&altitude="+ altitude;

  alert(postString);

  processData(postString);
}


// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processData(postString) { 
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/insertModels" 
	$.ajax({ 
		url: serviceUrl, 
		crossDomain: true, 
		type: "POST", 
		success: function(data){
			console.log(data); 
			dataUploaded(data);
		}, 
		data: postString 
	}); 
}


// processing the response from the data server and show the result on the page
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function dataUploaded(data) { 
	// change the DIV to show the response 
	document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data); 
}







// CODE FOR LINESTRING
function submitLineClick() {
  if (formLineValidation()) {
    insertLineData();
      alert("Thank you for your time! Your linestring have been submitted!");
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

  return flag;
}


// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertLineData() { 
  alert ("start line data upload"); 

  // getting text values
  var model_name = document.getElementById("line_name").value;
  //alert(model_name + " ");


  // getting text values
  var linestring_coords = document.getElementById("linestring_coords").value;
  //alert(linestring_coords + " ");

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name;
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
  document.getElementById("lineDataUploadResult").innerHTML = JSON.stringify(data); 
}



















// CODE FOR POLYGON
function submitPolygonClick() {
  if (formPolygonValidation()) {
    insertPolygonData();
      alert("Thank you for your time! Your polygon have been submitted!");
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

  // make sure the user fill in the height, or an alert will show up
  if (document.getElementById("polygon_height").value == "") {
    alert("Please fill in Polygon height!");
    flag = false;
  }

  return flag;
}


// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertPolygonData() { 
  alert ("start polygon data upload"); 

  // getting text values
  var model_name = document.getElementById("polygon_name").value;
  var polygon_height = document.getElementById("polygon_height").value;
  var polygon_coords = document.getElementById("polygon_coords").value;

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name;
  postString = postString + "&polygon_height="+ polygon_height;
  postString = postString + "&polygon_coords="+ polygon_coords;
  alert(postString);

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
  document.getElementById("polygonDataUploadResult").innerHTML = JSON.stringify(data); 
}








function submitEditClick() {
  if (formEditValidation()) {
    insertEditData();
      alert("Thank you for your time! Your model have been edited!");
      return true;
  } else {
      return false;
  }
}


function formEditValidation() {
  flag = true;

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("model_id").value == "") {
    alert("Please fill in Model ID!");
    flag = false;
  }

  // if one of the blank is not filled in latitude or longitude part, an alert will show up 
  if (document.getElementById("latitude_edit").value == "" || document.getElementById("longitude_edit").value == "" || document.getElementById("altitude_edit").value == "") {
    alert("Please click on the map to set location!");
    flag = false;
  }  

  return flag;
}











function insertEditData() { 
  alert ("start Edit data upload"); 

  // getting text values
  var model_id = document.getElementById("model_id").value;
  // geometry 
  var latitude = document.getElementById("latitude_edit").value;
  var longitude = document.getElementById("longitude_edit").value;
  var altitude = document.getElementById("altitude_edit").value;
  

  // PostString will hold all the parameters to pass to the server
  var postString = "model_id=" + model_id;
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude + "&altitude="+ altitude;
  alert(postString);

  processEditData(postString);
}


// post the data of the question setting form to database quizquestoin table
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function processEditData(postString) { 
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/editModels" 
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
  document.getElementById("dataEditResult").innerHTML = JSON.stringify(data); 
}




      















// delete record using datadeleted function in this code
function deleteRecord(){
  var deleteID = document.getElementById("deleteID").value;
  var deleteString = "model_id="+deleteID+"&port_id="+httpsPortNumberAPI; // original
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
}
function dataDeleted(data){
  document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data);
}