var http = require('http');
var httpProxy = require('http-proxy');


var proxy 			= httpProxy.createProxyServer({});
var proxyWebsocket  = httpProxy.createProxyServer({
	target: {
		host: 'localhost',
		port: 8081
	}
});


var data = '/data';
var server = http.createServer(function(req, res) {
	if(req.url.slice(0, data.length) == data) {
		proxy.web(req, res, { target: 'http://localhost:8081' });
	} else {
		proxy.web(req, res, { target: 'http://localhost:4200' });
	}
});


server.on('upgrade', function (req, socket, head) {
	proxyWebsocket.ws(req, socket, head, { target: 'ws://localhost:8081' });
});


proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});


server.listen(9000);