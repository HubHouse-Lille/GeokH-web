var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Question.findAll().then(
        function(questions) {
            res.json(questions);
        });
});

module.exports = router;