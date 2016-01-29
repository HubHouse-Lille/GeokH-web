var express = require('express');
var router = express.Router();
var request = require('request');
var models  = require('../models/index');

var bodyParser = require('body-parser');

// VIEW ALL > GET
router.get('/view/', function(req, res) {
    models.Parcour.findAll().then(
        function(parcours) {
            res.render('parcours_view', {
                parcours: parcours
            });
        });
});

// VIEW ONE > GET
router.get('/view/:id', function(req, res) {
    models.Parcour.findOne({
        where: { id: req.params.id }
    }).then(
        function(parcour) {
            res.render('parcours_detail', {
                parcour: parcour
            });
        });
});

// CREATE > GET
router.get('/create/', function(req, res) {
    res.render('parcours_create');
});

// EDIT > GET
router.get('/edit/:id', function(req, res) {
    models.Parcour.findOne({
        where: { id: req.params.id }
    }).then(
        function(parcour) {
            res.render('parcours_edit', {
                parcour: parcour
            });
        });
});

module.exports = router;
