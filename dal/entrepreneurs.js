var models  = require('../models/index');
var express = require('express');
var router  = express.Router();
var base64 = require('node-base64-image');

router.post('/create', function(req, res) {

    var photo = req.body.newPhoto;
    models.Entrepreneur.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: photo,
        interview: req.body.interview,
        indice: req.body.indice
    }).then(function() {
        res.redirect('/Entrepreneurs/view');
    });
});

router.get('/destroy/:Entrepreneur_id', function(req, res) {
    models.Entrepreneur.destroy({
        where: { id: req.params.Entrepreneur_id }
    }).then(function() {
        res.redirect('/Entrepreneurs/view');
    });
});

router.post('/update/:Entrepreneur_id', function(req, res) {

    var photo = req.body.newPhoto;

    models.Entrepreneur.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: photo,
        interview: req.body.interview,
        indice: req.body.indice
    },{
        where: { id : req.params.Entrepreneur_id }
    }).then(function() {
        res.redirect('/Entrepreneurs/view/' + req.params.Entrepreneur_id);
    });

});

module.exports = router;