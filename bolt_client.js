//Example POST method invocation
var Client = require('node-rest-client').Client;

var client = new Client();

// set content-type header and data as json in args parameter
var args = {
    data: { msg: "hello" },
    headers: { "Content-Type": "application/json" }
};

client.post("localhost:5000/query", args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
    return response
});