var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.redirect('/tasks');
});

module.exports = router;