var models  = require('../models/index');
var express = require('express');
var router  = express.Router();



/*
 *  TO CHECK, ca ne me semble pas correct par ici :/
 */


router.post(':Parcour_id/create', function(req, res) {
    models.Ptobq.create({
        ordre: req.body.ordre,
        Parcourid : req.params.Parcour_id,
        BaliseId : req.body.balise_id,
        QuestionId : req.body.question_id
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });
});

router.get(':Parcour_id/destroy/:Balise_id', function(req, res) {
    models.Ptobq.destroy({
        where: {
            BaliseId: req.params.Balise_id,
            Parcourid: req.params.Parcour_id
        }
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });
});

router.post(':Parcour_id/update/:Balise_id', function(req, res) {
    models.Balise.update({
        ordre: req.body.ordre,
        BaliseId : req.body.balise_id,
        Parcourid : req.params.Parcour_id,
        QuestionId : req.body.question_id
    },{
        where: { id : req.params.Balise_id }
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });

});

module.exports = router;