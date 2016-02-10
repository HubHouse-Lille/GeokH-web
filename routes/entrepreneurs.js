var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');


// VIEW ALL > GET
router.get('/view/', function(req, res) {
    models.Entrepreneur.findAll().then(
        function(entrepreneurs) {
            res.render('entrepreneurs_view', {
                entrepreneurs: entrepreneurs
            });
        });
});

// VIEW ONE > GET
router.get('/view/:id', function(req, res) {
    models.Entrepreneur.findOne({
           where: { id: req.params.id }
       }).then(function(entrepreneur) {
            res.render('entrepreneurs_detail', {
                entrepreneur: entrepreneur
            });
        });
});

// CREATE > GET
router.get('/create/', function(req, res) {
    res.render('entrepreneurs_create');
});

// EDIT > GET
router.get('/edit/:id', function(req, res) {
    models.Entrepreneur.findOne({
        where: { id: req.params.id }
    }).then(
        function(entrepreneur) {
            res.render('entrepreneurs_edit', {
                entrepreneur: entrepreneur
            });
        });
});

module.exports = router;