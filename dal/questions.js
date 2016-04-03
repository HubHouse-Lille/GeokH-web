var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {

    var reponses = [];
    var propositions = [];
    var retours = [];

    if (req.body.type == "QCM") {
        if (typeof req.body.qm1 !== "undefined" && req.body.qm1 != "") {
           propositions.push("\""+req.body.qm1+"\"");
        }
        if (typeof req.body.qm2 !== "undefined" && req.body.qm2 != "") {
           propositions.push("\""+req.body.qm2+"\"");
        }
        if (typeof req.body.qm3 !== "undefined" && req.body.qm3 != "") {
           propositions.push("\""+req.body.qm3+"\"");
        }
        if (typeof req.body.qm4 !== "undefined" && req.body.qm3 != "") {
           propositions.push("\""+req.body.qm4+"\"");
        }
        if (typeof req.body.qm5 !== "undefined" && req.body.qm5 != "") {
           propositions.push("\""+req.body.qm5+"\"");
        }

        if (typeof req.body.repQcm1 !== "undefined" && req.body.repQcm1 == "rq1" ) {
           reponses.push(1);
        }
        if (typeof req.body.repQcm2 !== "undefined" && req.body.repQcm2 == "rq2" ) {
           reponses.push(2);
        }
        if (typeof req.body.repQcm3 !== "undefined" && req.body.repQcm3 == "rq3" ) {
           reponses.push(3);
        }
        if (typeof req.body.repQcm4 !== "undefined" && req.body.repQcm4 == "rq4" ) {
           reponses.push(4);
        }
        if (typeof req.body.repQcm5 !== "undefined" && req.body.repQcm5 == "rq5" ) {
           reponses.push(5);
        }

        reponses = '['+reponses+']';

    } else {
        if (typeof req.body.qu1 !== "undefined" && req.body.qu1 != "") {
           propositions.push("\""+req.body.qu1+"\"");
        }
        if (typeof req.body.qu2 !== "undefined" && req.body.qu2 != "") {
           propositions.push("\""+req.body.qu2+"\"");
        }
        if (typeof req.body.qu3 !== "undefined" && req.body.qu3 != "") {
           propositions.push("\""+req.body.qu3+"\"");
        }
        if (typeof req.body.qu4 !== "undefined" && req.body.qu3 != "") {
           propositions.push("\""+req.body.qu4+"\"");
        }
        if (typeof req.body.qu5 !== "undefined" && req.body.qu5 != "") {
           propositions.push("\""+req.body.qu5+"\"");
        }

        console.log("theme : " + req.body.selectTheme);
        console.log("rep qcm : "+req.body.repQcu);
        reponses = req.body.repQcu;

    }

    if (typeof req.body.ret1 !== "undefined" && req.body.ret1 != "") {
       retours.push("\""+req.body.ret1+"\"");
    }
    if (typeof req.body.ret2 !== "undefined" && req.body.ret2 != "") {
       retours.push("\""+req.body.ret2+"\"");
    }
    if (typeof req.body.ret3 !== "undefined" && req.body.ret3 != "") {
       retours.push("\""+req.body.ret3+"\"");
    }
    if (typeof req.body.ret4 !== "undefined" && req.body.ret4 != "") {
       retours.push("\""+req.body.ret4+"\"");
    }
    if (typeof req.body.ret5 !== "undefined" && req.body.ret5 != "") {
       retours.push("\""+req.body.ret5+"\"");
    }
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
    console.log(req.body);

    var theme;
    if(req.body.newTheme !== "") {
        //valeur string
        models.Theme.create({
                nom: req.body.newTheme
            }).then(function(t ) {
               console.log("L'id du thème crée est :" + t.id);
               theme = t.id;
               models.Question.create({
                   ThemeId: theme,
                   objectif: req.body.objectif,
                   type: req.body.type,
                   difficulte: req.body.difficulte,
                   question: req.body.question,
                   propositions: tabProps,//'['+propositions.toString()+']',
                   reponses: tabReponses,  // A modifier selon ( reponses.toString())
                   retours: ["test"] //'['+retours.toString()+']'
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
            retours: tabRetour //'['+retours.toString()+']'
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

                        models.Question.findAll().then(
                            function(questions) {
                                res.render('questions_view', {
                                    questions: questions,
                                    ok: "La question à corrrectement été supprimée"
                                });
                            });

                    });

                }
            });
    }
});

router.post('/update/:Question_id', function(req, res) {


    var reponses = [];
    var propositions = [];
    var retours = [];

    if (req.body.type == "QCM") {
        if (typeof req.body.qm1 !== "undefined" && req.body.qm1 != "") {
           propositions.push("\""+req.body.qm1+"\"");
        }
        if (typeof req.body.qm2 !== "undefined" && req.body.qm2 != "") {
           propositions.push("\""+req.body.qm2+"\"");
        }
        if (typeof req.body.qm3 !== "undefined" && req.body.qm3 != "") {
           propositions.push("\""+req.body.qm3+"\"");
        }
        if (typeof req.body.qm4 !== "undefined" && req.body.qm3 != "") {
           propositions.push("\""+req.body.qm4+"\"");
        }
        if (typeof req.body.qm5 !== "undefined" && req.body.qm5 != "") {
           propositions.push("\""+req.body.qm5+"\"");
        }

        if (typeof req.body.repQcm1 !== "undefined" && req.body.repQcm1 == "rq1" ) {
           reponses.push(1);
        }
        if (typeof req.body.repQcm2 !== "undefined" && req.body.repQcm2 == "rq2" ) {
           reponses.push(2);
        }
        if (typeof req.body.repQcm3 !== "undefined" && req.body.repQcm3 == "rq3" ) {
           reponses.push(3);
        }
        if (typeof req.body.repQcm4 !== "undefined" && req.body.repQcm4 == "rq4" ) {
           reponses.push(4);
        }
        if (typeof req.body.repQcm5 !== "undefined" && req.body.repQcm5 == "rq5" ) {
           reponses.push(5);
        }

        reponses = '['+reponses+']';

    } else {
        if (typeof req.body.qu1 !== "undefined" && req.body.qu1 != "") {
           propositions.push("\""+req.body.qu1+"\"");
        }
        if (typeof req.body.qu2 !== "undefined" && req.body.qu2 != "") {
           propositions.push("\""+req.body.qu2+"\"");
        }
        if (typeof req.body.qu3 !== "undefined" && req.body.qu3 != "") {
           propositions.push("\""+req.body.qu3+"\"");
        }
        if (typeof req.body.qu4 !== "undefined" && req.body.qu3 != "") {
           propositions.push("\""+req.body.qu4+"\"");
        }
        if (typeof req.body.qu5 !== "undefined" && req.body.qu5 != "") {
           propositions.push("\""+req.body.qu5+"\"");
        }

        console.log("rep qcm : "+req.body.repQcu);
        reponses = req.body.repQcu;

    }

    if (typeof req.body.ret1 !== "undefined" && req.body.ret1 != "") {
       retours.push("\""+req.body.ret1+"\"");
    }
    if (typeof req.body.ret2 !== "undefined" && req.body.ret2 != "") {
       retours.push("\""+req.body.ret2+"\"");
    }
    if (typeof req.body.ret3 !== "undefined" && req.body.ret3 != "") {
       retours.push("\""+req.body.ret3+"\"");
    }
    if (typeof req.body.ret4 !== "undefined" && req.body.ret4 != "") {
       retours.push("\""+req.body.ret4+"\"");
    }
    if (typeof req.body.ret5 !== "undefined" && req.body.ret5 != "") {
       retours.push("\""+req.body.ret5+"\"");
    }

    var theme;
    if(req.body.newTheme !== "") {
        //valeur string
        theme = req.body.newTheme;
        models.Theme.create({
                nom: theme
            }).then(function() {
              models.Theme.findAll().then(
                      function(themes) {
                          var tmp;
                          for (var i=0; i<themes.length;i++) {
                              if(themes[i].nom.toLowerCase() === theme) {
                                  tmp = themes[i].id;
                              }
                          }
                          theme = tmp;
                      });
        });
    } else {
        //valeur integer
        theme = req.body.selectTheme;
    }
    models.Question.update({
        ThemeId: theme,
        objectif: req.body.objectif,
        type: req.body.type,
        difficulte: req.body.difficulte,
        question: req.body.question,
        propositions: '['+propositions.toString()+']',
        reponses: reponses.toString(),
        retours: '['+retours.toString()+']'
    },{
        where: { id : req.params.Question_id }
    }).then(function() {
        res.redirect('/Questions/view/' + req.params.Question_id);
    });

});

module.exports = router;