var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
      models.Ptobq.findAll({
            include: [ models.Entrepreneur ]
          }).then(
        function(ptobqs) {
            res.json(ptobqs);
        });
});

// /api/ptobqs/parcour/*
router.get('/parcour/:id', function(req, res) {
    models.Ptobq.findAll({
            where: { ParcourId: req.params.id },
            include: [ models.Balise, models.Question ],
            order: '`ordre` ASC'
          }).then(
        function(ptobqs) {
            res.json(ptobqs);
        });
});

module.exports = router;
