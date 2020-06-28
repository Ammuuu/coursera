(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {     //url of request - where to go to get request, responsehandler to handle response returned from user 
    var request = getRequestObject();
    request.onreadystatechange = 
      //**why not have onreadyState to handle response straight away? 1. We need the function value, but value cannot take parameters**//
      //**if thats the case we can simply make request and responseHandler gobal? Nah, cuz if we keep sending requests b4 the first is sent, itll still refer to the first one**//
      function() { 
        handleResponse(request,responseHandler,isJsonResponse);   //the function that handles the response, only called upon a response
      };
    request.open("GET", requestUrl, true);    //method of request with our url, true to make it asynchronous
    request.send(null); // for POST only      //the request params will be part of the body for post instead of url, since its a get request its null
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,responseHandler,isJsonResponse) {
  if ((request.readyState == 4) && (request.status == 200)) {   //make certain is readystate 4 and status 200 - OK

    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;

})(window);

