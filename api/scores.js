/**
 * Created by Charlie on 29/04/2016.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// CREATE
router.post('/create/:id_parcours', function(req, res) {
    // TODO : créer le score dans la db
    models.Score.create({
        nom: req.body.nom,
        score: req.body.description,
        ParcourId : req.params.id_parcours
    });
});

module.exports = router;