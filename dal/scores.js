/**
 * Created by Charlie on 02/05/2016.
 */
var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/destroy', function(req, res) {
    // Récupérer tous les ids des scores à supprimer
    var tabScore = req.body.score;
    models.Score.destroy({
        where: { id: tabScore }
    }).then(function(){
        res.redirect("/scores/view");
    });



});

module.exports = router;