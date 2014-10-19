var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 2641;

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

// forward /css requests to /dist/css/
app.get('/css/:name', function (req, res) {
  console.log("/dist/css/"+req.params.name);
  res.sendFile(__dirname + "/dist/css/"+req.params.name);
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server listening at http://localhost:" + port);
app.listen(port);