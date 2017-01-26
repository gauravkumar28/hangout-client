require('dotenv').config()

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Created successfully\n');
});

server.listen(process.env.LEBER_PORT, process.env.LEBER_HOST, function () {
    console.log('Server running at http://%s:%d/', process.env.LEBER_HOST, process.env.LEBER_PORT);
    require("./hangout_client.js")
    console.log('Press CTRL+C to exit');
});