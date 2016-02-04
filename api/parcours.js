var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Parcour.findAll({
              where: { actif: 1 },
              attributes: ['id','nom','description']
          }).then(
        function(parcours) {
            res.send(parcours);
        });
});

module.exports = router;