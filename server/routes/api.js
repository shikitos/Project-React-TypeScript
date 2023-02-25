var Router = require('express').Router;
var router = Router();
var Recipe = require('../models/recipe');
router.get('/', function (req, res) {
    res.send('Welcome to my API!');
});
module.exports = router;
