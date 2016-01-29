var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.Balise.create({
        nom: req.body.nom,
        indice: req.body.indice,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }).then(function() {
        res.redirect('/Balises/view');
    });
});

router.get('/destroy/:Balise_id', function(req, res) {
    models.Balise.destroy({
        where: { id: req.params.Balise_id }
    }).then(function() {
        res.redirect('/Balises/view');
    });
});

router.post('/update/:Balise_id', function(req, res) {

    models.Balise.update({
        nom: req.body.nom,
        indice: req.body.indice,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    },{
        where: { id : req.params.Balise_id }
    }).then(function() {
        res.redirect('/Balises/view/' + req.params.Balise_id);
    });

});

module.exports = router;