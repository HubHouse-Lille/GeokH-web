var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

// VIEW ALL > GET
router.get('/view/', function(req, res) {
    res.render('pei');
});

// VIEW ONE > GET
router.get('/view/:id', function(req, res) {
    res.render('pei');
});

// CREATE > GET
router.get('/create/', function(req, res) {
    res.render('pei');
});

// CREATE > POST
router.post('/create/', function(req, res) {
    res.render('pei');
});

// EDIT > GET
router.get('/edit/:id', function(req, res) {
    res.render('pei');
});

// EDIT > POST
router.post('/edit/', function(req, res) {
    res.render('pei');
});

// DELETE > GET
router.get('/delete/:id', function(req, res) {
    res.render('pei');
});

module.exports = router;