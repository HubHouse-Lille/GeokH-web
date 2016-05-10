var models  = require('../models/index');
var express = require('express');
var router  = express.Router();
var base64 = require('node-base64-image');
var Parse = require('parse').Parse;

router.post('/create', function(req, res) {

    var photo = req.body.newPhoto;
    // Récupération des questions et réponses de l'interview et des différents indices.
    var interviewQuestion = [];
    var interviewReponse = [];
    var indices_donnees = [];
    var nbQR = Number.parseInt(req.body.nbquestion);
    var nbI = Number.parseInt(req.body.nbindice);
    for(var i = 1; i <= nbQR; i++){
        interviewQuestion.push(req.body['q'+i]);
        interviewReponse.push(req.body['r'+i]);
    }
    for(var i = 1; i <= nbI; i++){
        indices_donnees.push(req.body['ind'+i]);
    }

    models.Entrepreneur.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: photo,
        interviewQ: interviewQuestion,
        interviewR: interviewReponse,
        indices: indices_donnees,
        UserId: req.session.sid,
        public: req.body.mode_ent
    }).then(function() {
        res.redirect('/Entrepreneurs/view');
    });
});

router.get('/destroy/:Entrepreneur_id', function(req, res) {

        models.Entrepreneur.findOne({
           where: { id: req.params.Entrepreneur_id }
       }).then(function(entrepreneur) {
            if (!req.session.admin && req.session.sid != entrepreneur.UserId) {
                   res.render('error', {
                       message: "Attention, vous n'avez pas le droit de supprimer la personne mystère.",
                       error: "Accès refusé"
                   });

            } else {
                  models.Ptoe.findAll({
                       where: { EntrepreneurId: req.params.Entrepreneur_id,
                                 ParcourId: {
                                     $ne: null
                                 }
                              }
                       }).then(
                       function(ents) {
                           if (ents.length > 0) {
                               models.Entrepreneur.findOne({
                                   where: { id: req.params.Entrepreneur_id }
                               }).then(
                               function(entrepreneur) {
                                  models.Entrepreneur.findOne({
                                         where: { id: req.params.Entrepreneur_id }
                                     }).then(function(entrepreneur) {
                                          res.render('entrepreneurs_detail', {
                                              entrepreneur: entrepreneur,
                                              err: "Vous ne pouvez pas supprimer cette personne mystère car il appartient à des parcours. Vous devez d'abord le supprimer du parcour."
                                          });
                                  });
                               });

                           } else {
                               models.Entrepreneur.destroy({
                                   where: { id: req.params.Entrepreneur_id }
                               }).then(function() {
                               if(req.session.admin){
                                    models.Entrepreneur.findAll().then(
                                      function(entrepreneurs) {
                                          res.render('entrepreneurs_view', {
                                              entrepreneurs: entrepreneurs,
                                              ok: "La personne mystère a correctement été supprimée"
                                          });
                                    });
                               }else{
                                   models.Entrepreneur.findAll({
                                       where: {
                                         $or : [
                                         {UserId : req.session.sid},
                                         {public : true}
                                         ]
                                   }}).then(
                                       function(entrepreneurs) {
                                           res.render('entrepreneurs_view', {
                                               entrepreneurs: entrepreneurs,
                                               ok: "La personne mystère a correctement été supprimée"
                                           });
                                       });
                               }
                               });

                           }
                       });
               }
        });

});

router.post('/update/:Entrepreneur_id', function(req, res) {

    var photo = req.body.newPhoto;
    // Récupération des questions et réponses de l'interview et des différents indices.
    var interviewQuestion = [];
    var interviewReponse = [];
    var indices_donnees = [];
    var nbQR = Number.parseInt(req.body.nbquestion);
    var nbI = Number.parseInt(req.body.nbindice);
    for(var i = 1; i <= nbQR; i++){
        interviewQuestion.push(req.body['q'+i]);
        interviewReponse.push(req.body['r'+i]);
    }
    for(var i = 1; i <= nbI; i++){
        indices_donnees.push(req.body['ind'+i]);
    }

    models.Entrepreneur.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: photo,
        interviewQ: interviewQuestion,
        interviewR: interviewReponse,
        indices: indices_donnees,
        public: req.body.mode_ent

    },{
        where: { id : req.params.Entrepreneur_id }
    }).then(function() {
        res.redirect('/Entrepreneurs/view/' + req.params.Entrepreneur_id);
    });

});

module.exports = router;
