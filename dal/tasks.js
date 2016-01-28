var models  = require('../models/index');
var express = require('express');
var router  = express.Router();


router.post('/:user_id/create', function (req, res) {
    models.Task.create({
        title: req.body.title,
        UserId: req.params.user_id
    }).then(function() {
        res.redirect('/');
    });
});

router.get('/:user_id/:task_id/destroy', function (req, res) {
    models.Task.destroy({
        where: {
            id: req.params.task_id
        }
    }).then(function() {
        res.redirect('/');
    });
});


module.exports = router;