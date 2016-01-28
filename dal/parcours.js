var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.User.create({
        nom: req.body.nom,
        objectif: req.body.objectif,
        type: req.body.type,
        difficulte: req.body.difficulte,
        question: req.body.question,
        propositions: req.body.propositions,
        reponses: req.body.reponses,
        retours: req.body.retours
    }).then(function() {
        res.redirect('/');
    });
});

router.get('/:user_id/destroy', function(req, res) {
    models.User.destroy({
        where: {
            id: req.params.parcour_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;