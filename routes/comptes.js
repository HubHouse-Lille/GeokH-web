var models  = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models = require('../models');


// VIEW ALL > GET
router.get('/view/', function(req, res) {

    models.User.findAll({
        include: [ models.Task ]
    }).then(function(users) {

        res.render('comptes', {
            title: 'Express',
            users: users
        });

    });

});

// VIEW ONE > GET
router.get('/gestion', function(req, res) {
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