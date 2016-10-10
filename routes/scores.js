/**
 * Created by Charlie on 29/04/2016.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/view/', function(req, res) {

        models.Score.findAll({include:[models.Parcours]}).then(
            function(scores) {
                res.render('scores_view', {
                    score: scores
                });

        });


});

module.exports = router;
