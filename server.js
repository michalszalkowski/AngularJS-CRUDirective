var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('./server/config/mongoose').initDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/api', require('./server/route').init());

app.listen(8080);
console.log('==> goto: http://localhost:' + 8080);