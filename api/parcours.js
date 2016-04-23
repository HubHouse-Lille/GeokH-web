var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var models  = require('../models/index');

// VIEW ALL > GET
router.get('/', function(req, res) {
    models.Parcour.findAll({
              where: { actif: true },
              attributes: ['id','nom','description']
          }).then(
        function(parcours) {
            // ajout charlie
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
            res.send(parcours);
        });

});

router.get('/question_mystere', function(req, res) {
    models.Parcour.findAll({
             where: {
                         $or : [
                         {UserId : req.session.sid},
                         {public : true}
                         ]
                    }
          }).then(
        function(parcours) {
            res.json(parcours);
        });

});

module.exports = router;
