var express = require('express');
var router = express.Router();

// SESSION HANDLER
router.get('/*', function(req, res, next) {
  var sess = req.session;
  if (sess.connected == undefined || sess.connected == false) {
    sess.connected = false;
    console.log('login ko > redirect to login');
    res.render('login');
  } else {
    console.log('login ok');
    next();
  }
});

// LOGIN
// -----------------------------------------------------
// login
router.post('/login', function(req, res) {

  var login = req.body.login;
  var pwd = req.body.pwd;
  var sess = req.session;

  console.log('login: '+login);
  console.log('pwd: '+pwd);

  if (login == 'a' && pwd == 'b') {
    sess.connected = true;
    res.render('index', {
        menu: "accueil"
    });
  } else {
    sess.connected = false;
    res.render('login', {
      msg: 'Le login ou le mot de passe n\'est pas correct'
    });
  }
});
// logout
router.get('/logout', function(req, res) {
  var sess = req.session;
  sess.connected = false;
  res.render('login');
});


module.exports = router;
