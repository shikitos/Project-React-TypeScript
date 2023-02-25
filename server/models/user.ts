const {Schema, model} = require('mongoose');

const userSchema = new Schema({
	fullName: {type: String},
	username: {type: String},
	email: {type: String},
	password: {type: String},
});

module.exports = new model('User', userSchema);