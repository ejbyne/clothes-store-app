var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var apiRouter = require('./app/routes/api')(app, express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/app/views/index.html');
});

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = server;
