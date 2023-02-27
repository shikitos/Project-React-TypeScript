const {Router} = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.ts');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

router.get('/', (req, res) => {
	res.send('Welcome...');
});

// Define routes
router.get('/users', (req, res) => {
	res.send('List of users');
});

router.post('/auth/signup', async (req, res) => {
	console.log('Request create new user')
	try {
		// Extract user data from request body
		const { fullName, username, email, password, role } = req.body;
		// Hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);
		// Create a new user object with hashed password
		const user = new User({ fullName, username, email, password: hashedPassword, role });
		// Save the user to the database
		await user.save();
		// Return success response

		const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });
		res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000, path: '/' });
		res.status(201).send({
			username: user.username,
			fullName: user.fullName,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		// Handle duplicate email error
		if (error.code === 11000 && error.keyValue.email) {
			res.status(400).send({ message: 'Email already exists', error: error });
		} else {
			// Handle other errors
			res.status(500).send({ message: 'Server error', error: error });
		}
	}
});

router.post('/auth/signin', async (req, res) => {
	console.log(JSON.stringify(req.body));
	try {
		const userEmail = req.body.email;
		const userPassword = req.body.password;
		const user = await User.findOne({ email: userEmail });
		if (!user) return res.status(404).send({ message: 'User not found' });

		const isPasswordValid = await bcrypt.compare(userPassword, user.password);
		if (!isPasswordValid) return res.status(404).send({ message: "Invalid login or password" });

		const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });
		res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000, path: '/' });
		res.send({
			username: user.username,
			fullName: user.fullName,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

// Export router instance
module.exports = router;