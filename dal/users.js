var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        res.redirect('/comptes/view');
    });
});

router.get('/destroy:user_id', function(req, res) {
    models.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function() {
        res.redirect('/comptes/view');
    });
});

module.exports = router;