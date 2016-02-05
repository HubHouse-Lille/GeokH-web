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


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
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
                                       err: "Vous ne pouvez pas supprimer cet enttrepreneur car il appartient à des parcours. Vous devez d'abord le supprimer du parcour."
                                   });
                               });
                    });

                } else {

                    models.Entrepreneur.destroy({
                        where: { id: req.params.Entrepreneur_id }
                    }).then(function() {

                        models.Entrepreneur.findAll().then(
                            function(entrepreneurs) {
                                res.render('entrepreneurs_view', {
                                    entrepreneurs: entrepreneurs,
                                    ok: "L'entrepreneur à correctement été supprimé"
                                });
                            });

                    });

                }
            });
    }
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