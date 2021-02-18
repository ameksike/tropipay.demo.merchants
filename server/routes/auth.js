const express = require('express');
const router = express.Router();

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

module.exports = router;