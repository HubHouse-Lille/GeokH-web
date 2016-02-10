var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Ptoe.findAll({
            include: [ models.Entrepreneur ]
          }).then(
        function(ptoes) {
            res.json(ptoes);
        });
});

router.get('/parcour/:id', function(req, res) {
    models.Ptoe.findAll({
            where: { ParcourId: req.params.id },
            include: [ models.Entrepreneur ]
          }).then(
        function(ptoes) {
            res.json(ptoes);
        });
});

module.exports = router;