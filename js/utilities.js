// This file is to get the port number writen in ports.xml 
// Adapted from UCL CEGE0043: Web and Mobile GIS - Apps and Programming course materials

var httpsPortNumberAPI; 
var httpsPortNumberApp;

function getPorts(){
	var portURL = "res/ports.xml";
	$.get({url: portURL, success: function(result){
		console.log(result); // check that the data is correct
		httpsPortNumberApp = result.getElementsByTagName("node-port-https-app").item(0).textContent;
		httpsPortNumberAPI = result.getElementsByTagName("node-port-https-api").item(0).textContent;
		console.log("Port API: ", httpsPortNumberAPI)
		console.log("Port APP: ", httpsPortNumberApp)
		//alert("Got Port Numbers")
		}, // end of the inner function
	async: false
	}); // end of the ajax request
} // end of the outer function