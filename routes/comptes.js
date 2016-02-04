var models  = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models = require('../models');


// VIEW ALL > GET
router.get('/gestion', function(req, res) {
    models.User.findAll().then(
    function(users) {
        res.render('users_management', {
            users: users
        });
    });
});


// VIEW ONE > GET
router.get('/view/mine', function(req, res) {

    models.User.findOne({
        where: { id: req.session.sid }
    }).then(
        function(user) {
            res.render('users_detail', {
                user: user
            });
        });
});

router.get('/edit/mine', function(req, res) {

    models.User.findOne({
        where: { id: req.session.sid }
    }).then(
        function(user) {
            res.render('users_edit', {
                user: user
            });
        });
});

module.exports = router;