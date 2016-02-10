var express = require('express');
var router = express.Router();
var request = require('request');

var bodyParser = require('body-parser');

router.get('/', function(req, res) {
    res.render('index', {
        menu: "accueil"
    });
});

router.get('/apropos/', function(req, res) {
    res.render('apropos', {
        menu: "apropos"
    });
});

router.get('/aide/', function(req, res) {
    res.render('aide', {
        menu: "aide"
    });
});
module.exports = router;