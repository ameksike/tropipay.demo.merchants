const express = require('express');
const router = express.Router();
const cfg = require('../config/index');

router.get('/', function (req, res) {
	res.type('html');
	res.sendFile( cfg.www + '/index.html' );
}); 

module.exports = router;