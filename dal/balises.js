var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {

    models.Balise.create({
        nom: req.body.nom,
        indice: req.body.indice,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        UserId : req.session.sid,
        public: req.body.mode_balise
    }).then(function() {
        res.redirect('/Balises/view');
    });
});


router.get('/destroy/:Balise_id', function(req, res) {

    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {

    models.Ptobq.findAll({
        where: { BaliseId: req.params.Balise_id,
                 ParcourId: {
                       $ne: null
                   }
               }
    }).then(
        function(ents) {

            if (ents.length > 0) {

              models.Balise.findOne({
                  where: { id: req.params.Balise_id }
              }).then(
                  function(balise) {
                      res.render('balises_detail', {
                          balise: balise,
                          err: "Vous ne pouvez pas supprimer cette balise car elle est associée à des parcours"
                      });
                  });

            } else {

                models.Balise.destroy({
                    where: { id: req.params.Balise_id }
                }).then(function() {

                    models.Balise.destroy({
                        where: { id: req.params.Balise_id }
                    }).then(function() {

                        models.Balise.findAll().then(
                            function(balises) {
                                res.render('balises_view', {
                                    balises: balises,
                                    ok: "La balise à correctement été supprimée"
                                });
                            });

                    });

                });

            }
        });

   }


});

router.post('/update/:Balise_id', function(req, res) {

    models.Balise.update({
        nom: req.body.nom,
        indice: req.body.indice,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        public: req.body.mode_balise
    },{
        where: { id : req.params.Balise_id }
    }).then(function() {
        res.redirect('/Balises/view/' + req.params.Balise_id);
    });

});

module.exports = router;