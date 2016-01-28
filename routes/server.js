var express = require('express');
var router = express.Router();
var request = require('request');

var bodyParser = require('body-parser');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/apropos/', function(req, res) {
    console.log('A propos');
    res.render('apropos');
});

module.exports = router;



/*

router.get('/isalive', function(req, res) {
	var sum = (parseInt(req.headers['num1']) + parseInt(req.headers['num2']));
	console.log('test server sum: '+sum);
	res.header('sum', sum);
	res.sendStatus(200);
});

router.get('/', function(req, res) {

     db.serialize(function() {

         var rowTable = [];

         db.each("SELECT author, ip, createTime FROM serveurs order by createTime asc", function(err, row) {
            var httpip = 'http://'+row.ip
            rowTable.push({
            	author:row.author, 
            	ip:httpip,
            	ctime:row.createTime
            });
         }, function() {
             res.render('serveurs', {
                 title: 'Online serveurs',
                 data: rowTable
             });
         });
     });
});

router.post('/', function(req, res) {

    var login = req.body.login;
    var pwd = req.body.pwd;

    console.log('login: '+ login);
    console.log('pwd: '+ pwd);

	res.render('parcours_detail');
});

*/