const express = require('express');
const router = express.Router();
const path = require('path');
const formidable = require("formidable");
const fs = require('fs')

const cfg = require('../config/index');
const _dir = cfg.path + '/uploads/';

function copySync(source, destiny){
	fs.createReadStream(source).pipe(fs.createWriteStream(destiny));
}

function copyAsinc(source, destiny){
	const readStream = fs.createReadStream(source);
	const writeStream = fs.createWriteStream(destiny);
	readStream.pipe(writeStream);
	readStream.on('end',function(){
		fs.unlinkSync(source);
	});
}

function copySec(source, destiny){
	try {
		//fs.rename(oldpath, newpath, (err) => { if (err) throw err; });
		fs.accessSync(destiny, fs.F_OK);
	} catch (error) {
		let err = fs.renameSync(source, destiny);
	}
}

router.post('/', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (!fs.existsSync(_dir)) {
            fs.mkdirSync(_dir);
        }
		for(let index in files){
			let file = files[index];
			let oldpath = file.path;
			let newpath = _dir + file.name;
			
			copySync(oldpath, newpath);
			console.log(oldpath, newpath);
		}
		res.write('File uploaded and moved!');
		res.end();
    });
});

router.post('/list', (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

module.exports = router;


