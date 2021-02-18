const config = {
	www: __dirname + '/../public',
	path: __dirname + '/../',
	port: process.env.PORT || 4001,
	routes: [ 'home' ]
};
module.exports = config;