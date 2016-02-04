var models  = require('../models/index');
var express = require('express');
var router  = express.Router();


router.post('/:Parcour_id/create', function(req, res) {
    models.Ptoe.create({
        EntrepreneurId : req.body.entrepreneur_id,
        ParcourId : req.params.Parcour_id
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });
});

router.get('/:Parcour_id/destroy/:Entrepreneur_id', function(req, res) {
    models.Ptoe.destroy({
        where: {
            EntrepreneurId: req.params.Entrepreneur_id,
            ParcourId: req.params.Parcour_id
        }
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });
});

router.post('/:Parcour_id/update/:Entrepreneur_id', function(req, res) {
    models.Ptoe.update({
        ParcourId : req.params.parcour_id,
        EntrepreneurId : req.body.entrepreneur_id
    },{
        where: {
            ParcourId : req.params.parcour_id,
            EntrepreneurId : req.params.Entrepreneur_id
        }
    }).then(function() {
        res.redirect('/Parcours/edit/' + req.params.Parcour_id);
    });

});

module.exports = router;