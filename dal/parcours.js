var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    // Récupération des différentes personnes mystere
    var tabEnt = [];
    if(req.body.entrepreneurId instanceof Array){
        tabEnt = req.body.entrepreneurId;
    }else{
        if(req.body.entrepreneurId != null)
            tabEnt.push(req.body.entrepreneurId);
    }
    // Récupération des différentes balises questions et ordres
    var tabB = [];
    var tabQ = [];
    var tabO = [];
    if(req.body.baliseId instanceof Array){
        tabB = req.body.baliseId;
    }else{
        if(req.body.baliseId != null)
            tabB.push(req.body.baliseId);
    }
    if(req.body.questionId instanceof Array){
        tabQ = req.body.questionId;
    }else{
        if(req.body.questionId != null)
            tabQ.push(req.body.questionId);
    }
    if(req.body.ordre instanceof Array){
        tabO = req.body.ordre;
    }else{
        if(req.body.ordre != null)
            tabO.push(req.body.ordre);
    }
    // Creation du parcours
    models.Parcours.create({
        nom: req.body.nom,
        description: req.body.description,
        actif : false,
        UserId : req.session.sid,
        public : req.body.mode_public
    }).then(function(parcour) {
        // Création du ptoe
        if(tabEnt != []){
            for(var i= 0; i < tabEnt.length; i++){
                models.Ptoe.create({
                    EntrepreneurId : tabEnt[i],
                    ParcourId : parcour.id
                });
            }
        }
        // Creation du ptobq
        if(tabB != []){
            for(var i= 0; i < tabB.length; i++){
                models.Ptobq.create({
                    ordre: tabO[i],
                    BaliseId : tabB[i],
                    ParcourId : parcour.id,
                    QuestionId : tabQ[i]
                });
            }
        }
        // Redirection vers la liste des parcours
        res.redirect('/parcours/view');
    });

});

router.get('/destroy/:parcour_id', function(req, res) {
    models.Parcours.findOne({
            where: { id: req.params.parcour_id }
        }).then(
        function(parcour) {
            if (!req.session.admin && req.session.sid != parcour.UserId) {
                res.render('error', {
                message: "Attention, vous n'avez pas le droit de supprimer le parcours.",
                error: "Accès refusé"
                });
            }
            else {
                models.Ptobq.destroy({
                    where: {
                        ParcourId: req.params.Parcour_id
                    }
                    }).then(
                    function() {
                        models.Ptoe.destroy({
                            where: {
                                ParcourId: req.params.Parcour_id
                            }
                        }).then(
                        function() {
                            models.Parcours.destroy({
                                where: { id: req.params.parcour_id }
                            }).then(
                            function() {
                                if(req.session.admin){
                                    models.Parcours.findAll().then(
                                        function(parcours) {
                                          res.render('parcours_view', {
                                              parcours: parcours,
                                              ok: "Le parcours a correctement été supprimé"
                                          });
                                    });
                                }else{
                                    models.Parcours.findAll({
                                        where: {
                                            $or : [
                                            {UserId : req.session.sid},
                                            {public : true}
                                            ]
                                        },
                                        include: [ models.User ]
                                    }).then(
                                    function(parcours) {
                                        res.render('parcours_view', {
                                            parcours: parcours,
                                            ok: "Le parcours a correctement été supprimé"
                                        });
                                    });
                                }
                            });

                        });

                    });

            }

        });
});

router.post('/update/:parcour_id', function(req, res) {
   var actif = req.body.actif;
   if(actif == undefined)
       actif = 0;
   var tabEnt = [];
   if(req.body.entrepreneurId instanceof Array){
       tabEnt = req.body.entrepreneurId;
   }else{
       if(req.body.entrepreneurId != null)
           tabEnt.push(req.body.entrepreneurId);
   }
   var tabB = [];
   var tabQ = [];
   var tabO = [];
   if(req.body.baliseId instanceof Array){
       tabB = req.body.baliseId;
   }else{
       if(req.body.baliseId != null)
           tabB.push(req.body.baliseId);
   }
   if(req.body.questionId instanceof Array){
       tabQ = req.body.questionId;
   }else{
       if(req.body.questionId != null)
           tabQ.push(req.body.questionId);
   }
   if(req.body.ordre instanceof Array){
       tabO = req.body.ordre;
   }else{
       if(req.body.ordre != null)
           tabO.push(req.body.ordre);
   }

   // Modification du parcours
   models.Parcours.update({
       nom: req.body.nom,
       description: req.body.description,
       actif : actif,
       public : req.body.mode_public
   },{
        where: { id : req.params.parcour_id }
   }).then(function(parcour) {
        // Mise à jour des PTOE
        models.Ptoe.destroy({
            where: {
                ParcourId: req.params.parcour_id
            }
        });
        if(tabEnt != []){
            for(var i= 0; i < tabEnt.length; i++){
                models.Ptoe.create({
                    EntrepreneurId : tabEnt[i],
                    ParcourId : req.params.parcour_id
                });
            }
        }
        //Mise à jour des PTOBQ
        models.Ptobq.destroy({
            where: {
                ParcourId: req.params.parcour_id
            }
        });
       if(tabB != []){
           for(var i= 0; i < tabB.length; i++){
               models.Ptobq.create({
                   ordre: tabO[i],
                   BaliseId : tabB[i],
                   ParcourId : req.params.parcour_id,
                   QuestionId : tabQ[i]
               });
           }
       }
       res.redirect('/parcours/view/' + req.params.parcour_id);
    });


});

module.exports = router;
