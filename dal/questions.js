var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    // Récupération des propositions, retours et réponses du formulaire
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

    // Création du nouveau thème ou non
    var theme;
    if(req.body.newTheme !== "") {
        // Création du thème
        models.Theme.create({
                nom: req.body.newTheme
            }).then(function(t ) {
               theme = t.id;
               // Création de la Question
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
                   UserId : req.session.sid,
                   mystere : req.body.typeq
               }).then(function() {
                   res.redirect('/Questions/view');
               });
        });
    } else {
        // Creation de la question avec thème deja existant
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
            UserId : req.session.sid,
            mystere : req.body.typeq
        }).then(function() {
            res.redirect('/Questions/view');
        });
    }
});

router.get('/destroy/:Question_id', function(req, res) {

    models.Question.findOne({
        where: { id: req.params.Question_id },
        include: [ models.Theme ]
    }).then(
    function(question) {
        if (!req.session.admin && req.session.sid != question.UserId) {
            res.render('error', {
                message: "Attention, vous n'avez pas le droit de supprimer la question.",
                error: "Accès refusé"
            });
        }
        else {
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
                }
                else {
                    models.Question.destroy({
                        where: { id: req.params.Question_id }
                    }).then(function() {
                        if(!req.session.admin){
                           models.Question.findAll({
                               where: {
                                   $or : [
                                   {UserId : req.session.sid},
                                   {public : true}
                                   ]
                               },
                               include: [ models.Theme ]
                           }).then(
                                function(questions) {
                                    res.render('questions_view', {
                                        questions: questions,
                                        ok: "La question a été correctement supprimée"
                                    });
                           });
                        }
                        else{
                           models.Question.findAll().then(
                            function(questions) {
                                res.render('questions_view', {
                                    questions: questions,
                                    ok: "La question a été correctement supprimée"
                                });
                            });
                        }

                    });
                }
            });
        }
    });
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