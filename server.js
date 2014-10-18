var http = require("http");
var url = require("url");
var static2 = require("node-static");
var webroot = ".";
var port = 1337;
var file = new(static2.Server)(webroot, { 
  cache: 5, 
  headers: { 'X-Powered-By': 'node-static' } 
});
http.createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          //file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end();
        }
      } else {
        console.log('%s - %s', req.url, res.message); 
      }
    });
  });
}).listen(port);

console.log('node-static running at http://localhost:%d', port);