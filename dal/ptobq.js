var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post(':Parcour_id/create', function(req, res) {
    models.Ptobq.create({
        ordre: req.body.ordre,
        BaliseId : req.body.balise_id,
        QuestionId : req.body.question_id
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });
});

router.get(':Parcour_id/destroy/:Balise_id', function(req, res) {
    models.Balise.destroy({
        where: { id: req.params.Balise_id }
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });
});

router.post(':Parcour_id/update/:Balise_id', function(req, res) {
    models.Balise.update({
        ordre: req.body.ordre,
        BaliseId : req.body.balise_id,
        QuestionId : req.body.question_id
    },{
        where: { id : req.params.Balise_id }
    }).then(function() {
        res.redirect('/Parcours/view/' + req.params.Parcour_id);
    });

});

module.exports = router;