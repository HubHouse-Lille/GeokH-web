var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.Parcour.create({
        nom: req.body.nom,
        description: req.body.description
    }).then(function() {
        res.redirect('/parcours/view');
    });
});

router.get('/destroy/:parcour_id', function(req, res) {
    models.Parcour.destroy({
        where: { id: req.params.parcour_id }
    }).then(function() {
        res.redirect('/parcours/view');
    });
});

router.post('/update/:parcour_id', function(req, res) {

    models.Parcour.update({
        nom: req.body.nom,
        description: req.body.description
    },{
        where: { id : req.params.parcour_id }
    }).then(function() {
        res.redirect('/parcours/view/' + req.params.parcour_id);
    });

});

module.exports = router;