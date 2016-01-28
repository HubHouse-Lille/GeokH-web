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

    res.render('parcours_detail',
        {
            "parcour":{
                "nom":"parcour test",
                "description":"labalalalabdka",
                "ctime":"24 janvier 2016"
            },
            "data":[
                {
                    "id":1,
                    "bid":2,
                    "qid":3,
                    "bname":"nom balise 1",
                    "qname":"nom question 1"
                },
                {
                    "id":1,
                    "bid":2,
                    "qid":3,
                    "bname":"nom balise 2",
                    "qname":"nom question 2"
                }
            ]
        }
    );
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
