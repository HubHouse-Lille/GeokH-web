var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');


// VIEW ALL > GET
router.get('/view/', function(req, res) {
    if(req.session.admin){
        models.Question.findAll({include: [ models.Theme ]}).then(
            function(questions) {
                console.log(questions);
                res.render('questions_view', {
                    questions: questions
                });
        });
    }
    else{
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
                console.log(questions);
                res.render('questions_view', {
                    questions: questions
                });
        });
    }

});

// VIEW ONE > GET
router.get('/view/:id', function(req, res) {
    models.Question.findOne({
        where: { id: req.params.id },
        include: [ models.Theme ]
    }).then(
        function(question) {
            res.render('questions_detail', {
                question: question,
                propositions: question.propositions,
                reponses: question.reponses,
                retours: question.retours
            });
        });
});

// CREATE > GET
router.get('/create/', function(req, res) {
    //res.render('questions_create');
       models.Theme.findAll().then(
              function(themes) {
                  console.log(themes);
                  res.render('questions_create', {
                      themes: themes
                  });
              });

});

// EDIT > GET
router.get('/edit/:id', function(req, res) {
    models.Question.findOne({
        where: { id: req.params.id },
        include : [ models.Theme ]
    }).then(
        function(question) {
            if(req.session.sid != question.UserId && !req.session.admin){
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
                        console.log(questions);
                        res.render('questions_view', {
                            questions: questions,
                            err : "Vous n'avez pas les droits pour modifier la question !"
                        });
                });
            }else{
                models.Theme.findAll().then(
                  function(themes) {
                      res.render('questions_edit', {
                          themes : themes,
                          question: question,
                          propositions: question.propositions,
                          reponses: question.reponses,
                          retours: question.retours
                      });
                });
            }
        });
});


module.exports = router;