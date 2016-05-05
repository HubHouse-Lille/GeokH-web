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

    models.Score.create({
        nom: req.body.nom,
        temps: req.body.temps,
        niveau: req.body.niveau,
        score : req.body.score,
        balises_trouvees : req.body.nb_balises_trouvees,
        reponses_trouvees : req.body.nb_reponses_trouvees,
        ParcourId : req.params.id_parcours,
    }).then(
        function(score) {
            res.json(score);
        });
});

module.exports = router;