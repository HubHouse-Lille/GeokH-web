var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
   if(!req.session.admin){
           models.Balise.findAll({
               where: {
                 $or : [
                 {UserId : req.session.sid},
                 {public : true}
                 ]
           }}).then(
               function(balises) {
                   res.json(balises);
               });
       }
       else {
           models.Balise.findAll().then(
               function(balises) {
                  res.json(balises);
               });
       }
});

module.exports = router;