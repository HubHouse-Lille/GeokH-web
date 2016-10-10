var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    if(req.session.admin){
           models.Question.findAll({include: [ models.Theme ]}).then(
               function(questions) {
                   res.json(questions)
           });
       }
       else{
           models.Question.findAll({
               where: {
                           $or : [
                           {UserId : req.session.sid},
                           {public : true}
                           ]
                       },
               include: [ models.Theme ]

           }).then(
               function(questions) {
                   res.json(questions)
           });
       }
});

module.exports = router;