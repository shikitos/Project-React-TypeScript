const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const apiRoutes = require('./routes/api.ts');

app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', 'true'); // allow cookies
	next();
});
// Mount API routes on /api path
app.use('/api', apiRoutes);

const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
