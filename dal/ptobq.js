var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

// CREATE > GET
router.get('/', function(req, res) {
    res.render('success');
});

router.post('/:Parcour_id/create', function(req, res) {
    models.Ptobq.create({
        ordre: req.body.ordre,
        BaliseId : req.body.balise,
        ParcourId : req.params.Parcour_id,
        QuestionId : req.body.question
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });
});

router.get('/:Parcour_id/destroy/:Balise_id/:Question_id', function(req, res) {
    models.Ptobq.destroy({
        where: {
            BaliseId: req.params.Balise_id,
            Parcourid: req.params.Parcour_id,
            QuestionId: req.params.Question_id
        }
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });
});

router.post('/:Parcour_id/update/:Balise_id/:Question_id', function(req, res) {
    models.Balise.update({
        ordre: req.body.ordre,
    },{
        where: {
            BaliseId: req.params.Balise_id,
            Parcourid: req.params.Parcour_id,
            QuestionId: req.params.Question_id
        }
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });
});

module.exports = router;