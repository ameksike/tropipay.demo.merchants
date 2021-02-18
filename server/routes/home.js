const express = require('express');
const router = express.Router();

router.get('/api', function (req, res) {
	console.log(req.params, req.query);
	res.end('GET: API HOME');
});
router.post('/api', function (req, res) {
	console.log(req.params, req.query, req.body );
	res.end('POST: API HOME');
}); 

module.exports = router;