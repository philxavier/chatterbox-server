/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds
  'Content-Type': 'application/json'
};

var storage = {};
storage.results = [];

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  const { method, url } = request;

  let returnData;

  baseUrl = url.split('?')[0];

  if (baseUrl === '/classes/messages') {
    if (method === 'GET') {
      statusCode = 200;
      returnData = storage;
    }    
  
    var stringMessage = ''; 
  
    if (method === 'POST') {
      
      statusCode = 201;

      request.on('data', function(chunk) {
        stringMessage += chunk;
      });
      

      request.on('end', () => {
        stringMessage = JSON.parse(stringMessage);
        returnData = stringMessage;
        storage.results.push(stringMessage);
        
      });
    }
    if (method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers); 
      response.end(null);
    }
  } else {
    statusCode = 404;
  }
  
  response.writeHead(statusCode, headers);
  
  response.end(JSON.stringify(returnData));
};

module.exports.requestHandler = requestHandler;
