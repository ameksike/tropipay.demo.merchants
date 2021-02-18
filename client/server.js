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
 
// .................................... LOAD ROUTES
for(let i in cfg.routes){
	let item = cfg.routes[i];
	app.use('/' + (item.prefix||''), require('./routes/' + (item.route||item) ));
}

// .................................... RUN APP
app.listen(cfg.port, () => {
	console.log(`EXPRESS FRONTEND >>> server is running >>> http://localhost:${cfg.port}`);
	console.log(`EXPRESS FRONTEND >>> public >>> ${cfg.www}`);
	console.log(`EXPRESS FRONTEND >>> path >>> ${cfg.path}`);
});