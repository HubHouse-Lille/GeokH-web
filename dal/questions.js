var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {

    var tabProps = [], tabRetour = [], tabReponses = [];

    if(req.body.props instanceof Array) {
        tabProps = req.body.props;
    } else {
        tabProps.push(req.body.props || "");
    }

    if(req.body.retour instanceof Array) {
        tabRetour = req.body.retour;
    } else {
        tabRetour.push(req.body.retour || "");
    }

    if(req.body.type==="QCM") {
        if(req.body.rqcm instanceof Array) {
            tabReponses = req.body.rqcm;
        } else {
            tabReponses.push(req.body.rqcm);
        }
    } else {
        tabReponses.push(req.body.rqcu);
    }

    var theme;
    if(req.body.newTheme !== "") {
        //valeur string
        models.Theme.create({
                nom: req.body.newTheme
            }).then(function(t ) {
               theme = t.id;
               models.Question.create({
                   ThemeId: theme,
                   objectif: req.body.objectif,
                   type: req.body.type,
                   difficulte: req.body.difficulte,
                   question: req.body.question,
                   propositions: tabProps,//'['+propositions.toString()+']',
                   reponses: tabReponses,  // A modifier selon ( reponses.toString())
                   retours: tabRetour, //'['+retours.toString()+']'
                   public: req.body.mode_question,
                   UserId : req.session.sid
               }).then(function() {
                   res.redirect('/Questions/view');
               });
        });
    } else {
        //valeur integer
        theme = req.body.selectTheme;
        models.Question.create({
            ThemeId: theme,
            objectif: req.body.objectif,
            type: req.body.type,
            difficulte: req.body.difficulte,
            question: req.body.question,
            propositions: tabProps,//'['+propositions.toString()+']',
            reponses: tabReponses,  // A modifier selon ( reponses.toString())
            retours: tabRetour, //'['+retours.toString()+']'
            public: req.body.mode_question,
            UserId : req.session.sid
        }).then(function() {
            res.redirect('/Questions/view');
        });
    }

});

router.get('/destroy/:Question_id', function(req, res) {


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {

        models.Ptobq.findAll({
            where: { QuestionId: req.params.Question_id,
                 ParcourId: {
                     $ne: null
                 }
              }
        }).then(
            function(ents) {
                if (ents.length > 0) {
                  models.Question.findOne({
                      where: { id: req.params.Question_id }
                  }).then(
                      function(question) {
                          res.render('questions_detail', {
                              question: question,
                              propositions: question.propositions,
                              reponses: question.reponses,
                              retours: question.retours,
                              err: "Vous ne pouvez pas supprimer cette balise car elle appartient à des Parcours."
                          });
                      });

                } else {

                    models.Question.destroy({
                        where: { id: req.params.Question_id }
                    }).then(function() {

                        models.Question.findAll({include : [ models.Theme ]}).then(
                            function(questions) {
                                res.render('questions_view', {
                                    questions: questions,
                                    ok: "La question a corrrectement été supprimée"
                                });
                            });

                    });

                }
            });
    }
});

router.post('/update/:Question_id', function(req, res) {

 var tabProps = [], tabRetour = [], tabReponses = [];

    if(req.body.props instanceof Array) {
        tabProps = req.body.props;
    } else {
        tabProps.push(req.body.props || "");
    }

    if(req.body.retour instanceof Array) {
        tabRetour = req.body.retour;
    } else {
        tabRetour.push(req.body.retour || "");
    }

    if(req.body.type==="QCM") {
        if(req.body.rqcm instanceof Array) {
            tabReponses = req.body.rqcm;
        } else {
            tabReponses.push(req.body.rqcm);
        }
    } else {
        tabReponses.push(req.body.rqcu);
    }


    var theme;
    if(req.body.newTheme !== "") {
        //valeur string
        models.Theme.create({
                nom: req.body.newTheme
            }).then(function(t ) {
               theme = t.id;
               models.Question.update({
                    ThemeId: theme,
                    objectif: req.body.objectif,
                    type: req.body.type,
                    difficulte: req.body.difficulte,
                    question: req.body.question,
                    propositions: tabProps,
                    reponses: tabReponses,
                    retours: tabRetour,
                    public : req.body.mode_question
                },{
                    where: { id : req.params.Question_id }
                }).then(function() {
                    res.redirect('/Questions/view/' + req.params.Question_id);
                });
        });
    } else {
        //valeur integer
        theme = req.body.selectTheme;
        models.Question.update({
               ThemeId: theme,
               objectif: req.body.objectif,
               type: req.body.type,
               difficulte: req.body.difficulte,
               question: req.body.question,
               propositions: tabProps,
               reponses: tabReponses,
               retours: tabRetour,
               public : req.body.mode_question
           },{
               where: { id : req.params.Question_id }
           }).then(function() {
               res.redirect('/Questions/view/' + req.params.Question_id);
           });
    }

});

module.exports = router;