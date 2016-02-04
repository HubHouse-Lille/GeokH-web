var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Balise.findAll().then(
        function(balises) {
            res.json(balises);
        });
});

module.exports = router;