var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express')
var app = express()
var port = 5000
var mysql = require('mysql');
var config = require('./config.json');


var con = mysql.createConnection({
  host: "localhost",
  user: "Snorre",
  password: config.PASSWORD,
  database: "nodesite"
});
con.connect(function (err) {
  if (err) throw err;
  con.query("SHOW TABLES",function (err, result) {
    if (err) throw err;
    console.log(Object.getOwnPropertyNames(result))
      console.log((result[1]))
  });
});

function insert(table, columns, values) {
  if(Array.isArray(values[0])) {
    values.forEach(val => {
      con.query(`INSERT INTO ${table} (${columns.toString()}) VALUES (${val.toString()})`)
    });
  } else {
    con.query(`INSERT INTO ${table} (${columns.toString()}) VALUES (${values.toString()})`)
  }
}


app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index', {
    text: url.parse(req.url, true).pathname
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})
app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => console.log(port))

