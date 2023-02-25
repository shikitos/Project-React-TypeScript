var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var apiRoutes = require('./routes/api/api.js');
require('dotenv').config();
var cors = require('cors');
app.use(cors());
var mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () { return console.log('MongoDB connected...'); })["catch"](function (err) { return console.log(err); });
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Use API routes
app.use('/api', apiRoutes);
var port = process.env.SERVER_PORT || 5000;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
