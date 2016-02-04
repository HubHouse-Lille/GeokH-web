var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Entrepreneur.findAll().then(
        function(entrepreneurs) {
            res.format({
              'application/json': function(){
                res.send(entrepreneurs);
              }
            });
        });
});


// VIEW ONE > GET
router.get('/:id', function(req, res) {
    models.Entrepreneur.findOne({
           where: { id: req.params.id }
       }).then(function(entrepreneur) {
            res.format({
              'application/json': function(){
                res.send(entrepreneur);
              }
            });
        });
});

module.exports = router;