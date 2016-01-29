var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.Question.create({
        theme: req.body.theme,
        objectif: req.body.objectif,
        type: req.body.type,
        difficulte: req.body.difficulte,
        question: req.body.question,
        propositions: req.body.propositions,
        reponses: req.body.reponses,
        retours: req.body.retours
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
        theme: req.body.theme,
        objectif: req.body.objectif,
        type: req.body.type,
        difficulte: req.body.difficulte,
        question: req.body.question,
        propositions: req.body.propositions,
        reponses: req.body.reponses,
        retours: req.body.retours
    },{
        where: { id : req.params.Question_id }
    }).then(function() {
        res.redirect('/Questions/view/' + req.params.Question_id);
    });

});

module.exports = router;