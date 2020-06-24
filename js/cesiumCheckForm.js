// This file holds functions to check all the data in the questoin setting form are filled and valid, 
// then the valid form data will be uploaded to the server


// only start uploading after all the data in the question setting form is confirmed as valid
// Adapted from: https://stackoverflow.com/questions/39495581/how-to-generate-alert-when-clicking-submit-button-only-when-the-html-form-is-fu
function submitClick() {
  if (formValidation()) {
  	insertData();
    	alert("Thank you for your time! Your quiz questions have been submitted!");
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

  // make sure the user fill in the blank, or an alert will show up
  if (document.getElementById("altitude").value == "") {
    alert("Please fill in Altitude!");
    flag = false;
  }

  // validate correct answer by limiting user to only enter number 1-4
  if (isNaN(document.getElementById("altitude").value)) {
    alert("Enter a number!");
    flag = false;
  }

  // // validate correct answer by limiting user to only enter number 1-4
  // if (!/^[1-4]*$/g.test(document.getElementById("correct_answer").value)) {
  //   alert("Enter a number between 1 to 4!");
  //   flag = false;
  // }

  return flag;
}


// converting the data of the question setting form to postString to pass to the server
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials
function insertData() { 
  alert ("start data upload"); 

  // getting text values
  var model_name = document.getElementById("model_name").value;

  // PostString will hold all the parameters to pass to the server
  var postString = "model_name=" + model_name;

  //getting geometry values
  var latitude = document.getElementById("latitude").value;
  var longitude = document.getElementById("longitude").value;
  postString = postString + "&latitude="+ latitude + "&longitude="+longitude;

  var altitude = document.getElementById("altitude").value;
  postString = postString + "&altitude=" + altitude;

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