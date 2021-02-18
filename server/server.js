const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

// .................................... CREATE APP
const app = express();
const cfg = require('./config/index');

// .................................... CONFIG APP
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(cfg.www));
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/

// .................................... LOAD ROUTES
for(let i in cfg.routes){
	let item = cfg.routes[i];
	app.use('/' + (item.prefix||''), require('./routes/' + (item.route||item) ));
}
 
// .................................... RUN APP
app.listen(cfg.port, () => {
	console.log(`API BACKEND >>> server is running >>> http://localhost:${cfg.port}`);
	console.log(`API BACKEND >>> public >>> ${cfg.www}`);
	console.log(`API BACKEND >>> path >>> ${cfg.path}`);
});