var models  = require('../models/index');
var express = require('express');
var router  = express.Router();


router.post('/:user_id/create', function (req, res) {
    models.Task.create({
        title: req.body.title,
        UserId: req.params.user_id
    }).then(function() {
        res.redirect('/comptes/view');
    });
});

router.get('/:user_id/destroy/:task_id', function (req, res) {
    models.Task.destroy({
        where: { id: req.params.task_id }
    }).then(function() {
        res.redirect('/comptes/view');
    });
});

router.post('/:task_id/update', function (req, res) {
    models.Task.update({
            title: req.body.title
        },{
            where: { id : req.params.task_id }
        }).then(function() {
            res.redirect('/comptes/view');
        });
});

module.exports = router;