// @ts-ignore

const {Router} = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.ts');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';
import { serialize } from 'cookie';

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

		const token = jwt.sign(
			{ id: user.id },
			secretKey,
			{ expiresIn: '1d' });
		const serialized = serialize('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 2,
			path: '/',
		});
		res.setHeader('Set-Cookie', serialized);
		res.send({
			success: true,
			userData: {
				_id: user.id,
				username: user.username,
				fullName: user.fullName,
				email: user.email
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

// Middleware to validate JWT token
const authenticateToken = (req, res, next) => {
	console.log("Check JWT Token");
	// Extract the JWT token from the HttpOnly cookie
	const token = req.headers.cookie?.split(';')
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith('token='))
		?.split('=')[1]; // replace with the name of your HttpOnly cookie

	// Verify the JWT token
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, secretKey, (err, user) => {
		if (err) return res.sendStatus(403);
		req.userID = user.id;
		next();
	});
}


router.patch('/users/update', authenticateToken, async (req, res) => {
	console.log("Update user data", req.userID);
	try {
		await User.updateOne({ _id: req.userID}, { $set: req.body })
			.exec()
			.then(result => res.json(result))
			.catch(err => res.status(500).json({error: err}))
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

router.get('/user/', authenticateToken, async (req, res) => {
	console.log("Get User Data");
	try {
		const user = await User.findOne({ _id: req.userID}).select('-password');
		res.send({ user });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

router.post('/logout', authenticateToken, async (req, res) => {
	try {
		res.clearCookie('token');
		// Send a response indicating that the user has been logged out
		res.send({ message: 'Logged out' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

// Export router instance
module.exports = router;