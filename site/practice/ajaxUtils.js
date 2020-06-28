(global => {
    var ajaxUtils = {};

    getRequestObj = () => new XMLHttpRequest;
    
    ajaxUtils.sendGetRequest = (reqUrl, resHandler, isJsonResponse) => {
        var req = getRequestObj();
        req.onreadystatechange = () => handleResponse(req, resHandler, isJsonResponse)
        req.open("GET", reqUrl, true);
        req.send(null);
    }

    handleResponse = (req, resHandler, isJsonResponse) => {
        if((req.readyState == 4) && (req.status==200)) {
            resHandler(req);
        }
        if(isJsonResponse == undefined) isJsonResponse = true;  //default

        if(isJsonResponse) {
            resHandler(JSON.parse(req.responseText));    //if its json, we gonna parse the response - so itll get a string
        }
        else {
            resHandler(req.responseText);
        }

    }
    global.$ajaxUtils = ajaxUtils;
})(window);