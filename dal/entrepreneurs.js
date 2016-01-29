var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.Question.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: req.body.photo,
        interview: req.body.interview,
        indice: req.body.indice
    }).then(function() {
        res.redirect('/Questions/view');
    });
});

router.get('/destroy/:Question_id', function(req, res) {
    models.Question.destroy({
        where: { id: req.params.Question_id }
    }).then(function() {
        res.redirect('/Questions/view');
    });
});

router.post('/update/:Question_id', function(req, res) {

    models.Question.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: req.body.photo,
        interview: req.body.interview,
        indice: req.body.indice
    },{
        where: { id : req.params.Question_id }
    }).then(function() {
        res.redirect('/Questions/view/' + req.params.Question_id);
    });

});

module.exports = router;