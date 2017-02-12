var express = require('express')
var bodyParser = require('body-parser')
var expressServer = express()

// use body parser for json
expressServer.use(bodyParser.json());

// display web page
var weboptions = {
    index: "test.html"
}
expressServer.use('/', express.static('public', weboptions));

expressServer.post('/hi', function (req, res) {
    console.log('new user request');
    var user = req.body.name;
    console.log(user);

    res.send('Hello World!');
})

expressServer.listen(3000, function () {
  console.log('Express Server listening on port 3000!');
})