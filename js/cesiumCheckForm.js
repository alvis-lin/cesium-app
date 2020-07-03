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
  if (document.getElementById("latitude").value == "" || document.getElementById("longitude").value == "") {
    alert("Please click on the map to set question location!");
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
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude;

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




















//TESTING CODE FOR LINESTRING

function submitLineClick() {
  insertLineData();
  alert("Thank you for your time! Your linestring have been submitted!");
}



// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertLineData() { 
  alert ("start line data upload"); 

  // getting text values
  var model_name = document.getElementById("line_name").value;
  alert(model_name + " ");

  // PostString will hold all the parameters to pass to the server
  var postString = "line_name=" + model_name;
  alert(postString);

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