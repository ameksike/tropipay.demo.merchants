const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const cfg = require('../config/index');
const _dir = cfg.path + '/uploads/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

router.post('/', upload.any(), function (req, res) {
    if (!req.files) {
        console.log("Your request doesn’t have any file");
        return res.send({
          success: false
        });
    
      } else {
        console.log('Your file has been received successfully');
        return res.send({
          success: true
        })
      }
});


module.exports = router;