const {Router} = require('express');
const router = Router();
const User = require('../models/user.ts');

router.get('/', (req, res) => {
	res.send('Welcome...');
});

// Define routes
router.get('/users', (req, res) => {
	res.send('List of users');
});

router.post('/new-user', (req, res) => {
	res.send('Create a new user');
});

// Export router instance
module.exports = router;