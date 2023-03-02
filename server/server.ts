const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const apiRoutes = require('./routes/api.ts');


app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
	credentials: true
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api', apiRoutes);

const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
