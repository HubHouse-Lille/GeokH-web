var models  = require('../models/index');
var express = require('express');
var router  = express.Router();

// VIEW ALL > GET
router.get('/view/', function(req, res) {
    models.User.findAll().then(
        function(users) {
            res.render('users_view', {
                users: users
            });
        });
});

router.post('/create', function(req, res) {
    models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(function() {

        models.User.findAll().then(
        function(users) {
            res.render('users_management', {
                users: users,
                ok: "Un nouvel utilisateur a été crée"
            });
        });

    });
});

router.post('/update/', function(req, res) {

    if (req.body.password1 !== req.body.password2) {
        models.User.findOne({
            where: { id: req.session.sid }
        }).then(
            function(user) {
                res.render('users_edit', {
                    user: user,
                    err: "Le nouveau mot de passe n'est pas identique"
                });
            });
    } else {

        if (req.body.password1 == "" || req.body.password2 == "") {

            models.User.update({
                username: req.body.username,
                admin: req.body.admin,
                email: req.body.email
            },{
                where: { id : req.session.sid }
            }).then(function() {
                models.User.findOne({
                    where: { id: req.session.sid }
                }).then(
                    function(user) {
                        res.render('users_edit', {
                            user: user,
                            ok: "Les informations de votre compte ont correctement été modifiées"
                        });
                    });
            });
        } else {

            models.User.update({
                username: req.body.username,
                password: req.body.password1,
                admin: req.body.admin,
                email: req.body.email
            },{
                where: { id : req.session.sid }
            }).then(function() {

                    models.User.findOne({
                        where: { id: req.session.sid }
                    }).then(
                        function(user) {
                            res.render('users_detail', {
                                user: user,
                                ok: "Les informations de votre compte ont correctement été modifiées"
                            });
                        });
            });
        }
    }
});

router.get('/destroy/:user_id', function(req, res) {


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {


        if (req.params.user_id === req.session.sid && req.session.admin == true) {
            res.render('users_management', {
                users: users,
                err: "Vous ne pouvez pas supprimer votre compte en tant qu'administrateur"
            });
        } else {

            models.User.destroy({
                where: {
                    id: req.params.user_id
                }
            }).then(function() {

                models.User.findAll().then(
                function(users) {
                    res.render('users_management', {
                        users: users,
                        ok: "Un nouvel à correctement été supprimé"
                    });
                });

            });
        }

    }

});


router.get('/makeAdmin/:user_id', function(req, res) {


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {

        models.User.update({
            admin: 1
        },{
            where: { id : req.params.user_id }
        }).then(function() {
           models.User.findAll().then(
            function(users) {
                res.render('users_management', {
                    users: users,
                    ok: "Un Administrateur est devenu utilisateur privilégié"
                });
            });
        });

    }

});




router.get('/makeUser/:user_id', function(req, res) {


    if (!req.session.admin) {
        res.render('error', {
            message: "Accès refusé",
            error: "Accès refusé"
        });

    } else {

        if (req.params.user_id == req.session.sid) {
            models.User.findAll().then(
            function(users) {
                res.render('users_management', {
                    users: users,
                    err: "Vous ne pouvez pas modifier vos droits !"
                });
            });
        } else {

            models.User.update({
                admin: 0
            },{
                where: { id : req.params.user_id }
            }).then(function() {
               models.User.findAll().then(
                function(users) {
                    res.render('users_management', {
                        users: users,
                        ok: "Un Administrateur est devenu utilisateur privilégié"
                    });
                });
            });
        }
    }

});


module.exports = router;