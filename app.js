var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express')
var app = express()
var port = 5000
var mysql = require('mysql');
var config = require('./config.json');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index', { text: 'Hey' })
})

app.get('/about', (req, res) => {
 res.sendFile(__dirname + '/views/about.html')
})

app.listen(port, () => console.log(port))

var con = mysql.createConnection({
  host: "localhost",
  user: "Snorre",
  password: config.PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname + ".html";
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
