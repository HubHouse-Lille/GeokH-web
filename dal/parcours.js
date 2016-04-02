var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    console.log("CREATION");
    models.Parcour.create({
        nom: req.body.nom,
        description: req.body.description,
        actif : false,
        UserId : req.session.sid
    }).then(function(parcour) {
        console.log("Parcour : userid : " + parcour.UserId );
        res.redirect('/parcours/view');
    });
});

router.get('/destroy/:parcour_id', function(req, res) {


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {
        models.Ptobq.destroy({
            where: {
                ParcourId: req.params.Parcour_id
            }
            }).then(function() {
                models.Ptoe.destroy({
                    where: {
                        ParcourId: req.params.Parcour_id
                    }
                }).then(function() {
                     models.Parcour.destroy({
                         where: { id: req.params.parcour_id }
                     }).then(function() {
                          models.Parcour.findAll().then(
                              function(parcours) {
                                  res.render('parcours_view', {
                                      parcours: parcours,
                                      ok: "Le parcour a correctement éré supprimé"
                                  });
                              });

                     });

                });

        });
    }
});

router.post('/update/:parcour_id', function(req, res) {

    var actif = 0;
    if (req.body.actif == 1)
        actif = 1;

    models.Parcour.update({
        nom: req.body.nom,
        description: req.body.description,
        actif: actif,
        UserId : req.session.sid
    },{
        where: { id : req.params.parcour_id }
    }).then(function() {
        res.redirect('/parcours/view/' + req.params.parcour_id);
    });
});

module.exports = router;