const config = {
	www: __dirname + '/../public',
	path: __dirname + '/../',
	port: process.env.PORT || 4000,
	routes: [ 
		'home',
		{ route: 'upload.multer', prefix: 'upload/multer' },
		{ route: 'upload.formidable', prefix: 'upload/formidable' },
		{ route: 'auth', prefix: 'auth' }, 
	]
};
module.exports = config;