var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(require("./src/rutes.js"));
app.use(express.static('public'));

var port = 3000;
app.listen(port);
console.log('Server running in port: ', port);