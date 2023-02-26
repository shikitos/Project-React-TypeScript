const {Schema, model} = require('mongoose');

const userSchema = new Schema({
	fullName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'moderator', 'user'],
		default: 'user'
	}
});

module.exports = new model('User', userSchema);