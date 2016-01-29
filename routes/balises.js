var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/view/', function(req, res) {
    models.Balise.findAll().then(
        function(balises) {
            res.render('balises_view', {
                balises: balises
            });
        });
});

// VIEW ONE > GET
router.get('/view/:id', function(req, res) {
    models.Balise.findOne({
        where: { id: req.params.id }
    }).then(
        function(balise) {
            res.render('balises_detail', {
                balise: balise
            });
        });
});

// CREATE > GET
router.get('/create/', function(req, res) {
    models.Question.findAll().then(
        function(questions) {
            res.render('balises_create', {
                questions: questions
            });
        });
});

// EDIT > GET
router.get('/edit/:id', function(req, res) {
    models.Balise.findOne({
        where: { id: req.params.id }
    }).then(
        function(balise) {
            res.render('balises_edit', {
                balise: balise
            });
        });
});


module.exports = router;