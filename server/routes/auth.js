const express = require('express');
const router = express.Router();
const cfg = require('../config/index');
const { security } = require('../libs/security');


router.get('/', function (req, res) {
	console.log(req.headers, req.query, req.params);
	res.type('html');
	res.sendFile( _www + '/form1.html' );
});  
router.get('/2', function (req, res) {
	console.log(req.headers, req.query, req.params);
	res.sendFile( _www + '/form2.html' );
});   
router.get('/3', function (req, res) {
	console.log(req.headers, req.query, req.params);
	res.send('CODE >>>' + req.query.code );
}); 

 
router.get('/verify', function (req, res) {
	let secret = 'TROPI';
	let token = '';
	token = security.generateToken(secret);
	console.log(token);
	token = security.generateToken(secret);
	console.log(token);
	token = security.generateToken(secret);
	console.log(token);
	
		
	console.log('-----------------------------');
	token = security.verifyToken(secret, 1613772297892, '0607c3aadf3bbb691ed463e307647958', 600);
	console.log(token);
			
	token = security.verifyToken(secret, '1613772297892', '0607c3aadf3bbb691ed463e307647958', 30000);
	console.log(token);

	token = security.verifyToken(secret, '1613772297892', '0607c3aadf3bbb691ed463e307647958');
	console.log(token);
	
	token = security.verifyToken(secret, 1613772297893, '0607c3aadf3bbb691ed463e307647958');
	console.log(token);	

	token = security.verifyToken(secret, 1613772297893, '0607c3aadf3bbb691ed463e307647959');
	console.log(token);

	res.send('CODE >>>' + req.query.code );
}); 


module.exports = router;