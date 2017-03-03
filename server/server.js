const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/routes');
const mongodb = require("mongodb");

const app = express();

require('./db/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header ('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


const port = process.env.PORT || config.port;
app.set('port', port);


const server = http.createServer(app);


server.listen(port, () => console.log(`API running on localhost:${port}`));